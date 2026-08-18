"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { VendorSalesPoint } from "@/data/mockVendorsData";

interface VendorSalesChartProps {
  salesHistory: VendorSalesPoint[];
}

export function VendorSalesChart({ salesHistory }: VendorSalesChartProps) {
  if (!salesHistory || salesHistory.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center text-stone-400 text-xs shadow-2xs">
        No monthly sales history available for this seller yet.
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
    return `₹${val}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>Seller Monthly Revenue & Sales Velocity</span>
          </h3>
          <p className="text-xs text-stone-500">Historical performance metrics for current year</p>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="vendorRevGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            <XAxis dataKey="month" stroke="#78716c" fontSize={11} tickLine={false} />
            <YAxis stroke="#78716c" fontSize={11} tickFormatter={formatCurrency} tickLine={false} />
            <Tooltip
              formatter={(val: any) => `₹${Number(val).toLocaleString("en-IN")}`}
              contentStyle={{ background: "#fff", borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: "12px" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#d97706"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#vendorRevGradient)"
              name="Monthly Sales Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
