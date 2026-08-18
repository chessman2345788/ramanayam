"use client";

import React from "react";
import { Package, Star, TrendingUp, TrendingDown, Award, AlertTriangle } from "lucide-react";
import { mockTopProducts } from "@/data/mockAnalyticsData";
import { RatingStars } from "@/components/admin/reviews/RatingStars";

export function ProductPerformance() {
  const topProducts = mockTopProducts.slice(0, 5);

  const decliningProducts = [
    { name: "Carved Teakwood Temple Mandir", sku: "RAM-DEC-091", drop: "-18%", reason: "High shipping cost complaint" },
    { name: "Pure Brass Ashtalakshmi Thali", sku: "RAM-UTN-082", drop: "-12%", reason: "Quality audit pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Category Performance Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-2xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              Best Performing Category
            </div>
            <div className="text-sm font-extrabold text-emerald-950 font-display">
              Brass Diyas & Lamps
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">₹11.4 Lakhs • +22.4% Growth</div>
          </div>
        </div>

        <div className="bg-rose-50/60 border border-rose-200/80 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-2xs">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
              Lowest Performing Category
            </div>
            <div className="text-sm font-extrabold text-rose-950 font-display">
              Incense & Pure Dhoop
            </div>
            <div className="text-[11px] text-rose-700 font-medium">₹1.95 Lakhs • Needs Promo</div>
          </div>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-2xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
              Declining Sales Alert
            </div>
            <div className="text-sm font-extrabold text-amber-950 font-display">
              2 Catalog Items
            </div>
            <div className="text-[11px] text-amber-700 font-medium">Flagged for price restructuring</div>
          </div>
        </div>
      </div>

      {/* Top Selling Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">Top Selling Products</h3>
          </div>
          <span className="text-xs text-stone-400 font-medium">Ranked by Sales Revenue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider">
                <th className="p-3">Product</th>
                <th className="p-3">Units Sold</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Avg Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {topProducts.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="p-3 max-w-[240px]">
                    <div className="flex items-center gap-2.5">
                      <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border border-stone-200 shrink-0" />
                      <div className="truncate">
                        <div className="font-bold text-stone-900 truncate">{p.name}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{p.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-stone-900">{p.unitsSold.toLocaleString("en-IN")}</td>
                  <td className="p-3 font-extrabold text-amber-700">₹{p.revenue.toLocaleString("en-IN")}</td>
                  <td className="p-3 font-semibold text-stone-700">{Math.round(p.unitsSold * 0.85)}</td>
                  <td className="p-3 whitespace-nowrap">
                    <RatingStars rating={p.rating} size={12} showScore />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
