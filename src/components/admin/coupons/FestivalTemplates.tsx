"use client";

import React from "react";
import { Sparkles, Flame } from "lucide-react";
import { mockFestivalTemplates, FestivalTemplate } from "@/data/mockCouponsData";

interface FestivalTemplatesProps {
  onSelectTemplate: (template: FestivalTemplate) => void;
}

export function FestivalTemplates({ onSelectTemplate }: FestivalTemplatesProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FAF8F3 100%)",
        borderRadius: 16,
        border: "1px solid rgba(245,124,0,0.2)",
        padding: 20,
        boxShadow: "0 4px 16px rgba(245,124,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #F57C00 0%, #701A75 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
            }}
          >
            <Flame size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "#171717", margin: 0 }}>
              Religious Festival Campaign Templates
            </h4>
            <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
              Click any temple festival template to prefill recommended discount rules and campaign codes.
            </p>
          </div>
        </div>
      </div>

      {/* Templates horizontal grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 10,
        }}
      >
        {mockFestivalTemplates.map((tmpl) => (
          <button
            key={tmpl.id}
            type="button"
            onClick={() => onSelectTemplate(tmpl)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${tmpl.color}30`,
              background: "#FFFFFF",
              cursor: "pointer",
              textAlign: "left",
              gap: 8,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tmpl.color;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${tmpl.color}30`;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: tmpl.color, display: "flex", alignItems: "center", gap: 4 }}>
                <Sparkles size={12} /> {tmpl.festivalName}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains, monospace)",
                  fontSize: 10,
                  fontWeight: 700,
                  background: `${tmpl.color}12`,
                  color: tmpl.color,
                  padding: "1px 5px",
                  borderRadius: 4,
                }}
              >
                {tmpl.recommendedCode}
              </span>
            </div>

            <div style={{ fontSize: 11, color: "#666666", lineHeight: 1.3 }}>{tmpl.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
