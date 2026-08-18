import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { initialMockInventory } from "@/data/mockInventoryData";
import { QueryParams } from "@/types/api";

export class AdminInventoryService {
  static async getInventory(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/inventory", params);
        return res.data;
      },
      initialMockInventory,
      "Admin Inventory List"
    );
  }

  static async adjustStock(id: string, quantity: number, reason?: string) {
    const res = await ApiClient.patch(`/inventory/${id}`, { quantity, reason });
    return res.data;
  }
}
