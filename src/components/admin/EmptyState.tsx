"use client";

import React from "react";
import { FolderOpen, LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title = "No Data Found",
  description = "No records match your current search parameters or filter criteria.",
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-stone-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3 shadow-2xs ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shadow-2xs">
        <Icon className="w-6 h-6" />
      </div>

      <div className="max-w-sm space-y-1">
        <h3 className="text-base font-bold text-stone-900 font-display">{title}</h3>
        <p className="text-xs text-stone-500 leading-relaxed">{description}</p>
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
