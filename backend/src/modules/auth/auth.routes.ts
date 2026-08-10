import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { prisma } from "../../prisma";
import { validateRequest } from "../../components/validation";
import { authenticate } from "./auth.middleware";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "./auth.validator";

const router = Router();
const repository = new AuthRepository(prisma);
const service = new AuthService(repository);
const controller = new AuthController(service);

// ─── Auth-specific rate limiter (brute-force protection) ─────────────
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});

// ─── Stricter rate limiter for password reset (prevent enumeration & abuse) ─
const resetPasswordRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many password reset attempts. Please try again in 15 minutes.",
  },
});

// ─── Rate limiter for token refresh (prevent refresh token rotation abuse) ─
const refreshRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many token refresh attempts. Please try again later.",
  },
});

// Public Routes (with stricter rate limiting)
router.post("/register", authRateLimiter, validateRequest(registerSchema), controller.register);
router.post("/login", authRateLimiter, validateRequest(loginSchema), controller.login);
router.post("/logout", controller.logout);
router.post("/refresh", refreshRateLimiter, controller.refresh);
router.post(
  "/forgot-password",
  resetPasswordRateLimiter,
  validateRequest(forgotPasswordSchema),
  controller.forgotPassword,
);
router.post("/reset-password", resetPasswordRateLimiter, validateRequest(resetPasswordSchema), controller.resetPassword);

// Protected Routes
router.post(
  "/change-password",
  authenticate,
  validateRequest(changePasswordSchema),
  controller.changePassword,
);
router.get("/me", authenticate, controller.getCurrentUser);
router.put(
  "/profile",
  authenticate,
  validateRequest(updateProfileSchema),
  controller.updateProfile,
);

export default router;
