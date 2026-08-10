import { UserRole, AccountStatus, ProductStatus, OrderStatus, PaymentStatus } from "@prisma/client";

export interface DashboardOverview {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: any[];
  lowStockItems: any[];
  topProducts: any[];
}

export interface AdminStats {
  orderStatusCounts: Record<string, number>;
  userRoleCounts: Record<string, number>;
  userStatusCounts: Record<string, number>;
  monthlyRevenue: any[];
  recentPayments: any[];
}

export interface UserQueryFilters {
  page?: number;
  limit?: number;
  role?: UserRole;
  accountStatus?: AccountStatus;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ProductQueryFilters {
  page?: number;
  limit?: number;
  status?: ProductStatus;
  categoryId?: string;
  vendorId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface OrderQueryFilters {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  userId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaymentQueryFilters {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
  provider?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ReviewQueryFilters {
  page?: number;
  limit?: number;
  rating?: number;
  productId?: string;
  userId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateUserRoleInput {
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  accountStatus?: AccountStatus;
}

export interface UpdateUserStatusInput {
  accountStatus: AccountStatus;
  reason?: string;
}

export interface UpdateProductInput {
  status?: ProductStatus;
  featured?: boolean;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

export interface AuditLogPayload {
  adminId: string;
  action: string;
  targetId: string;
  details?: Record<string, any>;
  timestamp: Date;
}
