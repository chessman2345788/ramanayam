"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InventoryPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const InventoryPagination: React.FC<InventoryPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalItems <= 5) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white px-4 py-3 border border-stone-200 rounded-2xl text-xs text-stone-600 shadow-xs">
      <div className="flex items-center gap-2">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-stone-50 border border-stone-200 text-stone-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={25}>25 items per page</option>
          <option value={50}>50 items per page</option>
        </select>
        <span className="hidden sm:inline">
          | Showing <strong className="text-stone-900 font-semibold">{startItem}</strong> to{" "}
          <strong className="text-stone-900 font-semibold">{endItem}</strong> of{" "}
          <strong className="text-stone-900 font-semibold">{totalItems}</strong> inventory items
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="px-3 font-semibold text-stone-800">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
