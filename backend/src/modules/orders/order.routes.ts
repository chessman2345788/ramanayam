import { Router } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { cartService } from "../cart/cart.routes";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  createOrderSchema,
  customerOrderParamSchema,
  cancelOrderSchema,
  paginationSchema,
  adminOrderParamSchema,
  adminOrderListSchema,
  updateOrderStatusSchema,
  updatePaymentStatusSchema,
} from "./order.validator";

const router = Router();

const repository = new OrderRepository(prisma);
const service = new OrderService(repository, cartService);
const controller = new OrderController(service);

// ──────────────────────────────────────────────
// Admin Routes (authenticated + ADMIN role)
// Static routes placed first to prevent shadowing by /:id
// ──────────────────────────────────────────────

router.get("/admin", authenticate, authorize(["ADMIN"]), validateRequest(adminOrderListSchema), controller.getAdminOrders);
router.get("/admin/:id", authenticate, authorize(["ADMIN"]), validateRequest(adminOrderParamSchema), controller.getAdminOrderById);

router.patch(
  "/admin/:id/status",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(updateOrderStatusSchema),
  controller.updateOrderStatus,
);

router.patch(
  "/admin/:id/payment-status",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(updatePaymentStatusSchema),
  controller.updatePaymentStatus,
);

// ──────────────────────────────────────────────
// Customer Routes (authenticated)
// ──────────────────────────────────────────────

router.get("/", authenticate, validateRequest(paginationSchema), controller.getCustomerOrders);
router.post("/", authenticate, validateRequest(createOrderSchema), controller.createOrder);
router.get("/:id", authenticate, validateRequest(customerOrderParamSchema), controller.getCustomerOrderById);
router.patch("/:id/cancel", authenticate, validateRequest(cancelOrderSchema), controller.cancelOrder);

router.patch(
  "/admin/:id/status",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(updateOrderStatusSchema),
  controller.updateOrderStatus,
);

router.patch(
  "/admin/:id/payment-status",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(updatePaymentStatusSchema),
  controller.updatePaymentStatus,
);

export default router;
