import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Category name is required").max(100, "Category name too long"),
    slug: z
      .string()
      .min(1, "Slug is required")
      .max(120, "Slug too long")
      .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only"),
    description: z.string().max(500, "Description too long").optional().nullable(),
    image: z.string().url("Invalid image URL").optional().nullable(),
    parentId: z.string().uuid("Invalid parent category ID").optional().nullable(),
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
  body: z.object({
    name: z.string().min(1, "Category name cannot be empty").max(100, "Category name too long").optional(),
    slug: z
      .string()
      .min(1, "Slug cannot be empty")
      .max(120, "Slug too long")
      .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only")
      .optional(),
    description: z.string().max(500, "Description too long").optional().nullable(),
    image: z.string().url("Invalid image URL").optional().nullable(),
    parentId: z.string().uuid("Invalid parent category ID").optional().nullable(),
    isActive: z.boolean().optional(),
  }),
});

export const getCategoryBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Slug is required"),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
});

export const listCategoriesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().max(100).optional(),
    isActive: z.enum(["true", "false"]).optional(),
    parentId: z.string().uuid("Invalid parent ID").optional(),
  }),
});
