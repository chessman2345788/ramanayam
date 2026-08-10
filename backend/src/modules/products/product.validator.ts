import { z } from "zod";
import { ProductStatus } from "@prisma/client";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ==========================================
// Product Schemas
// ==========================================

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name is required").max(200, "Product name is too long"),
    slug: z
      .string()
      .min(1, "Slug is required")
      .max(220, "Slug is too long")
      .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only")
      .optional(),
    shortDescription: z.string().max(500, "Short description is too long").optional().nullable(),
    description: z.string().optional().nullable(),
    categoryId: z.string().uuid("Invalid category ID format"),
    vendorId: z.string().uuid("Invalid vendor ID format"),
    status: z.nativeEnum(ProductStatus).optional().default(ProductStatus.DRAFT),
    featured: z.boolean().optional().default(false),
    publishedAt: z.string().datetime().optional().nullable(),
    seoTitle: z.string().max(150).optional().nullable(),
    seoDescription: z.string().max(300).optional().nullable(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product ID format"),
  }),
  body: z.object({
    name: z.string().min(1, "Product name cannot be empty").max(200).optional(),
    slug: z
      .string()
      .min(1, "Slug cannot be empty")
      .max(220)
      .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only")
      .optional(),
    shortDescription: z.string().max(500).optional().nullable(),
    description: z.string().optional().nullable(),
    categoryId: z.string().uuid("Invalid category ID format").optional(),
    vendorId: z.string().uuid("Invalid vendor ID format").optional(),
    status: z.nativeEnum(ProductStatus).optional(),
    featured: z.boolean().optional(),
    publishedAt: z.string().datetime().optional().nullable(),
    seoTitle: z.string().max(150).optional().nullable(),
    seoDescription: z.string().max(300).optional().nullable(),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product ID format"),
  }),
});

export const productSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Slug is required"),
  }),
});

export const categoryProductsSchema = z.object({
  params: z.object({
    categoryId: z.string().min(1, "Category ID or slug is required"),
  }),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const listProductsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z
      .enum(["newest", "oldest", "price-asc", "price_asc", "price-desc", "price_desc", "popularity", "bestseller"])
      .optional(),
    category: z.string().optional(),
    categoryId: z.string().optional(),
    vendor: z.string().optional(),
    vendorId: z.string().optional(),
    status: z.nativeEnum(ProductStatus).optional(),
    featured: z.enum(["true", "false"]).optional(),
    availability: z.enum(["true", "false"]).optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    search: z.string().max(100).optional(),
    q: z.string().max(100).optional(),
  }),
});

export const searchProductsQuerySchema = z.object({
  query: z.object({
    q: z.string().max(100).optional(),
    search: z.string().max(100).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const paginationQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

// ==========================================
// Variant Schemas
// ==========================================

export const createVariantSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID format"),
  }),
  body: z.object({
    sku: z.string().min(1, "SKU is required").max(100, "SKU is too long"),
    barcode: z.string().max(100).optional().nullable(),
    variantName: z.string().min(1, "Variant name is required").max(150, "Variant name is too long"),
    price: z.number().positive("Price must be a positive number"),
    compareAtPrice: z.number().positive("Compare at price must be positive").optional().nullable(),
    costPrice: z.number().positive("Cost price must be positive").optional().nullable(),
    weight: z.number().positive("Weight must be positive").optional().nullable(),
    length: z.number().positive("Length must be positive").optional().nullable(),
    width: z.number().positive("Width must be positive").optional().nullable(),
    height: z.number().positive("Height must be positive").optional().nullable(),
    isDefault: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true),
    stock: z.number().int().min(0, "Stock cannot be negative").optional().default(0),
  }),
});

export const updateVariantSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid variant ID format"),
  }),
  body: z.object({
    sku: z.string().min(1).max(100).optional(),
    barcode: z.string().max(100).optional().nullable(),
    variantName: z.string().min(1).max(150).optional(),
    price: z.number().positive().optional(),
    compareAtPrice: z.number().positive().optional().nullable(),
    costPrice: z.number().positive().optional().nullable(),
    weight: z.number().positive().optional().nullable(),
    length: z.number().positive().optional().nullable(),
    width: z.number().positive().optional().nullable(),
    height: z.number().positive().optional().nullable(),
    isDefault: z.boolean().optional(),
    isActive: z.boolean().optional(),
    stock: z.number().int().min(0).optional(),
  }),
});

export const variantIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid variant ID format"),
  }),
});

// ==========================================
// Image Schemas
// ==========================================

export const imageUploadSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID format"),
  }),
  body: z.object({
    imageUrl: z.string().url("Invalid image URL format"),
    altText: z.string().max(200).optional().nullable(),
    isPrimary: z.boolean().optional().default(false),
    sortOrder: z.number().int().optional().default(0),
  }),
});

export const imageIdParamSchema = z.object({
  params: z.object({
    imageId: z.string().uuid("Invalid image ID format"),
  }),
});

export const setPrimaryImageParamSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID format"),
    imageId: z.string().uuid("Invalid image ID format"),
  }),
});

// ==========================================
// Collection Schemas
// ==========================================

export const createCollectionSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Collection name is required").max(150),
    slug: z
      .string()
      .min(1, "Slug is required")
      .max(170)
      .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only"),
    description: z.string().max(500).optional().nullable(),
    image: z.string().url("Invalid image URL").optional().nullable(),
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateCollectionSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid collection ID format"),
  }),
  body: z.object({
    name: z.string().min(1).max(150).optional(),
    slug: z
      .string()
      .min(1)
      .max(170)
      .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only")
      .optional(),
    description: z.string().max(500).optional().nullable(),
    image: z.string().url("Invalid image URL").optional().nullable(),
    isActive: z.boolean().optional(),
  }),
});

export const collectionIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid collection ID format"),
  }),
});

export const assignCollectionSchema = z.object({
  params: z.object({
    collectionId: z.string().uuid("Invalid collection ID format"),
  }),
  body: z.object({
    productId: z.string().uuid("Invalid product ID format"),
  }),
});

export const removeCollectionParamSchema = z.object({
  params: z.object({
    collectionId: z.string().uuid("Invalid collection ID format"),
    productId: z.string().uuid("Invalid product ID format"),
  }),
});
