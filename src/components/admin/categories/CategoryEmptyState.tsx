"use client";

import React from "react";
import { FolderPlus, RotateCcw } from "lucide-react";

interface CategoryEmptyStateProps {
  hasFilters: boolean;
  onResetFilters: () => void;
  onAddCategory: () => void;
}

export const CategoryEmptyState: React.FC<CategoryEmptyStateProps> = ({
  hasFilters,
  onResetFilters,
  onAddCategory,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
        <FolderPlus size={32} />
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-base font-bold text-stone-900">
          {hasFilters ? "No matching categories found" : "No categories created yet"}
        </h3>
        <p className="text-xs text-stone-500">
          {hasFilters
            ? "Try adjusting your search keywords, parent category, or status filters to find what you need."
            : "Organize your catalogue by creating your first product category or subcategory."}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {hasFilters ? (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>Reset Search & Filters</span>
          </button>
        ) : (
          <button
            onClick={onAddCategory}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-1.5"
          >
            <FolderPlus size={16} />
            <span>Create First Category</span>
          </button>
        )}
      </div>
    </div>
  );
};
