import { Router } from "express";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminRepository } from "./admin.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import { UserRole } from "@prisma/client";
import {
  adminUserQuerySchema,
  adminUserParamsSchema,
  adminUserUpdateSchema,
  adminUserStatusSchema,
  adminProductQuerySchema,
  adminProductParamsSchema,
  adminProductUpdateSchema,
  adminOrderQuerySchema,
  adminOrderStatusSchema,
  adminPaymentQuerySchema,
  adminReviewQuerySchema,
  adminReviewParamsSchema,
  adminReviewUpdateSchema,
} from "./admin.validator";

const router = Router();

const repository = new AdminRepository(prisma);
const service = new AdminService(repository);
const controller = new AdminController(service);

// Strict Admin RBAC Enforcement: Authenticated + UserRole.ADMIN required for ALL routes
router.use(authenticate);
router.use(authorize([UserRole.ADMIN]));

// Dashboard & Analytics
router.get("/dashboard", controller.getDashboard);
router.get("/stats", controller.getStats);

// User Management
router.get("/users", validateRequest(adminUserQuerySchema), controller.getUsers);
router.get("/users/:id", validateRequest(adminUserParamsSchema), controller.getUserById);
router.patch("/users/:id", validateRequest(adminUserUpdateSchema), controller.updateUser);
router.patch("/users/:id/status", validateRequest(adminUserStatusSchema), controller.updateUserStatus);

// Product Moderation
router.get("/products", validateRequest(adminProductQuerySchema), controller.getProducts);
router.patch("/products/:id", validateRequest(adminProductUpdateSchema), controller.updateProduct);
router.delete("/products/:id", validateRequest(adminProductParamsSchema), controller.deleteProduct);

// Order Management
router.get("/orders", validateRequest(adminOrderQuerySchema), controller.getOrders);
router.patch("/orders/:id/status", validateRequest(adminOrderStatusSchema), controller.updateOrderStatus);

// Payment Monitoring
router.get("/payments", validateRequest(adminPaymentQuerySchema), controller.getPayments);

// Review Moderation
router.get("/reviews", validateRequest(adminReviewQuerySchema), controller.getReviews);
router.patch("/reviews/:id", validateRequest(adminReviewUpdateSchema), controller.updateReview);
router.delete("/reviews/:id", validateRequest(adminReviewParamsSchema), controller.deleteReview);

export default router;
