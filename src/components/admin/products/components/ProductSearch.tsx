"use client";

import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (query: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3 text-[#999999] pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name, SKU, category, brand..."
          className="w-full h-9 pl-9 pr-12 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] placeholder-[#999999] focus:outline-none focus:bg-white focus:border-[#F57C00] focus:ring-1 focus:ring-[#F57C00] transition-all"
        />

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 text-[#999999] hover:text-[#171717] p-0.5 rounded-full"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="absolute right-2.5 hidden sm:inline-block px-1.5 py-0.5 bg-black/4 border border-black/5 rounded text-[10px] font-mono text-[#999999]">
            ⌘F
          </span>
        )}
      </div>
    </div>
  );
}
