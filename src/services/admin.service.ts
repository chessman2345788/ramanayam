import { axiosClient } from "@/lib/api-axios";

export interface AdminDashboardData {
  totalUsers: number;
  activeProducts: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  categoriesCount: number;
  totalRevenue: number;
  todayRevenue: number;
  lowStockCount: number;
  recentOrders: Array<{
    id: string;
    customerName: string;
    customerEmail: string;
    avatarUrl: string;
    amount: string;
    paymentMode: string;
    status: string;
    date: string;
  }>;
  lowStockItems: Array<{
    id: string;
    name: string;
    sku: string;
    stock: number;
    category: string;
  }>;
  recentCustomers: Array<{
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    joinedDate: string;
    ordersCount: number;
  }>;
  bestSellers: Array<{
    id: string;
    name: string;
    category: string;
    salesCount: number;
    revenue: string;
    rating: number;
    imageUrl: string;
  }>;
  revenueMonthly: Array<{ date: string; revenue: number; orders: number }>;
  revenueWeekly: Array<{ date: string; revenue: number; orders: number }>;
  revenueDaily: Array<{ date: string; revenue: number; orders: number }>;
}

export interface AdminUserListResult {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminReviewListResult {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminCouponListResult {
  items: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminVendorListResult {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const AdminService = {
  fetchDashboardFromApi: async (): Promise<AdminDashboardData> => {
    const res = await axiosClient.get("/admin/dashboard");
    const data = res.data?.data || res.data;
    return data;
  },

  /**
   * Fetch paginated user list with server-side search, filters, and sorting.
   */
  fetchUsersFromApi: async (params?: Record<string, any>): Promise<AdminUserListResult> => {
    const res = await axiosClient.get("/admin/users", { params });
    const payload = res.data?.data || res.data;

    // Backend returns { data: [...], total, page, limit, totalPages }
    if (payload && Array.isArray(payload.data)) {
      return {
        data: payload.data,
        total: payload.total || payload.data.length,
        page: payload.page || 1,
        limit: payload.limit || 10,
        totalPages: payload.totalPages || 1,
      };
    }

    // Fallback: raw array
    const list = Array.isArray(payload) ? payload : [];
    return { data: list, total: list.length, page: 1, limit: 10, totalPages: 1 };
  },

  /**
   * Fetch single user by ID with addresses, orders, and counts.
   */
  fetchUserByIdFromApi: async (id: string): Promise<any> => {
    const res = await axiosClient.get(`/admin/users/${id}`);
    return res.data?.data?.user || res.data?.user || res.data?.data || res.data;
  },

  /**
   * Update user fields (firstName, lastName, role, accountStatus).
   */
  updateUserFromApi: async (id: string, data: Record<string, any>): Promise<any> => {
    const res = await axiosClient.patch(`/admin/users/${id}`, data);
    return res.data?.data?.user || res.data?.user || res.data?.data || res.data;
  },

  /**
   * Update user account status (ACTIVE, BLOCKED, INACTIVE, PENDING) with optional reason.
   */
  updateUserStatusFromApi: async (id: string, accountStatus: string, reason?: string): Promise<any> => {
    const res = await axiosClient.patch(`/admin/users/${id}/status`, { accountStatus, reason });
    return res.data?.data?.user || res.data?.user || res.data?.data || res.data;
  },

  /**
   * Update user role (ADMIN, VENDOR, CUSTOMER).
   */
  updateUserRoleFromApi: async (id: string, role: string): Promise<any> => {
    const res = await axiosClient.patch(`/admin/users/${id}/role`, { role });
    return res.data?.data?.user || res.data?.user || res.data?.data || res.data;
  },

  /**
   * Fetch paginated reviews from API with query filters (search, rating, productId, userId, page, limit).
   */
  fetchReviewsListFromApi: async (params?: Record<string, any>): Promise<AdminReviewListResult> => {
    const res = await axiosClient.get("/admin/reviews", { params });
    const payload = res.data?.data || res.data;

    if (payload && Array.isArray(payload.data)) {
      return {
        data: payload.data,
        total: payload.total || payload.data.length,
        page: payload.page || 1,
        limit: payload.limit || 10,
        totalPages: payload.totalPages || 1,
      };
    }

    const list = Array.isArray(payload) ? payload : [];
    return { data: list, total: list.length, page: 1, limit: 10, totalPages: 1 };
  },

  fetchReviewsFromApi: async (params?: Record<string, any>): Promise<any[]> => {
    try {
      const res = await axiosClient.get("/admin/reviews", { params });
      const list = res.data?.data?.data || res.data?.data?.items || res.data?.data || res.data;
      if (Array.isArray(list)) {
        return list;
      }
      return [];
    } catch {
      return [];
    }
  },

  /**
   * Update review (rating, comment).
   */
  updateReviewFromApi: async (id: string, data: { rating?: number; comment?: string }): Promise<any> => {
    const res = await axiosClient.patch(`/admin/reviews/${id}`, data);
    return res.data?.data?.review || res.data?.review || res.data?.data || res.data;
  },

  /**
   * Delete review by ID.
   */
  deleteReviewFromApi: async (id: string): Promise<any> => {
    const res = await axiosClient.delete(`/admin/reviews/${id}`);
    return res.data?.data || res.data;
  },

  /**
   * Fetch paginated coupons list from API.
   */
  fetchCouponsFromApi: async (params?: Record<string, any>): Promise<AdminCouponListResult> => {
    const res = await axiosClient.get("/coupons", { params });
    const payload = res.data?.data || res.data;

    if (payload && Array.isArray(payload.items)) {
      return {
        items: payload.items,
        total: payload.total || payload.items.length,
        page: payload.page || 1,
        limit: payload.limit || 10,
        totalPages: payload.totalPages || 1,
      };
    }

    const list = Array.isArray(payload) ? payload : [];
    return { items: list, total: list.length, page: 1, limit: 10, totalPages: 1 };
  },

  /**
   * Fetch single coupon by ID.
   */
  fetchCouponByIdFromApi: async (id: string): Promise<any> => {
    const res = await axiosClient.get(`/coupons/${id}`);
    return res.data?.data || res.data;
  },

  /**
   * Create new coupon.
   */
  createCouponInApi: async (data: Record<string, any>): Promise<any> => {
    const res = await axiosClient.post("/coupons", data);
    return res.data?.data || res.data;
  },

  /**
   * Update existing coupon.
   */
  updateCouponInApi: async (id: string, data: Record<string, any>): Promise<any> => {
    const res = await axiosClient.patch(`/coupons/${id}`, data);
    return res.data?.data || res.data;
  },

  /**
   * Delete coupon.
   */
  deleteCouponFromApi: async (id: string): Promise<any> => {
    const res = await axiosClient.delete(`/coupons/${id}`);
    return res.data?.data || res.data;
  },

  /**
   * Public coupon validation.
   */
  validateCouponInApi: async (data: { code: string; cartTotal: number }): Promise<any> => {
    const res = await axiosClient.post("/coupons/validate", data);
    return res.data?.data || res.data;
  },

  /**
   * Fetch real PostgreSQL-backed analytics overview.
   */
  fetchAnalyticsFromApi: async (params?: Record<string, any>): Promise<any> => {
    const res = await axiosClient.get("/admin/analytics/overview", { params });
    return res.data?.data || res.data;
  },

  /**
   * Fetch paginated vendors list for admin moderation.
   */
  fetchVendorsListFromApi: async (params?: Record<string, any>): Promise<AdminVendorListResult> => {
    const res = await axiosClient.get("/vendors/admin/all", { params });
    const payload = res.data?.data || res.data;

    if (payload && Array.isArray(payload.data)) {
      return {
        data: payload.data,
        total: payload.total || payload.data.length,
        page: payload.page || 1,
        limit: payload.limit || 10,
        totalPages: payload.totalPages || 1,
      };
    }

    const list = Array.isArray(payload) ? payload : [];
    return { data: list, total: list.length, page: 1, limit: 10, totalPages: 1 };
  },

  /**
   * Fetch single vendor details by ID.
   */
  fetchVendorByIdFromApi: async (id: string): Promise<any> => {
    const res = await axiosClient.get(`/vendors/${id}`);
    return res.data?.data?.vendor || res.data?.vendor || res.data?.data || res.data;
  },

  /**
   * Fetch products belonging to a vendor.
   */
  fetchVendorProductsFromApi: async (id: string, params?: Record<string, any>): Promise<any> => {
    const res = await axiosClient.get(`/vendors/${id}/products`, { params });
    return res.data?.data || res.data;
  },

  /**
   * Update vendor status (ACTIVE, SUSPENDED, INACTIVE, PENDING).
   */
  updateVendorStatusInApi: async (id: string, status: string, reason?: string): Promise<any> => {
    const res = await axiosClient.patch(`/vendors/admin/${id}/status`, { status, reason });
    return res.data?.data?.vendor || res.data?.vendor || res.data?.data || res.data;
  },

  /**
   * Toggle vendor verification badge.
   */
  toggleVendorVerifyInApi: async (id: string, isVerified: boolean): Promise<any> => {
    const res = await axiosClient.patch(`/vendors/admin/${id}/verify`, { isVerified });
    return res.data?.data?.vendor || res.data?.vendor || res.data?.data || res.data;
  },

  /**
   * Fetch system settings from API.
   */
  fetchSettingsFromApi: async (category?: string): Promise<any[]> => {
    const res = await axiosClient.get("/settings", { params: { category } });
    const payload = res.data?.data || res.data;
    return Array.isArray(payload) ? payload : [];
  },

  /**
   * Update single setting.
   */
  updateSettingInApi: async (data: { key: string; value: string; description?: string; category?: string }): Promise<any> => {
    const res = await axiosClient.patch("/settings", data);
    return res.data?.data || res.data;
  },

  /**
   * Bulk update settings.
   */
  updateSettingsBulkInApi: async (settings: Array<{ key: string; value: string; description?: string; category?: string }>): Promise<any> => {
    const res = await axiosClient.patch("/settings/bulk", { settings });
    return res.data?.data || res.data;
  },
};
