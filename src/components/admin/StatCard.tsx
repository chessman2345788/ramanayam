"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePeriod?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  subtext?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  change,
  changePeriod = "vs last period",
  icon: Icon,
  iconBg = "bg-amber-50 border-amber-200/80",
  iconColor = "text-amber-700",
  subtext,
  onClick,
}: StatCardProps) {
  const isPositive = change !== undefined ? change >= 0 : undefined;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-stone-200/80 p-4 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between gap-3 group ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{title}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${iconBg} ${iconColor}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold tracking-tight text-stone-900 font-display">{value}</span>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
              isPositive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      {(subtext || changePeriod) && (
        <span className="text-[11px] font-medium text-stone-400">
          {subtext || changePeriod}
        </span>
      )}
    </div>
  );
}
