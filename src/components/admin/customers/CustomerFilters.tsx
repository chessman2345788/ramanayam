"use client";

import React from "react";
import { CustomerFilterOptions } from "@/types/customers";
import { Filter, RotateCcw, ArrowUpDown } from "lucide-react";

interface CustomerFiltersProps {
  filters: CustomerFilterOptions;
  onFilterChange: (updated: Partial<CustomerFilterOptions>) => void;
  onReset: () => void;
}

export function CustomerFilters({ filters, onFilterChange, onReset }: CustomerFiltersProps) {
  const hasActiveFilters =
    filters.status !== "ALL" ||
    filters.customerType !== "ALL" ||
    filters.sortBy !== "newest";

  return (
    <div className="flex flex-wrap items-center gap-2.5 py-1">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mr-1">
        <Filter className="w-3.5 h-3.5 text-[#F57C00]" />
        <span>Filters:</span>
      </div>

      {/* Customer Status Select */}
      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
      >
        <option value="ALL">All Statuses</option>
        <option value="Active">Active</option>
        <option value="VIP">VIP</option>
        <option value="Verified">Verified</option>
        <option value="Guest">Guest</option>
        <option value="Blocked">Blocked</option>
      </select>

      {/* Customer Type Select */}
      <select
        value={filters.customerType}
        onChange={(e) => onFilterChange({ customerType: e.target.value })}
        className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
      >
        <option value="ALL">All Customer Types</option>
        <option value="Retail">Retail</option>
        <option value="Wholesale">Wholesale</option>
      </select>

      {/* Sort Select */}
      <div className="flex items-center gap-1.5 ml-auto">
        <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest_spending">Highest Spending</option>
          <option value="most_orders">Most Orders</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
