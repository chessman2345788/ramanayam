import { z } from "zod";
import { VendorStatus } from "@prisma/client";

export const createVendorSchema = z.object({
  body: z.object({
    businessName: z.string().min(2, "Business name must be at least 2 characters").max(100),
    ownerName: z.string().min(2, "Owner name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Invalid phone number format").max(20),
    description: z.string().max(1000).optional(),
    logo: z.string().url("Logo must be a valid URL").optional(),
    banner: z.string().url("Banner must be a valid URL").optional(),
    gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid Indian GST format").optional(),
    panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid Indian PAN format").optional(),
  }),
});

export const updateVendorSchema = z.object({
  body: z.object({
    businessName: z.string().min(2).max(100).optional(),
    ownerName: z.string().min(2).max(100).optional(),
    phone: z.string().min(8).max(20).optional(),
    description: z.string().max(1000).optional(),
    logo: z.string().url("Logo must be a valid URL").optional(),
    banner: z.string().url("Banner must be a valid URL").optional(),
    gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid Indian GST format").optional(),
    panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid Indian PAN format").optional(),
  }),
});

export const vendorParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid vendor ID format"),
  }),
});

export const vendorSlugParamsSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Vendor slug is required"),
  }),
});

export const adminVendorStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid vendor ID format"),
  }),
  body: z.object({
    status: z.nativeEnum(VendorStatus, { required_error: "status is required" }),
  }),
});

export const adminVendorVerifySchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid vendor ID format"),
  }),
  body: z.object({
    isVerified: z.boolean({ required_error: "isVerified boolean is required" }),
  }),
});

export const vendorQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    status: z.nativeEnum(VendorStatus).optional(),
    isVerified: z.string().optional().transform((val) => (val === "true" ? true : val === "false" ? false : undefined)),
    search: z.string().optional(),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});
