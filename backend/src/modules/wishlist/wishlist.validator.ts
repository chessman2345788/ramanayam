import { z } from "zod";

export const addToWishlistSchema = z.object({
  body: z.object({
    productId: z.string().uuid("Invalid product ID format"),
    variantId: z.string().uuid("Invalid variant ID format").optional(),
  }),
});

export const removeFromWishlistSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID format"),
  }),
});
