"use client";

import React from "react";
import { CustomerStatus, CustomerType } from "@/types/customers";
import {
  CheckCircle2,
  ShieldCheck,
  Ban,
  Crown,
  UserCheck,
  Building,
  User,
} from "lucide-react";

interface CustomerStatusBadgeProps {
  status: CustomerStatus | CustomerType | "Verified";
  size?: "sm" | "md";
}

export function CustomerStatusBadge({ status, size = "md" }: CustomerStatusBadgeProps) {
  const isSm = size === "sm";

  const getStyle = () => {
    switch (status) {
      case "VIP":
        return { bg: "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30", icon: Crown };
      case "Active":
        return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 };
      case "Verified":
        return { bg: "bg-blue-50 text-blue-700 border-blue-200", icon: ShieldCheck };
      case "Blocked":
        return { bg: "bg-rose-50 text-rose-700 border-rose-200", icon: Ban };
      case "Guest":
        return { bg: "bg-gray-100 text-gray-700 border-gray-200", icon: UserCheck };
      case "Wholesale":
        return { bg: "bg-purple-50 text-purple-700 border-purple-200", icon: Building };
      case "Retail":
        return { bg: "bg-sky-50 text-sky-700 border-sky-200", icon: User };
      default:
        return { bg: "bg-slate-50 text-slate-700 border-slate-200", icon: User };
    }
  };

  const config = getStyle();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold border rounded-full ${
        config.bg
      } ${isSm ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
    >
      <Icon className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{status}</span>
    </span>
  );
}
