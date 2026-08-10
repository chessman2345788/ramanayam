"use client";

import React from "react";
import { StockStatus } from "@/types/inventory";

interface StatusBadgeProps {
  status: StockStatus;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  switch (status) {
    case "IN_STOCK":
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-100 text-emerald-800 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          In Stock
        </span>
      );
    case "LOW_STOCK":
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-amber-100 text-amber-900 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Low Stock
        </span>
      );
    case "OUT_OF_STOCK":
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-rose-100 text-rose-800 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
          Out of Stock
        </span>
      );
    case "RESERVED":
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-purple-100 text-purple-800 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
          Reserved
        </span>
      );
    default:
      return null;
  }
};
