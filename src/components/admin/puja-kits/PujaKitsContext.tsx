"use client";

import React, { createContext, useContext, useState } from "react";
import { PujaKitCombo } from "@/types/pujaKits";
import { mockPujaKitsList } from "@/data/mockPujaKitsData";

interface PujaKitsContextType {
  kits: PujaKitCombo[];
  addKit: (data: Omit<PujaKitCombo, "id">) => PujaKitCombo;
  updateKit: (id: string, data: Partial<PujaKitCombo>) => void;
  deleteKit: (id: string) => void;
}

const PujaKitsContext = createContext<PujaKitsContextType | undefined>(undefined);

export function PujaKitsProvider({ children }: { children: React.ReactNode }) {
  const [kits, setKits] = useState<PujaKitCombo[]>(mockPujaKitsList);

  const addKit = (data: Omit<PujaKitCombo, "id">) => {
    const newKit: PujaKitCombo = {
      ...data,
      id: `kit_${Date.now().toString(36)}`,
    };
    setKits((prev) => [newKit, ...prev]);
    return newKit;
  };

  const updateKit = (id: string, data: Partial<PujaKitCombo>) => {
    setKits((prev) => prev.map((k) => (k.id === id ? { ...k, ...data } : k)));
  };

  const deleteKit = (id: string) => {
    setKits((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <PujaKitsContext.Provider value={{ kits, addKit, updateKit, deleteKit }}>
      {children}
    </PujaKitsContext.Provider>
  );
}

export function usePujaKits() {
  const context = useContext(PujaKitsContext);
  if (!context) throw new Error("usePujaKits must be used within a PujaKitsProvider");
  return context;
}
