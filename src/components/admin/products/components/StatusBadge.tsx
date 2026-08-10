"use client";

import React from "react";
import { ProductStatus } from "../types/product.types";

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Draft":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Archived":
        return "bg-zinc-100 text-zinc-500 border-zinc-200";
      case "Out of Stock":
        return "bg-red-50 text-red-700 border-red-200";
      case "Low Stock":
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${getBadgeStyle()} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "Low Stock"
            ? "bg-amber-500 animate-pulse"
            : status === "Out of Stock"
            ? "bg-red-500 animate-pulse"
            : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}
