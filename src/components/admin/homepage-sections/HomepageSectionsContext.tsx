"use client";

import React, { createContext, useContext, useState } from "react";
import { HomepageSection } from "@/types/homepageSections";
import { mockHomepageSectionsList } from "@/data/mockHomepageSectionsData";

interface HomepageSectionsContextType {
  sections: HomepageSection[];
  toggleVisibility: (id: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
}

const HomepageSectionsContext = createContext<HomepageSectionsContextType | undefined>(undefined);

export function HomepageSectionsProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<HomepageSection[]>(mockHomepageSectionsList);

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  const moveUp = (id: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[idx - 1];
      next[idx - 1] = temp;
      return next.map((item, i) => ({ ...item, position: i + 1 }));
    });
  };

  const moveDown = (id: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[idx + 1];
      next[idx + 1] = temp;
      return next.map((item, i) => ({ ...item, position: i + 1 }));
    });
  };

  return (
    <HomepageSectionsContext.Provider value={{ sections, toggleVisibility, moveUp, moveDown }}>
      {children}
    </HomepageSectionsContext.Provider>
  );
}

export function useHomepageSections() {
  const context = useContext(HomepageSectionsContext);
  if (!context) throw new Error("useHomepageSections must be used within a HomepageSectionsProvider");
  return context;
}
