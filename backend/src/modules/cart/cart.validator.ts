import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    variantId: z.string().uuid("Invalid variant ID format"),
    quantity: z
      .number()
      .int("Quantity must be a whole number")
      .min(1, "Quantity must be at least 1")
      .max(50, "Quantity cannot exceed 50 per item")
      .default(1),
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({
    itemId: z.string().uuid("Invalid cart item ID format"),
  }),
  body: z.object({
    quantity: z
      .number()
      .int("Quantity must be a whole number")
      .min(1, "Quantity must be at least 1")
      .max(50, "Quantity cannot exceed 50 per item"),
  }),
});

export const removeCartItemSchema = z.object({
  params: z.object({
    itemId: z.string().uuid("Invalid cart item ID format"),
  }),
});
