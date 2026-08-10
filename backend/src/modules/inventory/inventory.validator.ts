import { z } from "zod";

// Common param schemas
export const variantParamSchema = z.object({
  params: z.object({
    variantId: z.string().uuid("Invalid variant ID format"),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid inventory ID format"),
  }),
});

// Query schemas
export const listInventoriesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    sort: z
      .enum(["newest", "oldest", "stock-asc", "stock-desc", "sku"])
      .optional()
      .default("newest"),
    sku: z.string().trim().optional(),
    product: z.string().trim().optional(),
    search: z.string().trim().optional(),
    lowStock: z.enum(["true", "false"]).optional(),
    outOfStock: z.enum(["true", "false"]).optional(),
  }),
});

export const paginationQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
  }),
});

// Body & Param schemas for modification endpoints
export const updateStockSchema = z.object({
  params: z.object({
    variantId: z.string().uuid("Invalid variant ID format"),
  }),
  body: z.object({
    availableStock: z
      .number({ required_error: "availableStock is required" })
      .int("Stock must be an integer")
      .min(0, "Stock cannot be negative"),
  }),
});

export const increaseStockSchema = z.object({
  params: z.object({
    variantId: z.string().uuid("Invalid variant ID format"),
  }),
  body: z.object({
    amount: z
      .number({ required_error: "amount is required" })
      .int("Amount must be an integer")
      .positive("Amount must be a positive integer"),
  }),
});

export const decreaseStockSchema = z.object({
  params: z.object({
    variantId: z.string().uuid("Invalid variant ID format"),
  }),
  body: z.object({
    amount: z
      .number({ required_error: "amount is required" })
      .int("Amount must be an integer")
      .positive("Amount must be a positive integer"),
  }),
});

export const adjustStockSchema = z.object({
  params: z.object({
    variantId: z.string().uuid("Invalid variant ID format"),
  }),
  body: z
    .object({
      availableStock: z
        .number()
        .int("Available stock must be an integer")
        .min(0, "Available stock cannot be negative")
        .optional(),
      reservedStock: z
        .number()
        .int("Reserved stock must be an integer")
        .min(0, "Reserved stock cannot be negative")
        .optional(),
      soldStock: z
        .number()
        .int("Sold stock must be an integer")
        .min(0, "Sold stock cannot be negative")
        .optional(),
      lowStockAlert: z
        .number()
        .int("Low stock alert must be an integer")
        .min(0, "Low stock alert cannot be negative")
        .optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one inventory field (availableStock, reservedStock, soldStock, lowStockAlert) must be provided to adjust stock",
    ),
});
