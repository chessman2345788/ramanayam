import { z } from "zod";
import { UserRole, AccountStatus, ProductStatus, OrderStatus, PaymentStatus } from "@prisma/client";

export const adminUserQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    role: z.nativeEnum(UserRole).optional(),
    accountStatus: z.nativeEnum(AccountStatus).optional(),
    search: z.string().optional(),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});

export const adminUserParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
});

export const adminUserUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
  body: z.object({
    role: z.nativeEnum(UserRole).optional(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    accountStatus: z.nativeEnum(AccountStatus).optional(),
  }),
});

export const adminUserStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
  body: z.object({
    accountStatus: z.nativeEnum(AccountStatus, { required_error: "accountStatus is required" }),
    reason: z.string().optional(),
  }),
});

export const adminProductQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    status: z.nativeEnum(ProductStatus).optional(),
    categoryId: z.string().uuid().optional(),
    vendorId: z.string().uuid().optional(),
    search: z.string().optional(),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});

export const adminProductParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product ID format"),
  }),
});

export const adminProductUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product ID format"),
  }),
  body: z.object({
    status: z.nativeEnum(ProductStatus).optional(),
    featured: z.boolean().optional(),
  }),
});

export const adminOrderQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    status: z.nativeEnum(OrderStatus).optional(),
    userId: z.string().uuid().optional(),
    search: z.string().optional(),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});

export const adminOrderParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid order ID format"),
  }),
});

export const adminOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid order ID format"),
  }),
  body: z.object({
    status: z.nativeEnum(OrderStatus, { required_error: "status is required" }),
  }),
});

export const adminPaymentQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    status: z.nativeEnum(PaymentStatus).optional(),
    provider: z.string().optional(),
    search: z.string().optional(),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});

export const adminReviewQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    rating: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
    productId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    search: z.string().optional(),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});

export const adminReviewParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid review ID format"),
  }),
});

export const adminReviewUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid review ID format"),
  }),
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().max(1000).optional(),
  }),
});
