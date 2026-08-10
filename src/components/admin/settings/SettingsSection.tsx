"use client";

import React from "react";
import { Save } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
  isSaving?: boolean;
}

export function SettingsSection({
  title,
  subtitle,
  icon: Icon,
  children,
  onSave,
  saveLabel = "Save Changes",
  isSaving = false,
}: SettingsSectionProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {Icon && (
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(245,124,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F57C00",
              }}
            >
              <Icon size={18} />
            </div>
          )}
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#171717", margin: 0 }}>{title}</h3>
            {subtitle && <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>{subtitle}</p>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>

      {onSave && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              borderRadius: 10,
              border: "none",
              background: isSaving ? "#16A34A" : "#F57C00",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(245,124,0,0.25)",
              transition: "all 0.15s ease",
            }}
          >
            <Save size={15} />
            <span>{isSaving ? "Saved Successfully!" : saveLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
