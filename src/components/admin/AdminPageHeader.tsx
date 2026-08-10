"use client";

import React from "react";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: AdminPageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: 0,
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: "4px 0 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
