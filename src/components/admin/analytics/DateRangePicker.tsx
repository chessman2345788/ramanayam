"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";

export type DateRangePreset = "today" | "yesterday" | "7days" | "30days" | "ytd" | "custom";

interface DateRangePickerProps {
  selectedRange: DateRangePreset;
  onRangeChange: (range: DateRangePreset) => void;
}

const presets: { id: DateRangePreset; label: string; subtext: string }[] = [
  { id: "today", label: "Today", subtext: "3 Aug 2026" },
  { id: "yesterday", label: "Yesterday", subtext: "2 Aug 2026" },
  { id: "7days", label: "Last 7 Days", subtext: "28 Jul - 3 Aug" },
  { id: "30days", label: "Last 30 Days", subtext: "4 Jul - 3 Aug" },
  { id: "ytd", label: "Year to Date (YTD)", subtext: "1 Jan - 3 Aug 2026" },
  { id: "custom", label: "Custom Range...", subtext: "Select dates" },
];

export function DateRangePicker({ selectedRange, onRangeChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activePreset = presets.find((p) => p.id === selectedRange) || presets[3];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 10,
          padding: "8px 14px",
          fontSize: 13,
          fontWeight: 500,
          color: "#171717",
          cursor: "pointer",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#F57C00";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
        }}
      >
        <Calendar size={16} style={{ color: "#F57C00" }} />
        <span>{activePreset.label}</span>
        <span style={{ fontSize: 11, color: "#666666", fontWeight: 400 }}>({activePreset.subtext})</span>
        <ChevronDown size={14} style={{ color: "#999999", marginLeft: 4 }} />
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 6px)",
              width: 240,
              background: "#FFFFFF",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              padding: 6,
              zIndex: 50,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: "#999999", padding: "8px 10px 4px", textTransform: "uppercase" }}>
              Filter Date Range
            </div>
            {presets.map((preset) => {
              const isSelected = preset.id === selectedRange;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onRangeChange(preset.id);
                    setIsOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: isSelected ? "rgba(245,124,0,0.08)" : "transparent",
                    color: isSelected ? "#F57C00" : "#171717",
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "#FAF8F3";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div>
                    <div>{preset.label}</div>
                    <div style={{ fontSize: 11, color: "#999999" }}>{preset.subtext}</div>
                  </div>
                  {isSelected && <Check size={14} style={{ color: "#F57C00" }} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
