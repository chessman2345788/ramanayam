"use client";

import React, { createContext, useContext, useState } from "react";
import { StorefrontBanner } from "@/types/banners";
import { mockBannersList } from "@/data/mockBannersData";

interface BannersContextType {
  banners: StorefrontBanner[];
  addBanner: (data: Omit<StorefrontBanner, "id" | "clickCount">) => void;
  updateBanner: (id: string, data: Partial<StorefrontBanner>) => void;
  deleteBanner: (id: string) => void;
  toggleStatus: (id: string) => void;
}

const BannersContext = createContext<BannersContextType | undefined>(undefined);

export function BannersProvider({ children }: { children: React.ReactNode }) {
  const [banners, setBanners] = useState<StorefrontBanner[]>(mockBannersList);

  const addBanner = (data: Omit<StorefrontBanner, "id" | "clickCount">) => {
    const newBan: StorefrontBanner = {
      ...data,
      id: `ban_${Date.now().toString(36)}`,
      clickCount: 0,
    };
    setBanners((prev) => [newBan, ...prev]);
  };

  const updateBanner = (id: string, data: Partial<StorefrontBanner>) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleStatus = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        return { ...b, status: b.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" };
      })
    );
  };

  return (
    <BannersContext.Provider value={{ banners, addBanner, updateBanner, deleteBanner, toggleStatus }}>
      {children}
    </BannersContext.Provider>
  );
}

export function useBanners() {
  const context = useContext(BannersContext);
  if (!context) throw new Error("useBanners must be used within a BannersProvider");
  return context;
}
