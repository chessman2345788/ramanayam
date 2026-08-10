"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

export interface SearchBarProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
  maxWidth?: number | string;
}

export function SearchBar({
  value: controlledValue,
  onChange,
  placeholder = "Search dashboard items...",
  className = "",
  maxWidth = 360,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }}
    >
      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 bg-white text-stone-900 placeholder:text-stone-400 transition-all shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => handleChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
