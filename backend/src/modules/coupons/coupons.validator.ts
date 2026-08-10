import { z } from "zod";

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(3).max(30).transform((val) => val.toUpperCase()),
    description: z.string().optional(),
    discountType: z.enum(["PERCENTAGE", "FIXED"]).default("PERCENTAGE"),
    discountValue: z.number().positive(),
    minOrderAmount: z.number().nonnegative().optional(),
    maxDiscount: z.number().nonnegative().optional(),
    usageLimit: z.number().int().positive().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    isActive: z.boolean().default(true),
  }),
});

export const updateCouponSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: createCouponSchema.shape.body.partial(),
});

export const validateCouponSchema = z.object({
  body: z.object({
    code: z.string().min(1).transform((val) => val.toUpperCase()),
    cartTotal: z.number().nonnegative(),
  }),
});

export const couponParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const couponQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
    limit: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 10)),
    search: z.string().optional(),
    isActive: z.string().optional().transform((v) => (v === "true" ? true : v === "false" ? false : undefined)),
  }),
});
