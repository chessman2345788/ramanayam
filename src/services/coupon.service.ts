import { axiosClient } from "@/lib/api-axios";

export interface CouponItem {
  id: string;
  code: string;
  description?: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon: {
    id: string;
    code: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number;
    description?: string;
  };
  discountAmount: number;
  finalTotal: number;
}

export const CouponService = {
  fetchCoupons: async (params?: Record<string, any>): Promise<CouponItem[]> => {
    try {
      const res = await axiosClient.get("/coupons", { params });
      return res.data?.data || res.data || [];
    } catch (err: any) {
      console.warn("Fetch coupons API error, returning empty list:", err.message);
      return [];
    }
  },

  createCoupon: async (payload: Partial<CouponItem>): Promise<CouponItem | null> => {
    try {
      const res = await axiosClient.post("/coupons", payload);
      return res.data?.data || res.data;
    } catch (err: any) {
      console.warn("Create coupon API error:", err.message);
      throw err;
    }
  },

  updateCoupon: async (id: string, payload: Partial<CouponItem>): Promise<CouponItem | null> => {
    try {
      const res = await axiosClient.patch(`/coupons/${id}`, payload);
      return res.data?.data || res.data;
    } catch (err: any) {
      console.warn("Update coupon API error:", err.message);
      throw err;
    }
  },

  deleteCoupon: async (id: string): Promise<boolean> => {
    try {
      await axiosClient.delete(`/coupons/${id}`);
      return true;
    } catch (err: any) {
      console.warn("Delete coupon API error:", err.message);
      throw err;
    }
  },

  validateCoupon: async (code: string, cartTotal: number): Promise<CouponValidationResult> => {
    const res = await axiosClient.post("/coupons/validate", { code, cartTotal });
    return res.data?.data || res.data;
  },
};
