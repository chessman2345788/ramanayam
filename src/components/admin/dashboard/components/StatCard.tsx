"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  Layers,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { KPIMetric } from "../types/dashboard.types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  IndianRupee,
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  Layers,
  Clock,
  AlertTriangle,
};

interface StatCardProps {
  metric: KPIMetric;
  index: number;
}

export function StatCard({ metric, index }: StatCardProps) {
  const Icon = iconMap[metric.iconName] || TrendingUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="group relative bg-white border border-black/10 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#F57C00]/30 transition-all duration-200"
    >
      {/* Subtle top gradient accent on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#F57C00] to-[#7A1F1F] opacity-0 group-hover:opacity-100 rounded-t-2xl transition-opacity duration-200" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-[#666666] tracking-tight truncate">
          {metric.title}
        </span>
        <div className="w-9 h-9 rounded-xl bg-[#FAF8F3] border border-black/5 flex items-center justify-center text-[#7A1F1F] group-hover:bg-[#F57C00]/10 group-hover:text-[#F57C00] transition-colors shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold font-serif text-[#171717] tracking-tight">
          {metric.value}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[11px]">
        <span
          className={`font-semibold inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
            metric.isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {metric.isPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {metric.change}
        </span>
        <span className="text-[#999999] truncate">{metric.timeframe}</span>
      </div>
    </motion.div>
  );
}
