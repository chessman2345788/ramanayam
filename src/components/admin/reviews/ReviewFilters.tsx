"use client";

import React from "react";
import { Filter, Star, ShieldCheck, Calendar, ArrowUpDown, Tag, Package, RotateCcw } from "lucide-react";
import { ReviewStatus } from "@/data/mockReviewsData";

export type SortOption = "newest" | "oldest" | "rating_high" | "rating_low";
export type DateRangeOption = "ALL" | "7d" | "30d" | "90d";
export type VerifiedFilterOption = "ALL" | "VERIFIED" | "UNVERIFIED";

interface ReviewFiltersProps {
  statusFilter: ReviewStatus | "ALL";
  onStatusChange: (status: ReviewStatus | "ALL") => void;
  ratingFilter: number | "ALL";
  onRatingChange: (rating: number | "ALL") => void;
  verifiedFilter: VerifiedFilterOption;
  onVerifiedChange: (val: VerifiedFilterOption) => void;
  dateRangeFilter: DateRangeOption;
  onDateRangeChange: (val: DateRangeOption) => void;
  productFilter: string;
  onProductChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  productsList: string[];
  categoriesList: string[];
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export function ReviewFilters({
  statusFilter,
  onStatusChange,
  ratingFilter,
  onRatingChange,
  verifiedFilter,
  onVerifiedChange,
  dateRangeFilter,
  onDateRangeChange,
  productFilter,
  onProductChange,
  categoryFilter,
  onCategoryChange,
  sortOption,
  onSortChange,
  productsList,
  categoriesList,
  onResetFilters,
  hasActiveFilters,
}: ReviewFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Status Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Filter className="w-3.5 h-3.5 text-amber-600" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as ReviewStatus | "ALL")}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="HIDDEN">Hidden</option>
          <option value="REPORTED">Reported</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Rating Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <select
          value={ratingFilter}
          onChange={(e) =>
            onRatingChange(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
          }
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Verified Purchase Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <select
          value={verifiedFilter}
          onChange={(e) => onVerifiedChange(e.target.value as VerifiedFilterOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Purchases</option>
          <option value="VERIFIED">Verified Buyers Only</option>
          <option value="UNVERIFIED">Non-Verified</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <Calendar className="w-3.5 h-3.5 text-stone-500" />
        <select
          value={dateRangeFilter}
          onChange={(e) => onDateRangeChange(e.target.value as DateRangeOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="ALL">All Dates</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Category Filter */}
      {categoriesList.length > 0 && (
        <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
          <Tag className="w-3.5 h-3.5 text-purple-600" />
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer max-w-[130px] truncate"
          >
            <option value="ALL">All Categories</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Product Filter */}
      {productsList.length > 0 && (
        <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
          <Package className="w-3.5 h-3.5 text-amber-700" />
          <select
            value={productFilter}
            onChange={(e) => onProductChange(e.target.value)}
            className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer max-w-[150px] truncate"
          >
            <option value="ALL">All Products</option>
            {productsList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sort Option */}
      <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium">
        <ArrowUpDown className="w-3.5 h-3.5 text-stone-600" />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-transparent text-stone-800 font-semibold outline-none cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="rating_high">Rating: High to Low</option>
          <option value="rating_low">Rating: Low to High</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
