"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { InventoryFilterState, StockStatus } from "@/types/inventory";

interface InventoryFiltersProps {
  filters: InventoryFilterState;
  onFilterChange: (updates: Partial<InventoryFilterState>) => void;
  categories: string[];
  vendors: string[];
  warehouses: string[];
  totalFilteredCount: number;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  filters,
  onFilterChange,
  categories,
  vendors,
  warehouses,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.searchQuery ||
    filters.category !== "ALL" ||
    filters.vendor !== "ALL" ||
    filters.warehouse !== "ALL" ||
    filters.stockStatus !== "ALL";

  const handleReset = () => {
    onFilterChange({
      searchQuery: "",
      category: "ALL",
      vendor: "ALL",
      warehouse: "ALL",
      stockStatus: "ALL",
      sortBy: "newest",
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50/90 p-3 rounded-2xl border border-stone-200/80">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-600 font-medium">
          <Filter size={13} className="text-amber-600" />
          <span>Filters</span>
        </div>

        {/* Status Dropdown */}
        <select
          value={filters.stockStatus}
          onChange={(e) => onFilterChange({ stockStatus: e.target.value as StockStatus | "ALL" })}
          className="bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
        >
          <option value="ALL">All Stock Statuses</option>
          <option value="IN_STOCK">In Stock Only</option>
          <option value="LOW_STOCK">Low Stock Alert</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
          <option value="RESERVED">Reserved Stock</option>
        </select>

        {/* Warehouse Dropdown */}
        <select
          value={filters.warehouse}
          onChange={(e) => onFilterChange({ warehouse: e.target.value })}
          className="bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-42.5 truncate"
        >
          <option value="ALL">All Warehouses</option>
          {warehouses.map((wh) => (
            <option key={wh} value={wh}>
              {wh}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-40 truncate"
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Vendor Dropdown */}
        <select
          value={filters.vendor}
          onChange={(e) => onFilterChange({ vendor: e.target.value })}
          className="bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-40 truncate"
        >
          <option value="ALL">All Vendors</option>
          {vendors.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {/* Sort Selector */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as InventoryFilterState["sortBy"] })}
          className="bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
        >
          <option value="newest">Sort: Recently Updated</option>
          <option value="name_asc">Sort: Name (A to Z)</option>
          <option value="stock_desc">Sort: Highest Stock</option>
          <option value="stock_asc">Sort: Lowest Stock</option>
        </select>

        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-stone-600 hover:text-amber-800 hover:bg-stone-200/60 rounded-lg transition-colors font-medium"
            title="Reset Filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="text-xs text-stone-500 font-semibold ml-auto">
        {totalFilteredCount} {totalFilteredCount === 1 ? "product item" : "product items"}
      </div>
    </div>
  );
};
