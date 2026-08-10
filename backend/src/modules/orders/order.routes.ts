import { Router } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { CartService } from "../cart/cart.service";
import { CartRepository } from "../cart/cart.repository";
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

const cartRepository = new CartRepository(prisma);
const cartService = new CartService(cartRepository);

const repository = new OrderRepository(prisma);
const service = new OrderService(repository, cartService);
const controller = new OrderController(service);

// ──────────────────────────────────────────────
// Customer Routes (authenticated)
// ──────────────────────────────────────────────

router.get("/", authenticate, validateRequest(paginationSchema), controller.getCustomerOrders);
router.get("/:id", authenticate, validateRequest(customerOrderParamSchema), controller.getCustomerOrderById);
router.post("/", authenticate, validateRequest(createOrderSchema), controller.createOrder);
router.patch("/:id/cancel", authenticate, validateRequest(cancelOrderSchema), controller.cancelOrder);

// ──────────────────────────────────────────────
// Admin Routes (authenticated + ADMIN role)
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

export default router;
