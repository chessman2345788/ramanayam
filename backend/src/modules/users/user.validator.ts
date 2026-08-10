import { z } from "zod";
import { AddressType, AccountStatus, UserRole } from "@prisma/client";

export const updateUserSchema = z.object({
  body: z
    .object({
      firstName: z.string().trim().min(1, "First name must not be empty").optional(),
      lastName: z.string().trim().min(1, "Last name must not be empty").optional(),
      phone: z.string().trim().min(1, "Phone must not be empty").optional().nullable(),
      profileImage: z.string().url("Invalid image URL format").optional().nullable(),
    })
    .strict(),
});

export const addressSchema = z.object({
  body: z
    .object({
      fullName: z.string().trim().min(1, "Full name is required"),
      phone: z.string().trim().min(1, "Phone number is required"),
      addressLine1: z.string().trim().min(1, "Address line 1 is required"),
      addressLine2: z.string().trim().optional().nullable(),
      city: z.string().trim().min(1, "City is required"),
      state: z.string().trim().min(1, "State is required"),
      country: z.string().trim().min(1, "Country is required"),
      postalCode: z.string().trim().min(1, "Postal code is required"),
      type: z.nativeEnum(AddressType),
      isDefault: z.boolean().optional().default(false),
    })
    .strict(),
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid address ID format"),
  }),
  body: z
    .object({
      fullName: z.string().trim().min(1, "Full name must not be empty").optional(),
      phone: z.string().trim().min(1, "Phone number must not be empty").optional(),
      addressLine1: z.string().trim().min(1, "Address line 1 must not be empty").optional(),
      addressLine2: z.string().trim().optional().nullable(),
      city: z.string().trim().min(1, "City must not be empty").optional(),
      state: z.string().trim().min(1, "State must not be empty").optional(),
      country: z.string().trim().min(1, "Country must not be empty").optional(),
      postalCode: z.string().trim().min(1, "Postal code must not be empty").optional(),
      type: z.nativeEnum(AddressType).optional(),
      isDefault: z.boolean().optional(),
    })
    .strict(),
});

export const addressIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid address ID format"),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
});

export const statusUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
  body: z
    .object({
      status: z.nativeEnum(AccountStatus),
    })
    .strict(),
});

export const roleUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
  body: z
    .object({
      role: z.nativeEnum(UserRole),
    })
    .strict(),
});

export const listUsersQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).optional().default(1),
      limit: z.coerce.number().int().min(1).max(100).optional().default(10),
      search: z.string().trim().optional(),
      status: z.nativeEnum(AccountStatus).optional(),
      role: z.nativeEnum(UserRole).optional(),
    })
    .optional(),
});
