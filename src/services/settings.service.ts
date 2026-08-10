import { axiosClient } from "@/lib/api-axios";

export interface SystemSettingItem {
  id?: string;
  key: string;
  value: string;
  description?: string;
  category?: string;
}

export const SettingsService = {
  fetchSettings: async (category?: string): Promise<SystemSettingItem[]> => {
    try {
      const res = await axiosClient.get("/settings", {
        params: category ? { category } : undefined,
      });
      return res.data?.data || res.data || [];
    } catch (err: any) {
      console.warn("Fetch settings API error:", err.message);
      return [];
    }
  },

  updateSetting: async (key: string, value: string, category = "GENERAL"): Promise<SystemSettingItem | null> => {
    const res = await axiosClient.patch("/settings", { key, value, category });
    return res.data?.data || res.data;
  },

  bulkUpdateSettings: async (settings: SystemSettingItem[]): Promise<SystemSettingItem[]> => {
    const res = await axiosClient.patch("/settings/bulk", { settings });
    return res.data?.data || res.data || [];
  },
};
