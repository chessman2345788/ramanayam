import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    productId: z.string().uuid("Invalid product ID format"),
    rating: z
      .number({ required_error: "Rating is required" })
      .int("Rating must be a whole integer")
      .min(1, "Minimum rating is 1 star")
      .max(5, "Maximum rating is 5 stars"),
    comment: z
      .string()
      .max(1000, "Comment cannot exceed 1000 characters")
      .optional(),
  }),
});

export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid review ID format"),
  }),
  body: z
    .object({
      rating: z
        .number()
        .int("Rating must be a whole integer")
        .min(1, "Minimum rating is 1 star")
        .max(5, "Maximum rating is 5 stars")
        .optional(),
      comment: z
        .string()
        .max(1000, "Comment cannot exceed 1000 characters")
        .optional(),
    })
    .refine((data) => data.rating !== undefined || data.comment !== undefined, {
      message: "At least one field (rating or comment) must be provided for update",
    }),
});

export const reviewParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid review ID format"),
  }),
});

export const productReviewParamsSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID format"),
  }),
});

export const reviewQuerySchema = z.object({
  query: z.object({
    productId: z.string().uuid("Invalid product ID format").optional(),
    userId: z.string().uuid("Invalid user ID format").optional(),
    rating: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined)),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
    sortBy: z.enum(["createdAt", "rating"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});
