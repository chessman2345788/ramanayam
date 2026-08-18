"use client";

import React from "react";
import { Package, ShoppingBag, IndianRupee, TrendingUp, Star, CheckCircle2 } from "lucide-react";
import { AdminVendorDetail } from "@/data/mockVendorsData";

interface VendorStatsProps {
  vendor: AdminVendorDetail;
}

export function VendorStats({ vendor }: VendorStatsProps) {
  const stats = [
    {
      title: "Total Products",
      value: vendor.productsCount,
      subtitle: `${vendor.activeProductsCount} active in catalog`,
      icon: Package,
      color: "text-stone-900",
      iconBg: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Active Products",
      value: vendor.activeProductsCount,
      subtitle: "Live on Ramanayam store",
      icon: CheckCircle2,
      color: "text-emerald-700",
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "Total Orders",
      value: vendor.ordersCount.toLocaleString("en-IN"),
      subtitle: "Completed seller orders",
      icon: ShoppingBag,
      color: "text-stone-900",
      iconBg: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Gross Revenue",
      value: `₹${(vendor.totalRevenue / 100000).toFixed(2)} L`,
      subtitle: "Lifetime gross sales",
      icon: IndianRupee,
      color: "text-amber-800",
      iconBg: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      title: "Average Order Value",
      value: `₹${vendor.avgOrderValue.toLocaleString("en-IN")}`,
      subtitle: "Mean revenue per order",
      icon: TrendingUp,
      color: "text-purple-700",
      iconBg: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Customer Rating",
      value: `${vendor.customerRating > 0 ? vendor.customerRating.toFixed(1) : "N/A"} ★`,
      subtitle: "Customer feedback score",
      icon: Star,
      color: "text-amber-600",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.title} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{s.title}</span>
              <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${s.iconBg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className={`text-xl font-extrabold font-display ${s.color}`}>{s.value}</div>
              <p className="text-[10px] text-stone-400 font-medium mt-0.5">{s.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
