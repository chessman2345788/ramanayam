"use client";

import React from "react";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  rows = 4,
  placeholder = "Write content here...",
}: RichTextEditorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.12)",
          fontSize: 13,
          color: "#171717",
          lineHeight: 1.5,
          background: "#FAF8F3",
          outline: "none",
          resize: "vertical",
        }}
      />
    </div>
  );
}
