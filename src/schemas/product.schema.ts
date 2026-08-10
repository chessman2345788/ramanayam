import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens only")
    .or(z.literal("")),
  shortDesc: z.string().max(500, "Short description exceeds 500 characters").optional(),
  fullDesc: z.string().optional(),
  categoryId: z.string().optional(),
  category: z.string().optional(),
  vendorId: z.string().optional(),
  vendor: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().min(0, "Price cannot be negative"),
  mrp: z.number().min(0, "MRP cannot be negative").optional(),
  costPrice: z.number().min(0, "Cost price cannot be negative").optional(),
  gstRate: z.number(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  lowStockLimit: z.number().int().min(0),
  status: z.enum(["Active", "Draft", "Archived", "Out of Stock", "Low Stock", "ACTIVE", "DRAFT", "ARCHIVED"]),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  isNewArrival: z.boolean(),
  isTrending: z.boolean(),
  seoTitle: z.string().max(150, "SEO Title max 150 characters").optional(),
  seoDescription: z.string().max(300, "SEO Description max 300 characters").optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
