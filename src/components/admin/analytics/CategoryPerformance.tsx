"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Tag } from "lucide-react";

export function CategoryPerformance() {
  const categoryData = [
    { name: "Brass Diyas & Copper", revenue: 1140000, percentage: 38, color: "#d97706" },
    { name: "Puja Utensils & Sets", revenue: 712000, percentage: 24, color: "#7c3aed" },
    { name: "Sacred Food & Prasadam", revenue: 426000, percentage: 14, color: "#059669" },
    { name: "Temple Decor & Murti", revenue: 341000, percentage: 11, color: "#c2410c" },
    { name: "Mala & Rudraksha", revenue: 226000, percentage: 8, color: "#0284c7" },
    { name: "Incense & Pure Dhoop", revenue: 195200, percentage: 5, color: "#e11d48" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Donut Chart */}
      <div className="md:col-span-5 h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="revenue"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => `₹${Number(val).toLocaleString("en-IN")}`}
              contentStyle={{ background: "#fff", borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Categories Breakdown List */}
      <div className="md:col-span-7 space-y-3">
        {categoryData.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: cat.color }} />
            <div className="flex-1 font-semibold text-stone-800 truncate">{cat.name}</div>
            <div className="font-extrabold text-amber-700">₹{cat.revenue.toLocaleString("en-IN")}</div>
            <div className="w-12 text-right font-medium text-stone-400">{cat.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
