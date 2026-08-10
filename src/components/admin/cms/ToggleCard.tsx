"use client";

import React from "react";

interface ToggleCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

export function ToggleCard({ title, description, checked, onChange }: ToggleCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderRadius: 10,
        background: "#FAF8F3",
        border: "1px solid rgba(0,0,0,0.06)",
        gap: 14,
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>{title}</div>
        <div style={{ fontSize: 11, color: "#666666", marginTop: 2 }}>{description}</div>
      </div>

      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: 40,
          height: 22,
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: checked ? "#F57C00" : "#D1D5DB",
            borderRadius: 22,
            transition: "background-color 0.2s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              content: '""',
              height: 16,
              width: 16,
              left: checked ? 21 : 3,
              bottom: 3,
              backgroundColor: "#FFFFFF",
              borderRadius: "50%",
              transition: "left 0.2s ease",
            }}
          />
        </span>
      </label>
    </div>
  );
}
