"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search media by name, folder, format...",
}) => {
  return (
    <div className="relative flex-1 min-w-60">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700/60">
        <Search size={16} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-white border border-stone-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 placeholder-stone-400 transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
