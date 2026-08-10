"use client";

import React from "react";

interface ToggleCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  badge?: string;
  badgeColor?: string;
  icon?: React.ElementType;
}

export function ToggleCard({
  title,
  description,
  checked,
  onChange,
  badge,
  badgeColor = "#16A34A",
  icon: Icon,
}: ToggleCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: 12,
        background: "#FAF8F3",
        border: "1px solid rgba(0,0,0,0.06)",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {Icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F57C00",
              flexShrink: 0,
            }}
          >
            <Icon size={16} />
          </div>
        )}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#171717", display: "flex", alignItems: "center", gap: 8 }}>
            {title}
            {badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: badgeColor,
                  background: `${badgeColor}15`,
                  padding: "1px 6px",
                  borderRadius: 4,
                }}
              >
                {badge}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "#666666", marginTop: 2 }}>{description}</div>
        </div>
      </div>

      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: 44,
          height: 24,
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
            borderRadius: 24,
            transition: "background-color 0.2s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              content: '""',
              height: 18,
              width: 18,
              left: checked ? 23 : 3,
              bottom: 3,
              backgroundColor: "#FFFFFF",
              borderRadius: "50%",
              transition: "left 0.2s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </span>
      </label>
    </div>
  );
}
