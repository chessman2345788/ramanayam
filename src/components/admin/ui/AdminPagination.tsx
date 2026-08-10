"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  className = "",
}: AdminPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl px-5 py-3.5 shadow-2xs text-xs font-medium text-stone-600 ${className}`}>
      {/* Item Range Count */}
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="text-stone-900 font-semibold">{startItem}</strong> to{" "}
          <strong className="text-stone-900 font-semibold">{endItem}</strong> of{" "}
          <strong className="text-stone-900 font-semibold">{totalItems}</strong> entries
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2 border-l border-stone-200 pl-3">
            <span className="text-stone-400">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs font-semibold text-stone-800 outline-hidden focus:border-amber-500 cursor-pointer"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 font-semibold rounded-lg text-xs">
          Page {currentPage} of {Math.max(1, totalPages)}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
