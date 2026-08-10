"use client";

import React from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { HeroSlide } from "@/data/mockCmsData";
import { MediaSelector } from "./MediaSelector";

interface BannerEditorProps {
  slides: HeroSlide[];
  onChange: (slides: HeroSlide[]) => void;
}

export function BannerEditor({ slides, onChange }: BannerEditorProps) {
  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide_${Date.now()}`,
      bannerUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=1200&auto=format&fit=crop&q=80",
      title: "New Festive Banner Title",
      subtitle: "Subtitle description for store hero section...",
      buttonText: "Shop Collection",
      buttonLink: "/collections/diwali-mahotsav-collection",
      overlayOpacity: 0.4,
    };
    onChange([...slides, newSlide]);
  };

  const handleUpdateSlide = (id: string, updatedFields: Partial<HeroSlide>) => {
    onChange(slides.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)));
  };

  const handleRemoveSlide = (id: string) => {
    onChange(slides.filter((s) => s.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>Hero Banner Slides ({slides.length})</div>
        <button
          type="button"
          onClick={handleAddSlide}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "5px 10px",
            borderRadius: 6,
            border: "none",
            background: "#F57C00",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={13} /> Add New Slide
        </button>
      </div>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            background: "#FAF8F3",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#F57C00" }}>Slide #{index + 1}</span>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveSlide(slide.id)}
                style={{ border: "none", background: "transparent", color: "#DC2626", cursor: "pointer" }}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          <MediaSelector
            label="Slide Image URL"
            value={slide.bannerUrl}
            onChange={(url) => handleUpdateSlide(slide.id, { bannerUrl: url })}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#666666" }}>Heading Title</label>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleUpdateSlide(slide.id, { title: e.target.value })}
                style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12, outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#666666" }}>Subtitle Text</label>
              <input
                type="text"
                value={slide.subtitle}
                onChange={(e) => handleUpdateSlide(slide.id, { subtitle: e.target.value })}
                style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12, outline: "none" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
