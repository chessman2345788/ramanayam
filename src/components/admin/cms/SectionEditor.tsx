"use client";

import React from "react";
import { Save } from "lucide-react";

interface SectionEditorProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  onSave: () => void;
  isSaving?: boolean;
}

export function SectionEditor({
  title,
  subtitle,
  icon: Icon,
  children,
  onSave,
  isSaving = false,
}: SectionEditorProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {Icon && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(245,124,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F57C00",
              }}
            >
              <Icon size={16} />
            </div>
          )}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>{title}</h3>
            {subtitle && <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>{subtitle}</p>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 14, display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 18px",
            borderRadius: 8,
            border: "none",
            background: isSaving ? "#16A34A" : "#F57C00",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(245,124,0,0.2)",
            transition: "all 0.15s ease",
          }}
        >
          <Save size={14} />
          <span>{isSaving ? "Publishing..." : "Save Section"}</span>
        </button>
      </div>
    </div>
  );
}
