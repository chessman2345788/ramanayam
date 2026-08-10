"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ProductPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-xs text-[#666666]">
      {/* Page Size Selector & Counter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 px-2 bg-white border border-black/10 rounded-lg font-semibold text-[#171717] focus:outline-none focus:border-[#F57C00]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>per page</span>
        </div>

        <span className="text-[#999999]">|</span>

        <span>
          Showing <strong className="text-[#171717]">{startItem}</strong> to{" "}
          <strong className="text-[#171717]">{endItem}</strong> of{" "}
          <strong className="text-[#171717]">{totalItems}</strong> products
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-black/10 bg-white text-[#171717] hover:bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="px-3 font-semibold text-[#171717]">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-black/10 bg-white text-[#171717] hover:bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
