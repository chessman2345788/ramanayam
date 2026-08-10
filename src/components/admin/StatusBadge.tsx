"use client";

import React from "react";
import { CheckCircle, AlertTriangle, XCircle, Clock, Info } from "lucide-react";

export type StatusVariant = "success" | "warning" | "error" | "info" | "neutral";

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  variant,
  size = "md",
  showIcon = true,
  className = "",
}: StatusBadgeProps) {
  const normalized = status.toUpperCase().replace(/_/g, " ");

  // Auto detect variant if not explicitly passed
  let computedVariant: StatusVariant = variant || "neutral";
  if (!variant) {
    if (["ACTIVE", "PUBLISHED", "COMPLETED", "DELIVERED", "FULFILLED", "PAID", "APPROVED", "SUCCESS"].includes(normalized)) {
      computedVariant = "success";
    } else if (["PENDING", "PROCESSING", "INVITED", "DRAFT", "IN_STOCK", "LOW_STOCK", "WARNING"].includes(normalized)) {
      computedVariant = "warning";
    } else if (["DISABLED", "CANCELLED", "OUT_OF_STOCK", "REJECTED", "EXPIRED", "ERROR", "FAILED"].includes(normalized)) {
      computedVariant = "error";
    } else if (["INFO", "SHIPPED", "SYSTEM", "REFUNDED"].includes(normalized)) {
      computedVariant = "info";
    }
  }

  const variantStyles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800 border-amber-200/80",
    error: "bg-rose-50 text-rose-700 border-rose-200/80",
    info: "bg-sky-50 text-sky-700 border-sky-200/80",
    neutral: "bg-stone-100 text-stone-600 border-stone-200",
  };

  const IconComp = {
    success: CheckCircle,
    warning: Clock,
    error: XCircle,
    info: Info,
    neutral: AlertTriangle,
  }[computedVariant];

  const sizeStyles = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border ${variantStyles[computedVariant]} ${sizeStyles} ${className}`}
    >
      {showIcon && <IconComp className={iconSize} />}
      <span>{normalized}</span>
    </span>
  );
}
