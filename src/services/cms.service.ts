import { axiosClient } from "@/lib/api-axios";

export interface CmsBannerItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  position: string;
  sortOrder: number;
  isActive: boolean;
}

export interface CmsSectionItem {
  id: string;
  sectionKey: string;
  title: string;
  subtitle?: string;
  contentJson: string;
  isActive: boolean;
}

export const CmsService = {
  fetchBanners: async (position?: string): Promise<CmsBannerItem[]> => {
    try {
      const res = await axiosClient.get("/cms/banners", {
        params: position ? { position } : undefined,
      });
      return res.data?.data || res.data || [];
    } catch (err: any) {
      console.warn("Fetch CMS banners API error:", err.message);
      return [];
    }
  },

  createBanner: async (payload: Partial<CmsBannerItem>): Promise<CmsBannerItem | null> => {
    const res = await axiosClient.post("/cms/banners", payload);
    return res.data?.data || res.data;
  },

  updateBanner: async (id: string, payload: Partial<CmsBannerItem>): Promise<CmsBannerItem | null> => {
    const res = await axiosClient.patch(`/cms/banners/${id}`, payload);
    return res.data?.data || res.data;
  },

  deleteBanner: async (id: string): Promise<boolean> => {
    await axiosClient.delete(`/cms/banners/${id}`);
    return true;
  },

  fetchSections: async (): Promise<CmsSectionItem[]> => {
    try {
      const res = await axiosClient.get("/cms/sections");
      return res.data?.data || res.data || [];
    } catch (err: any) {
      console.warn("Fetch CMS sections API error:", err.message);
      return [];
    }
  },

  updateSection: async (key: string, payload: Partial<CmsSectionItem>): Promise<CmsSectionItem | null> => {
    const res = await axiosClient.patch(`/cms/sections/${key}`, payload);
    return res.data?.data || res.data;
  },
};
