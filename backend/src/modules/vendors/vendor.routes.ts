import { Router } from "express";
import { VendorsController } from "./vendor.controller";
import { VendorsService } from "./vendor.service";
import { VendorsRepository } from "./vendor.repository";
import { AuthRepository } from "../auth/auth.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import { UserRole } from "@prisma/client";
import {
  createVendorSchema,
  updateVendorSchema,
  vendorParamsSchema,
  vendorSlugParamsSchema,
  adminVendorStatusSchema,
  adminVendorVerifySchema,
  vendorQuerySchema,
} from "./vendor.validator";

const router = Router();

const repository = new VendorsRepository(prisma);
const authRepository = new AuthRepository(prisma);
const service = new VendorsService(repository, authRepository);
const controller = new VendorsController(service);

// IMPORTANT: Static routes (/me, /register, /slug, /admin) MUST be defined
// BEFORE dynamic routes (/:id) to prevent Express from matching them as an `id`.

// Vendor Portal Self-Service Routes (Requires VENDOR or ADMIN role)
router.get("/me", authenticate, authorize([UserRole.VENDOR, UserRole.ADMIN]), controller.getMe);
router.patch("/me", authenticate, authorize([UserRole.VENDOR, UserRole.ADMIN]), validateRequest(updateVendorSchema), controller.updateMe);
router.get("/me/products", authenticate, authorize([UserRole.VENDOR, UserRole.ADMIN]), controller.getMyProducts);

// Admin Moderation Override Routes (Requires ADMIN role)
router.get("/admin/all", authenticate, authorize([UserRole.ADMIN]), validateRequest(vendorQuerySchema), controller.adminGetAll);
router.patch("/admin/:id/status", authenticate, authorize([UserRole.ADMIN]), validateRequest(adminVendorStatusSchema), controller.adminUpdateStatus);
router.patch("/admin/:id/verify", authenticate, authorize([UserRole.ADMIN]), validateRequest(adminVendorVerifySchema), controller.adminToggleVerification);

// Public Routes
router.get("/", validateRequest(vendorQuerySchema), controller.getPublicVendors);
router.get("/slug/:slug", validateRequest(vendorSlugParamsSchema), controller.getBySlug);
router.post("/register", validateRequest(createVendorSchema), controller.register);

// Dynamic Routes LAST (to prevent shadowing static routes above)
router.get("/:id", validateRequest(vendorParamsSchema), controller.getById);
router.get("/:id/products", validateRequest(vendorParamsSchema), controller.getVendorProducts);

export default router;
