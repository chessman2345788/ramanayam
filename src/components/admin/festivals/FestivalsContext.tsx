"use client";

import React, { createContext, useContext, useState } from "react";
import { FestivalCampaign, FestivalStatus } from "@/types/festivals";
import { mockFestivalsList } from "@/data/mockFestivalsData";

interface FestivalsContextType {
  festivals: FestivalCampaign[];
  addFestival: (data: Omit<FestivalCampaign, "id" | "salesGenerated" | "ordersCount">) => void;
  updateFestival: (id: string, data: Partial<FestivalCampaign>) => void;
  deleteFestival: (id: string) => void;
  toggleStatus: (id: string) => void;
}

const FestivalsContext = createContext<FestivalsContextType | undefined>(undefined);

export function FestivalsProvider({ children }: { children: React.ReactNode }) {
  const [festivals, setFestivals] = useState<FestivalCampaign[]>(mockFestivalsList);

  const addFestival = (data: Omit<FestivalCampaign, "id" | "salesGenerated" | "ordersCount">) => {
    const newFest: FestivalCampaign = {
      ...data,
      id: `fest_${Date.now().toString(36)}`,
      salesGenerated: "₹0",
      ordersCount: 0,
    };
    setFestivals((prev) => [newFest, ...prev]);
  };

  const updateFestival = (id: string, data: Partial<FestivalCampaign>) => {
    setFestivals((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
  };

  const deleteFestival = (id: string) => {
    setFestivals((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleStatus = (id: string) => {
    setFestivals((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const nextStatus: FestivalStatus = f.status === "ACTIVE" ? "COMPLETED" : "ACTIVE";
        return { ...f, status: nextStatus };
      })
    );
  };

  return (
    <FestivalsContext.Provider value={{ festivals, addFestival, updateFestival, deleteFestival, toggleStatus }}>
      {children}
    </FestivalsContext.Provider>
  );
}

export function useFestivals() {
  const context = useContext(FestivalsContext);
  if (!context) throw new Error("useFestivals must be used within a FestivalsProvider");
  return context;
}
