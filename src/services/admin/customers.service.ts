import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockCustomersList } from "@/data/mockCustomersData";
import { QueryParams } from "@/types/api";

export class AdminCustomersService {
  static async getCustomers(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/users", params);
        return res.data;
      },
      mockCustomersList,
      "Admin Customers List"
    );
  }

  static async getCustomerById(id: string) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get(`/admin/users/${id}`);
        return res.data;
      },
      mockCustomersList.find((c) => c.id === id) || mockCustomersList[0],
      "Admin Customer Detail"
    );
  }

  static async updateCustomerStatus(id: string, status: "ACTIVE" | "BLOCKED") {
    const res = await ApiClient.patch(`/admin/users/${id}/status`, { status });
    return res.data;
  }
}
