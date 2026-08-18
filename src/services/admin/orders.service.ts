import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockOrdersList } from "@/data/mockOrdersData";
import { QueryParams } from "@/types/api";

export class AdminOrdersService {
  static async getOrders(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/orders", params);
        return res.data;
      },
      mockOrdersList,
      "Admin Orders List"
    );
  }

  static async updateOrderStatus(id: string, status: string, trackingNumber?: string) {
    const res = await ApiClient.patch(`/admin/orders/${id}/status`, { status, trackingNumber });
    return res.data;
  }
}
