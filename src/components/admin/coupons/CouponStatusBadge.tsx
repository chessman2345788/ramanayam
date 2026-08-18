"use client";

import React from "react";
import { CouponStatus } from "@/data/mockCouponsData";
import { CheckCircle2, Clock, XCircle, PowerOff, FileEdit } from "lucide-react";

interface CouponStatusBadgeProps {
  status: CouponStatus;
}

export function CouponStatusBadge({ status }: CouponStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "Active",
        };
      case "SCHEDULED":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
          label: "Scheduled",
        };
      case "EXPIRED":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "Expired",
        };
      case "DISABLED":
        return {
          bg: "bg-stone-100 text-stone-600 border-stone-300",
          icon: <PowerOff className="w-3.5 h-3.5 text-stone-500" />,
          label: "Disabled",
        };
      case "DRAFT":
        return {
          bg: "bg-sky-50 text-sky-700 border-sky-200",
          icon: <FileEdit className="w-3.5 h-3.5 text-sky-600" />,
          label: "Draft",
        };
      default:
        return {
          bg: "bg-stone-100 text-stone-600 border-stone-200",
          icon: <Clock className="w-3.5 h-3.5 text-stone-400" />,
          label: status,
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border shadow-2xs transition-colors ${style.bg}`}
    >
      {style.icon}
      <span>{style.label}</span>
    </span>
  );
}
