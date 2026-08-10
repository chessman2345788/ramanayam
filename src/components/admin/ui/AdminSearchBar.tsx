"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxWidth?: string;
}

export function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  maxWidth = "max-w-md",
}: AdminSearchBarProps) {
  return (
    <div className={`relative flex-1 ${maxWidth} ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl text-xs font-medium text-stone-900 placeholder:text-stone-400 outline-hidden transition-all shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-0.5 rounded-md hover:bg-stone-200/50"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
