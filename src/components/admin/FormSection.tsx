"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/70 shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 font-display">{title}</h3>
            {description && <p className="text-xs text-stone-500 mt-0.5">{description}</p>}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}
