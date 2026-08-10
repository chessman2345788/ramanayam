"use client";

import React from "react";
import { OrderFilterOptions } from "@/types/orders";
import { Filter, RotateCcw, ArrowUpDown } from "lucide-react";

interface OrderFiltersProps {
  filters: OrderFilterOptions;
  onFilterChange: (updated: Partial<OrderFilterOptions>) => void;
  onReset: () => void;
}

export function OrderFilters({ filters, onFilterChange, onReset }: OrderFiltersProps) {
  const hasActiveFilters =
    filters.orderStatus !== "ALL" ||
    filters.paymentStatus !== "ALL" ||
    filters.paymentMethod !== "ALL" ||
    filters.dateRange !== "ALL" ||
    filters.sortBy !== "newest";

  return (
    <div className="flex flex-wrap items-center gap-2.5 py-1">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mr-1">
        <Filter className="w-3.5 h-3.5 text-[#F57C00]" />
        <span>Filters:</span>
      </div>

      {/* Order Status Select */}
      <select
        value={filters.orderStatus}
        onChange={(e) => onFilterChange({ orderStatus: e.target.value })}
        className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
      >
        <option value="ALL">All Order Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Packed">Packed</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Returned">Returned</option>
        <option value="Refunded">Refunded</option>
      </select>

      {/* Payment Status Select */}
      <select
        value={filters.paymentStatus}
        onChange={(e) => onFilterChange({ paymentStatus: e.target.value })}
        className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
      >
        <option value="ALL">All Payment Statuses</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
        <option value="Refunded">Refunded</option>
        <option value="Partially Refunded">Partially Refunded</option>
      </select>

      {/* Payment Method Select */}
      <select
        value={filters.paymentMethod}
        onChange={(e) => onFilterChange({ paymentMethod: e.target.value })}
        className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
      >
        <option value="ALL">All Payment Methods</option>
        <option value="UPI">UPI / Razorpay</option>
        <option value="Credit/Debit Card">Credit/Debit Card</option>
        <option value="Netbanking">Netbanking</option>
        <option value="Cash on Delivery">Cash on Delivery (COD)</option>
      </select>

      {/* Date Range Select */}
      <select
        value={filters.dateRange}
        onChange={(e) => onFilterChange({ dateRange: e.target.value })}
        className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00] shadow-xs cursor-pointer"
      >
        <option value="ALL">All Time</option>
        <option value="TODAY">Today</option>
        <option value="YESTERDAY">Yesterday</option>
        <option value="LAST_7_DAYS">Last 7 Days</option>
        <option value="LAST_30_DAYS">Last 30 Days</option>
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
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
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
