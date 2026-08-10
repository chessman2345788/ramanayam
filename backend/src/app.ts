import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import "express-async-errors";
import logger from "./components/logger";

import morganMiddleware from "./common/middleware/morgan";
import { rateLimiter } from "./common/middleware/rateLimiter";
import { errorHandler } from "./common/middleware/errorHandler";
import { notFoundHandler } from "./common/middleware/notFoundHandler";
import apiRouter from "./routes";

// ─── Validate critical secrets at startup ────────────────────────────
if (!process.env.COOKIE_SECRET) {
  logger.warn("⚠  COOKIE_SECRET is not set. Set a strong secret in .env for production.");
}

const app: Express = express();

// Trust the first proxy hop (required for correct IP detection behind Nginx / load balancers)
app.set("trust proxy", 1);

// ─── Helmet – hardened security headers ─────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc:
       process.env.NODE_ENV === "production"
       ? ["'self'", "https://ramayanam.in"]
       : ["'self'", "http://localhost:5000"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xContentTypeOptions: true,
    xDnsPrefetchControl: { allow: false },
    xFrameOptions: { action: "deny" },
    xXssProtection: false, // Disabled – rely on CSP instead (legacy header has known bypass issues)
  }),
);

// ─── CORS ─────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin) only in non-production
      if (!origin && process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      if (origin && allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: Origin '${origin}' is not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // Cache preflight for 24 h
  }),
);

// ─── Compression ─────────────────────────────────────────────────────
app.use(compression());

// ─── Request Parsers (strict limits to prevent DoS) ──────────────────
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET || "__fallback_cookie_secret__"));

// ─── Request Logging ──────────────────────────────────────────────────
app.use(morganMiddleware);

// ─── Global Rate Limiting ─────────────────────────────────────────────
app.use(rateLimiter);

// ─── Static Uploads (served with no directory listing) ───────────────
app.use(
  "/uploads",
  express.static("uploads", {
    dotfiles: "deny",
    index: false, // Disable directory listing
  }),
);

// ─── System Routes ────────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Ramanayam Temple E-commerce and Services API Framework",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (_req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.status(200).json({
    success: true,
    status: "UP",
    uptime: process.uptime(),
    // Do NOT expose memory details in production (information leakage)
    ...(isProduction ? {} : { memoryUsage: process.memoryUsage() }),
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────
app.use("/api/v1", apiRouter);

// ─── 404 Handler ─────────────────────────────────────────────────────
app.use(notFoundHandler);

// ─── Global Error Handler ─────────────────────────────────────────────
app.use(errorHandler);

export default app;
