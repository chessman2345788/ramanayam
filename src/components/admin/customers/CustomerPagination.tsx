"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function CustomerPagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: CustomerPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-white border-t border-gray-100 text-xs text-gray-600">
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="font-semibold text-gray-900">{startItem}</strong> to{" "}
          <strong className="font-semibold text-gray-900">{endItem}</strong> of{" "}
          <strong className="font-semibold text-gray-900">{totalItems.toLocaleString()}</strong> customers
        </span>
        <div className="flex items-center gap-1.5 border-l border-gray-200 pl-3">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded font-medium text-gray-800 focus:outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1 font-medium text-gray-700">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
          className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
