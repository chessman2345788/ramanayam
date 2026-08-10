import { z } from "zod";

export const updateSettingSchema = z.object({
  body: z.object({
    key: z.string().min(1),
    value: z.string(),
    description: z.string().optional(),
    category: z.string().default("GENERAL"),
  }),
});

export const bulkUpdateSettingsSchema = z.object({
  body: z.object({
    settings: z.array(
      z.object({
        key: z.string().min(1),
        value: z.string(),
        description: z.string().optional(),
        category: z.string().default("GENERAL"),
      })
    ),
  }),
});
