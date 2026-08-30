import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import { PaymentsController } from "./payment.controller";
import { PaymentsService } from "./payment.service";
import { PaymentsRepository } from "./payment.repository";
import { RazorpayService } from "./razorpay.service";
import { WebhookService } from "./webhook.service";
import { prisma } from "../../prisma";
import { authenticate, optionalAuthenticate } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  createRazorpayOrderSchema,
  verifyRazorpayPaymentSchema,
  getPaymentParamsSchema,
  getOrderByOrderIdParamsSchema,
  paymentHistoryQuerySchema,
} from "./payment.validator";

const router = Router();

const repository = new PaymentsRepository(prisma);
const razorpayService = new RazorpayService();
const webhookService = new WebhookService(repository, razorpayService);
const service = new PaymentsService(repository, razorpayService);
const controller = new PaymentsController(service, webhookService);

// ─── Middleware to capture raw body for Razorpay HMAC verification ─────
const captureRawBody = [
  express.raw({ type: "application/json" }),
  (req: Request, _res: Response, next: NextFunction) => {
    if (Buffer.isBuffer(req.body)) {
      (req as any).rawBody = req.body;
      try {
        req.body = JSON.parse(req.body.toString("utf8"));
      } catch {
        req.body = {};
      }
    }
    next();
  },
];

// Unauthenticated Webhook Endpoint (HMAC Signature Validation via Razorpay)
// MUST use captureRawBody to preserve the original payload bytes for HMAC.
router.post(
  "/webhook",
  captureRawBody,
  controller.handleWebhook,
);

// Canonical Razorpay Payment Endpoints (supports optional auth for guest or logged-in users)
router.post(
  "/create-order",
  optionalAuthenticate,
  validateRequest(createRazorpayOrderSchema),
  controller.createOrder,
);

router.post(
  "/verify",
  optionalAuthenticate,
  validateRequest(verifyRazorpayPaymentSchema),
  controller.verifyPayment,
);

router.post(
  "/verify-payment",
  optionalAuthenticate,
  validateRequest(verifyRazorpayPaymentSchema),
  controller.verifyPayment,
);

// Query Endpoints (strictly authenticated)
router.get(
  "/history",
  authenticate,
  validateRequest(paymentHistoryQuerySchema),
  controller.getHistory,
);

router.get(
  "/order/:orderId",
  authenticate,
  validateRequest(getOrderByOrderIdParamsSchema),
  controller.getByOrderId,
);

router.get(
  "/:id",
  authenticate,
  validateRequest(getPaymentParamsSchema),
  controller.get,
);

export default router;
