import { z } from "zod";

export const createBannerSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    subtitle: z.string().optional(),
    imageUrl: z.string().url(),
    linkUrl: z.string().optional(),
    buttonText: z.string().optional(),
    position: z.string().default("HERO"),
    sortOrder: z.number().int().default(0),
    isActive: z.boolean().default(true),
  }),
});

export const updateBannerSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: createBannerSchema.shape.body.partial(),
});

export const bannerParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateSectionSchema = z.object({
  params: z.object({
    key: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(2),
    subtitle: z.string().optional(),
    contentJson: z.string(),
    isActive: z.boolean().optional(),
  }),
});
