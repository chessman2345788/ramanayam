import { Router } from "express";

const router = Router();

/**
 * Admin Auth Routes
 * Prefix: /api/v1/admin/auth
 */

// POST /api/v1/admin/auth/login - Admin Login
router.post("/login", (req, res) => {
  res.status(501).json({ success: false, message: "Admin login endpoint not implemented yet." });
});

// POST /api/v1/admin/auth/logout - Admin Logout
router.post("/logout", (req, res) => {
  res.status(501).json({ success: false, message: "Admin logout endpoint not implemented yet." });
});

// GET /api/v1/admin/auth/me - Current Admin Profile
router.get("/me", (req, res) => {
  res.status(501).json({ success: false, message: "Admin profile endpoint not implemented yet." });
});

// POST /api/v1/admin/auth/refresh - Refresh Admin Token
router.post("/refresh", (req, res) => {
  res.status(501).json({ success: false, message: "Admin token refresh endpoint not implemented yet." });
});

export default router;
