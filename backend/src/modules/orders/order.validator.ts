import { z } from "zod";
import { OrderStatus, PaymentStatus } from "@prisma/client";

/** Reusable UUID param schema for routes with :id */
const orderIdParam = z.object({
  id: z.string().uuid("Invalid order ID format"),
});

/** Allowed payment providers */
const PAYMENT_PROVIDERS = ["STRIPE", "RAZORPAY"] as const;

// ──────────────────────────────────────────────
// Customer Schemas
// ──────────────────────────────────────────────

export const createOrderSchema = z.object({
  body: z.object({
    shippingAddressId: z.string().uuid("Invalid address ID format").optional(),
    paymentProvider: z.enum(PAYMENT_PROVIDERS).default("STRIPE"),
    notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  }),
});

export const customerOrderParamSchema = z.object({
  params: orderIdParam,
});

export const cancelOrderSchema = z.object({
  params: orderIdParam,
});

export const paginationSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(100).default(10),
    })
    .default({}),
});

// ──────────────────────────────────────────────
// Admin Schemas
// ──────────────────────────────────────────────

export const adminOrderParamSchema = z.object({
  params: orderIdParam,
});

export const adminOrderListSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(100).default(10),
      status: z.nativeEnum(OrderStatus).optional(),
      userId: z.string().uuid("Invalid user ID format").optional(),
    })
    .default({}),
});

export const updateOrderStatusSchema = z.object({
  params: orderIdParam,
  body: z.object({
    status: z.nativeEnum(OrderStatus),
  }),
});

export const updatePaymentStatusSchema = z.object({
  params: orderIdParam,
  body: z.object({
    status: z.nativeEnum(PaymentStatus),
    transactionId: z.string().optional(),
  }),
});
