import { z } from "zod";
import { PaymentStatus } from "@prisma/client";

export const createRazorpayOrderSchema = z.object({
  body: z.object({
    orderId: z.string().min(1, "Invalid order ID format").optional(),
    amount: z.number().int().min(100, "Minimum amount is 100 paise (₹1)").optional(),
    currency: z.string().optional().default("INR"),
    receipt: z.string().optional(),
  }),
});

export const verifyRazorpayPaymentSchema = z.object({
  body: z.object({
    razorpay_order_id: z.string().min(1, "Razorpay order ID is required"),
    razorpay_payment_id: z.string().min(1, "Razorpay payment ID is required"),
    razorpay_signature: z.string().min(1, "Razorpay signature is required"),
    orderId: z.string().optional(),
  }),
});

export const getPaymentParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Payment ID is required"),
  }),
});

export const getOrderByOrderIdParamsSchema = z.object({
  params: z.object({
    orderId: z.string().min(1, "Order ID is required"),
  }),
});

export const paymentHistoryQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    status: z.nativeEnum(PaymentStatus).optional(),
    provider: z.string().optional(),
    search: z.string().optional(),
  }),
});
