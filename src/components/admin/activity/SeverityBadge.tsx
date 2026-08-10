"use client";

import React from "react";
import { AlertCircle, AlertTriangle, Info, Bell } from "lucide-react";
import { ActivitySeverity } from "@/types/activity";

export interface SeverityBadgeProps {
  severity: ActivitySeverity;
  size?: "sm" | "md";
}

export function SeverityBadge({ severity, size = "md" }: SeverityBadgeProps) {
  const styles = {
    critical: "bg-rose-50 text-rose-700 border-rose-200/90 font-bold",
    high: "bg-orange-50 text-orange-800 border-orange-200/90 font-semibold",
    medium: "bg-amber-50 text-amber-900 border-amber-200/90 font-medium",
    low: "bg-stone-100 text-stone-600 border-stone-200 font-medium",
  };

  const IconComp = {
    critical: AlertCircle,
    high: AlertTriangle,
    medium: Bell,
    low: Info,
  }[severity];

  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border uppercase tracking-wider ${styles[severity]} ${sizeClass}`}>
      {severity === "critical" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
        </span>
      )}
      {severity !== "critical" && <IconComp className="w-3 h-3" />}
      <span>{severity}</span>
    </span>
  );
}
