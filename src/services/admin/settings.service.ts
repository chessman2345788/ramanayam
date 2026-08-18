import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { initialStoreSettings } from "@/data/mockSettingsData";

export class AdminSettingsService {
  static async getSettings() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/settings");
        return res.data;
      },
      initialStoreSettings,
      "Admin Settings Config"
    );
  }

  static async updateSetting(key: string, value: any) {
    const res = await ApiClient.patch("/settings", { key, value });
    return res.data;
  }

  static async updateBulkSettings(settings: Record<string, any>) {
    const res = await ApiClient.patch("/settings/bulk", { settings });
    return res.data;
  }
}
