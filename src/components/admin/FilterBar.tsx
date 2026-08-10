"use client";

import React from "react";
import { SearchBar } from "./SearchBar";
import { Filter } from "lucide-react";

export interface FilterSelect {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

export interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

export interface FilterBarProps {
  search?: {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
  };
  filters?: FilterSelect[];
  tabs?: {
    items: FilterTab[];
    activeId: string;
    onChange: (id: string) => void;
  };
  actions?: React.ReactNode;
}

export function FilterBar({ search, filters, tabs, actions }: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3">
      {tabs && tabs.items.length > 0 && (
        <div className="flex items-center gap-1 border-b border-stone-100 pb-3 overflow-x-auto">
          {tabs.items.map((tab) => {
            const isActive = tab.id === tabs.activeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => tabs.onChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-amber-100/70 text-amber-900 border border-amber-300 shadow-2xs"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-amber-600 text-white" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          {search && (
            <SearchBar
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder}
              maxWidth={340}
            />
          )}

          {filters && filters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map((flt) => (
                <div key={flt.id} className="relative inline-flex items-center">
                  <select
                    value={flt.value}
                    onChange={(e) => flt.onChange(e.target.value)}
                    className="px-3 py-2 pr-7 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 bg-white text-stone-700 font-medium transition-all shadow-2xs"
                  >
                    {flt.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {flt.label}: {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
