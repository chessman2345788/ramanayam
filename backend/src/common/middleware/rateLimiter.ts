import rateLimit from "express-rate-limit";
import { AppError } from "../errors";

const windowMs = process.env.RATE_LIMIT_WINDOW_MS
  ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)
  : 15 * 60 * 1000; // 15 minutes default

const max = process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : 100; // 100 requests per windowMs default

export const rateLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    next(new AppError("Too many requests from this IP, please try again later.", 429));
  },
});
