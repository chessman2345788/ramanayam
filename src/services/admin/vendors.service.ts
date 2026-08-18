import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockVendorsList } from "@/data/mockVendorsData";
import { QueryParams } from "@/types/api";

export class AdminVendorsService {
  static async getVendors(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/vendors/admin/all", params);
        return res.data;
      },
      mockVendorsList,
      "Admin Vendors List"
    );
  }

  static async updateVendorStatus(id: string, status: string, reason?: string) {
    const res = await ApiClient.patch(`/vendors/admin/${id}/status`, { status, reason });
    return res.data;
  }

  static async toggleVendorVerification(id: string, isVerified: boolean) {
    const res = await ApiClient.patch(`/vendors/admin/${id}/verify`, { isVerified });
    return res.data;
  }
}
