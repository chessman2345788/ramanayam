"use client";

import React from "react";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";
import { mockFestivals } from "@/data/mockAnalyticsData";

export function FestivalAnalytics() {
  const festivalList = [
    ...mockFestivals,
    {
      id: "fest_daily",
      name: "Daily Nitya Pooja",
      slug: "daily-pooja",
      dateRange: "Year-Round",
      revenue: 5400000,
      orders: 4200,
      growth: 18.5,
      topProduct: "Desi Ghee Diya Wicks (Box of 200)",
      color: "#059669",
      bannerPattern: "gradient-daily",
    },
    {
      id: "fest_griha",
      name: "Griha Pravesh & Vastu",
      slug: "griha-pravesh",
      dateRange: "Auspicious Dates",
      revenue: 3200000,
      orders: 850,
      growth: 22.0,
      topProduct: "Pure Teakwood Mandir & Vastu Kalash",
      color: "#c2410c",
      bannerPattern: "gradient-griha",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {festivalList.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs hover:shadow-md transition-all duration-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 font-display">{f.name}</span>
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: f.color }}
              />
            </div>

            <div>
              <div className="text-xl font-extrabold text-amber-700 font-display">
                ₹{(f.revenue / 100000).toFixed(2)} Lakhs
              </div>
              <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                {f.orders.toLocaleString("en-IN")} orders • +{f.growth}% YoY
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600 truncate">
              <span className="text-stone-400 font-medium">Top Item: </span>
              <span className="font-semibold text-stone-800">{f.topProduct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
