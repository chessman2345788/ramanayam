"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, HelpCircle, LucideIcon } from "lucide-react";

export interface KpiCardProps {
  id: string;
  title: string;
  value: string;
  change: number; // e.g. +14.2 or -3.1
  period?: string;
  tooltip?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export function KpiCard({
  id,
  title,
  value,
  change,
  period = "vs previous period",
  tooltip,
  icon: Icon,
  iconBg = "bg-amber-50 border-amber-200",
  iconColor = "text-amber-600",
}: KpiCardProps) {
  const isPositive = change >= 0;
  // For refunds, negative change is good (less refunds)
  const isRefund = id === "refunds";
  const isGood = isRefund ? change <= 0 : isPositive;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{title}</span>
          {tooltip && (
            <span title={tooltip} className="cursor-help">
              <HelpCircle className="w-3.5 h-3.5 text-stone-300 hover:text-stone-500 transition-colors" />
            </span>
          )}
        </div>

        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${iconBg} ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-extrabold text-stone-900 font-display tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md ${
              isGood
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span>{Math.abs(change)}%</span>
          </span>
          <span className="text-[11px] font-medium text-stone-400 truncate">{period}</span>
        </div>
      </div>
    </div>
  );
}
