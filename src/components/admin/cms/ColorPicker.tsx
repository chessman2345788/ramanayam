"use client";

import React from "react";
import { Check } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const defaultPresets = ["#701A75", "#F57C00", "#171717", "#16A34A", "#0284C7", "#D97706", "#FFFFFF"];

export function ColorPicker({ label, value, onChange, presets = defaultPresets }: ColorPickerProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="color"
          value={value.startsWith("#") ? value : "#701A75"}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 32, height: 32, padding: 0, border: "none", borderRadius: 6, cursor: "pointer" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {presets.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => onChange(hex)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: hex,
                border: value === hex ? "2px solid #171717" : "1px solid rgba(0,0,0,0.15)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: hex === "#FFFFFF" ? "#171717" : "#FFFFFF",
              }}
            >
              {value === hex && <Check size={12} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
