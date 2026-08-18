"use client";

import React from "react";
import { VendorStatus } from "@/data/mockVendorsData";
import { CheckCircle2, Clock, Ban, XCircle, PowerOff } from "lucide-react";

interface VendorStatusBadgeProps {
  status: VendorStatus;
}

export function VendorStatusBadge({ status }: VendorStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "Active",
        };
      case "PENDING":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
          label: "Pending",
        };
      case "SUSPENDED":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <Ban className="w-3.5 h-3.5 text-rose-600" />,
          label: "Suspended",
        };
      case "REJECTED":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          icon: <XCircle className="w-3.5 h-3.5 text-red-600" />,
          label: "Rejected",
        };
      case "INACTIVE":
        return {
          bg: "bg-stone-100 text-stone-600 border-stone-300",
          icon: <PowerOff className="w-3.5 h-3.5 text-stone-500" />,
          label: "Inactive",
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
