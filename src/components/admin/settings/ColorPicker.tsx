"use client";

import React, { useState } from "react";
import { Palette, Check } from "lucide-react";

interface ColorPickerProps {
  primaryColor: string;
  accentColor: string;
  onChangePrimary: (color: string) => void;
  onChangeAccent: (color: string) => void;
}

const saffronPresets = ["#F57C00", "#E06D00", "#D97706", "#B45309"];
const maroonPresets = ["#701A75", "#800020", "#831843", "#4C1D95"];

export function ColorPicker({
  primaryColor,
  accentColor,
  onChangePrimary,
  onChangeAccent,
}: ColorPickerProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {/* Saffron Primary Color Selector */}
        <div style={{ background: "#FAF8F3", padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#171717", marginBottom: 6 }}>
            Primary Color (Saffron Accent)
          </div>
          <div style={{ fontSize: 12, color: "#666666", marginBottom: 12 }}>
            Used for primary call-to-action buttons, active badges, and highlight elements.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {saffronPresets.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => onChangePrimary(hex)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: hex,
                  border: primaryColor === hex ? "2px solid #171717" : "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                {primaryColor === hex && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Deep Maroon Accent Selector */}
        <div style={{ background: "#FAF8F3", padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#171717", marginBottom: 6 }}>
            Secondary Accent (Deep Maroon)
          </div>
          <div style={{ fontSize: 12, color: "#666666", marginBottom: 12 }}>
            Used for royal accents, sacred headings, and contrast badges.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {maroonPresets.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => onChangeAccent(hex)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: hex,
                  border: accentColor === hex ? "2px solid #171717" : "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                {accentColor === hex && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview Box */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", padding: 16, borderRadius: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#666666", marginBottom: 10 }}>Theme Preview</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: primaryColor,
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Primary Action Button
          </button>

          <span
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              background: `${accentColor}15`,
              color: accentColor,
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            Deep Maroon Badge
          </span>
        </div>
      </div>
    </div>
  );
}
