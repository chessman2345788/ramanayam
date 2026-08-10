"use client";

import React from "react";
import { Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface MediaSelectorProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function MediaSelector({
  label,
  value,
  onChange,
  placeholder = "https://images.unsplash.com/...",
}: MediaSelectorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>{label}</label>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            overflow: "hidden",
            background: "#FAF8F3",
            border: "1px solid rgba(0,0,0,0.1)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value ? (
            <img src={value} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <ImageIcon size={18} style={{ color: "#999999" }} />
          )}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            fontSize: 12,
            background: "#FAF8F3",
            fontFamily: "var(--font-jetbrains, monospace)",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
