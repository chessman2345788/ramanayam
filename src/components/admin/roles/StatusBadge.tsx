"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, PowerOff } from "lucide-react";

interface StatusBadgeProps {
  status?: "ACTIVE" | "INACTIVE";
  isSystemRole?: boolean;
}

export function StatusBadge({ status = "ACTIVE", isSystemRole }: StatusBadgeProps) {
  if (isSystemRole) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shadow-2xs">
        <ShieldCheck className="w-3 h-3 text-amber-700" />
        <span>System Default</span>
      </span>
    );
  }

  if (status === "ACTIVE") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>Active</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-stone-100 text-stone-600 border border-stone-300 shadow-2xs">
      <PowerOff className="w-3 h-3 text-stone-500" />
      <span>Inactive</span>
    </span>
  );
}
