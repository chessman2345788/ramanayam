"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface AnalyticsSectionProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function AnalyticsSection({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
}: AnalyticsSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h2 className="text-sm font-bold text-stone-900 font-display">{title}</h2>
            {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
          </div>
        </div>

        {action && <div>{action}</div>}
      </div>

      <div>{children}</div>
    </div>
  );
}
