"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface VendorSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function VendorSearch({
  value,
  onChange,
  placeholder = "Search vendor name, business, email, phone, or ID...",
}: VendorSearchProps) {
  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs font-medium bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-2xs transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
