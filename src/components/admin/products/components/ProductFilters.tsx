"use client";

import React, { useState, useRef, useEffect } from "react";
import { Filter, RotateCcw, ChevronDown, Check } from "lucide-react";
import { ProductFilterState } from "../types/product.types";

interface ProductFiltersProps {
  filters: ProductFilterState;
  onFilterChange: (newFilters: ProductFilterState) => void;
  onReset: () => void;
  activeFilterCount: number;
}

export function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  activeFilterCount,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        {/* Filter Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 h-9 border rounded-xl text-xs font-semibold transition-all ${
            activeFilterCount > 0
              ? "border-[#F57C00] bg-[#F57C00]/10 text-[#F57C00]"
              : "border-black/10 bg-white text-[#555555] hover:text-[#171717] hover:bg-[#FAF8F3]"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#F57C00] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Sort Selector */}
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({ ...filters, sortBy: e.target.value as any })
          }
          className="h-9 px-3 text-xs bg-white border border-black/10 rounded-xl text-[#171717] font-semibold focus:outline-none focus:border-[#F57C00]"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="name">Sort: Name (A-Z)</option>
          <option value="priceLow">Sort: Price (Low to High)</option>
          <option value="priceHigh">Sort: Price (High to Low)</option>
          <option value="stock">Sort: Stock Level</option>
          <option value="popularity">Sort: Most Popular</option>
        </select>
      </div>

      {/* Filter Drawer / Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-black/10 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-black/6">
            <h3 className="font-serif font-bold text-sm text-[#7A1F1F]">
              Filter Catalogue
            </h3>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-[#F57C00] hover:underline font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset all
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 py-3 text-xs">
            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold text-[#666666] mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                className="w-full h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
              >
                <option value="">All Categories</option>
                <option value="Puja Essentials">Puja Essentials</option>
                <option value="Incense & Fragrance">Incense & Fragrance</option>
                <option value="Sacred Beads">Sacred Beads</option>
                <option value="Idols & Utensils">Idols & Utensils</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-semibold text-[#666666] mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                className="w-full h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Material */}
            <div>
              <label className="block text-[11px] font-semibold text-[#666666] mb-1">Material</label>
              <select
                value={filters.material}
                onChange={(e) => onFilterChange({ ...filters, material: e.target.value })}
                className="w-full h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
              >
                <option value="">All Materials</option>
                <option value="Brass">Brass</option>
                <option value="Pure Copper">Pure Copper</option>
                <option value="Sandalwood">Sandalwood</option>
                <option value="Rudraksha">Rudraksha</option>
              </select>
            </div>

            {/* Deity */}
            <div>
              <label className="block text-[11px] font-semibold text-[#666666] mb-1">Deity / Dedicated To</label>
              <select
                value={filters.deity}
                onChange={(e) => onFilterChange({ ...filters, deity: e.target.value })}
                className="w-full h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
              >
                <option value="">All Deities</option>
                <option value="Lord Shiva">Lord Shiva</option>
                <option value="Goddess Lakshmi">Goddess Lakshmi</option>
                <option value="Universal">Universal</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-black/6 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 bg-[#F57C00] text-white font-semibold rounded-xl text-xs hover:bg-[#E06D00]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
