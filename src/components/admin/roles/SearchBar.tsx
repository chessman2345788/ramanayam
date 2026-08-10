"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search roles by Name, Description, or Permissions...",
}: SearchBarProps) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
      <Search
        size={15}
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#999999",
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 34px 8px 36px",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.12)",
          background: "#FFFFFF",
          fontSize: 13,
          color: "#171717",
          outline: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          transition: "border-color 0.15s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#F57C00")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            color: "#999999",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
