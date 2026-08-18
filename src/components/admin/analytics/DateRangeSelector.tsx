"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";

export type DateRangeOption =
  | "today"
  | "yesterday"
  | "7days"
  | "30days"
  | "90days"
  | "this_year"
  | "custom";

interface DateRangeSelectorProps {
  selectedRange: DateRangeOption;
  onRangeChange: (range: DateRangeOption) => void;
}

const presets: { id: DateRangeOption; label: string; subtext: string }[] = [
  { id: "today", label: "Today", subtext: "12 Aug 2026" },
  { id: "yesterday", label: "Yesterday", subtext: "11 Aug 2026" },
  { id: "7days", label: "Last 7 Days", subtext: "5 Aug - 12 Aug" },
  { id: "30days", label: "Last 30 Days", subtext: "13 Jul - 12 Aug" },
  { id: "90days", label: "Last 90 Days", subtext: "14 May - 12 Aug" },
  { id: "this_year", label: "This Year", subtext: "1 Jan - 12 Aug 2026" },
  { id: "custom", label: "Custom Range...", subtext: "Pick dates" },
];

export function DateRangeSelector({ selectedRange, onRangeChange }: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activePreset = presets.find((p) => p.id === selectedRange) || presets[3];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 shadow-2xs hover:border-amber-600 transition-colors cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-amber-600" />
        <span>{activePreset.label}</span>
        <span className="text-[11px] font-normal text-stone-400">({activePreset.subtext})</span>
        <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-1" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-xl border border-stone-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-0.5">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2.5 py-1">
              Select Time Range
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
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-amber-50 text-amber-700 font-bold"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <div>
                    <div>{preset.label}</div>
                    <div className="text-[10px] text-stone-400 font-normal">{preset.subtext}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
