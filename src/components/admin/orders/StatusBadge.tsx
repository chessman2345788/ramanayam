"use client";

import React from "react";
import { OrderStatus, PaymentStatus } from "@/types/orders";
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  CheckCheck,
  XCircle,
  RotateCcw,
  RefreshCw,
  AlertCircle,
  CreditCard,
} from "lucide-react";

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus;
  type?: "order" | "payment";
  size?: "sm" | "md";
}

export function StatusBadge({ status, type = "order", size = "md" }: StatusBadgeProps) {
  const isSm = size === "sm";

  const getOrderStyle = (st: OrderStatus) => {
    switch (st) {
      case "Pending":
        return { bg: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock };
      case "Confirmed":
        return { bg: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle2 };
      case "Packed":
        return { bg: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: Package };
      case "Shipped":
        return { bg: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck };
      case "Delivered":
        return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCheck };
      case "Cancelled":
        return { bg: "bg-rose-50 text-rose-700 border-rose-200", icon: XCircle };
      case "Returned":
        return { bg: "bg-orange-50 text-orange-700 border-orange-200", icon: RotateCcw };
      case "Refunded":
        return { bg: "bg-teal-50 text-teal-700 border-teal-200", icon: RefreshCw };
      default:
        return { bg: "bg-slate-50 text-slate-700 border-slate-200", icon: AlertCircle };
    }
  };

  const getPaymentStyle = (st: PaymentStatus) => {
    switch (st) {
      case "Paid":
        return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CreditCard };
      case "Pending":
        return { bg: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock };
      case "Failed":
        return { bg: "bg-rose-50 text-rose-700 border-rose-200", icon: XCircle };
      case "Refunded":
        return { bg: "bg-teal-50 text-teal-700 border-teal-200", icon: RefreshCw };
      case "Partially Refunded":
        return { bg: "bg-cyan-50 text-cyan-700 border-cyan-200", icon: RefreshCw };
      default:
        return { bg: "bg-slate-50 text-slate-700 border-slate-200", icon: AlertCircle };
    }
  };

  const config = type === "order" ? getOrderStyle(status as OrderStatus) : getPaymentStyle(status as PaymentStatus);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full transition-colors ${
        config.bg
      } ${isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"}`}
    >
      <Icon className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{status}</span>
    </span>
  );
}
