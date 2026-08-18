import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockCouponsList } from "@/data/mockCouponsData";
import { QueryParams } from "@/types/api";

export class AdminCouponsService {
  static async getCoupons(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/coupons", params);
        return res.data;
      },
      mockCouponsList,
      "Admin Coupons List"
    );
  }

  static async createCoupon(couponData: any) {
    const res = await ApiClient.post("/coupons", couponData);
    return res.data;
  }

  static async updateCoupon(id: string, couponData: any) {
    const res = await ApiClient.patch(`/coupons/${id}`, couponData);
    return res.data;
  }

  static async deleteCoupon(id: string) {
    const res = await ApiClient.delete(`/coupons/${id}`);
    return res.data;
  }
}
