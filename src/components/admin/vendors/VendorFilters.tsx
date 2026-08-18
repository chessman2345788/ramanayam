"use client";

import React from "react";
import { Filter, ArrowUpDown, RotateCcw } from "lucide-react";
import { VendorStatus } from "@/data/mockVendorsData";

export type VendorSortOption = "newest" | "oldest" | "highest_sales" | "most_products";

interface VendorFiltersProps {
  statusFilter: VendorStatus | "ALL";
  onStatusChange: (status: VendorStatus | "ALL") => void;
  sortOption: VendorSortOption;
  onSortChange: (sort: VendorSortOption) => void;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
}

export function VendorFilters({
  statusFilter,
  onStatusChange,
  sortOption,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}: VendorFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Status Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Filter className="w-3.5 h-3.5 text-amber-600" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as VendorStatus | "ALL")}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="REJECTED">Rejected</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Sort Option */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <ArrowUpDown className="w-3.5 h-3.5 text-stone-600" />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as VendorSortOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest_sales">Highest Sales</option>
          <option value="most_products">Most Products</option>
        </select>
      </div>

      {/* Reset */}
      {hasActiveFilters && onResetFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
