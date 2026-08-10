"use client";

import React from "react";
import { Filter, LayoutList, FolderTree, Grid, RotateCcw } from "lucide-react";
import { CategoryFilterState, CategoryItem, CategoryStatus, CategoryViewMode, CategorySortOption } from "@/types/category";

interface CategoryFiltersProps {
  filters: CategoryFilterState;
  onFilterChange: (updates: Partial<CategoryFilterState>) => void;
  categories: CategoryItem[];
  totalResultsCount: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onFilterChange,
  categories,
  totalResultsCount,
}) => {
  const topLevelCategories = categories.filter((c) => !c.parentId);
  const isFiltered = filters.searchQuery || filters.status !== "ALL" || filters.parentId !== "ALL";

  const handleReset = () => {
    onFilterChange({
      searchQuery: "",
      status: "ALL",
      parentId: "ALL",
      sortBy: "newest",
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50/80 p-3 rounded-xl border border-stone-200/80">
      {/* Left side: Filter dropdowns */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-600 font-medium">
          <Filter size={13} className="text-amber-600" />
          <span>Filters</span>
        </div>

        {/* Status Dropdown */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value as CategoryStatus | "ALL" })}
          className="bg-white border border-stone-200 text-stone-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="HIDDEN">Hidden</option>
          <option value="DRAFT">Draft</option>
        </select>

        {/* Parent Category Filter */}
        <select
          value={filters.parentId}
          onChange={(e) => onFilterChange({ parentId: e.target.value })}
          className="bg-white border border-stone-200 text-stone-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-45 truncate"
        >
          <option value="ALL">All Parent Categories</option>
          <option value="ROOT_ONLY">Top-Level Only</option>
          {topLevelCategories.map((parent) => (
            <option key={parent.id} value={parent.id}>
              Sub of {parent.name}
            </option>
          ))}
        </select>

        {/* Sort Selector */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as CategorySortOption })}
          className="bg-white border border-stone-200 text-stone-700 font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="name_asc">Sort: Name (A to Z)</option>
          <option value="name_desc">Sort: Name (Z to A)</option>
          <option value="products_desc">Sort: Most Products</option>
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

      {/* Right side: View Mode Toggles & Counter */}
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
          {totalResultsCount} {totalResultsCount === 1 ? "category" : "categories"}
        </span>

        <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => onFilterChange({ viewMode: "table" })}
            className={`p-1.5 rounded-md transition-colors ${
              filters.viewMode === "table"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            }`}
            title="Table View"
          >
            <LayoutList size={15} />
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ viewMode: "tree" })}
            className={`p-1.5 rounded-md transition-colors ${
              filters.viewMode === "tree"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            }`}
            title="Category Tree View"
          >
            <FolderTree size={15} />
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ viewMode: "cards" })}
            className={`p-1.5 rounded-md transition-colors ${
              filters.viewMode === "cards"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            }`}
            title="Grid Cards View"
          >
            <Grid size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
