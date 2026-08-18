"use client";

import React from "react";
import { Filter, Tag, Calendar, Users, ArrowUpDown, RotateCcw } from "lucide-react";
import { CouponStatus, DiscountType } from "@/data/mockCouponsData";

export type CouponSortOption = "newest" | "oldest" | "most_used" | "highest_discount";
export type DateRangeOption = "ALL" | "7d" | "30d" | "90d";
export type UsageFilterOption = "ALL" | "HIGH_USAGE" | "REACHED_LIMIT";

interface CouponFiltersProps {
  statusFilter: CouponStatus | "ALL";
  onStatusChange: (status: CouponStatus | "ALL") => void;
  typeFilter: DiscountType | "ALL";
  onTypeChange: (type: DiscountType | "ALL") => void;
  dateRangeFilter: DateRangeOption;
  onDateRangeChange: (val: DateRangeOption) => void;
  usageFilter: UsageFilterOption;
  onUsageChange: (val: UsageFilterOption) => void;
  sortOption: CouponSortOption;
  onSortChange: (sort: CouponSortOption) => void;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
}

export function CouponFilters({
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  dateRangeFilter,
  onDateRangeChange,
  usageFilter,
  onUsageChange,
  sortOption,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}: CouponFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Status Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Filter className="w-3.5 h-3.5 text-amber-600" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as CouponStatus | "ALL")}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="EXPIRED">Expired</option>
          <option value="DISABLED">Disabled</option>
          <option value="DRAFT">Draft</option>
        </select>
      </div>

      {/* Discount Type Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Tag className="w-3.5 h-3.5 text-purple-600" />
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value as DiscountType | "ALL")}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Discount Types</option>
          <option value="PERCENTAGE">Percentage (%)</option>
          <option value="FIXED_AMOUNT">Fixed Amount (₹)</option>
          <option value="PRODUCT_SPECIFIC">Product Specific</option>
          <option value="CATEGORY_SPECIFIC">Category Specific</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Calendar className="w-3.5 h-3.5 text-sky-600" />
        <select
          value={dateRangeFilter}
          onChange={(e) => onDateRangeChange(e.target.value as DateRangeOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Date Ranges</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Usage Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Users className="w-3.5 h-3.5 text-amber-700" />
        <select
          value={usageFilter}
          onChange={(e) => onUsageChange(e.target.value as UsageFilterOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Usages</option>
          <option value="HIGH_USAGE">High Usage (&gt;50%)</option>
          <option value="REACHED_LIMIT">Reached Limit (100%)</option>
        </select>
      </div>

      {/* Sort Option */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <ArrowUpDown className="w-3.5 h-3.5 text-stone-600" />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as CouponSortOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_used">Most Used</option>
          <option value="highest_discount">Highest Discount</option>
        </select>
      </div>

      {/* Reset Filters */}
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
