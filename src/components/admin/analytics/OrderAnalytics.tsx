"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { mockOrderStatuses } from "@/data/mockAnalyticsData";

export function OrderAnalytics() {
  const statuses = [
    { status: "Delivered", count: 1340, value: 2546000, color: "#16a34a" },
    { status: "Shipped", count: 410, value: 780000, color: "#0284c7" },
    { status: "Processing", count: 280, value: 532000, color: "#2563eb" },
    { status: "Confirmed", count: 185, value: 350000, color: "#7c3aed" },
    { status: "Pending", count: 124, value: 235600, color: "#d97706" },
    { status: "Cancelled", count: 48, value: 91200, color: "#6b7280" },
    { status: "Returned", count: 32, value: 60800, color: "#dc2626" },
    { status: "Refunded", count: 18, value: 34200, color: "#9333ea" },
  ];

  const totalOrdersCount = statuses.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Donut Chart */}
      <div className="md:col-span-5 h-64 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statuses}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {statuses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [`${Number(val).toLocaleString("en-IN")} orders`, "Count"]}
              contentStyle={{ background: "#fff", borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-xl font-extrabold text-stone-900 font-display">
            {totalOrdersCount.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-stone-400 font-semibold uppercase">Total Orders</div>
        </div>
      </div>

      {/* Status Breakdown Grid */}
      <div className="md:col-span-7 grid grid-cols-2 gap-2.5">
        {statuses.map((s) => (
          <div key={s.status} className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="font-semibold text-stone-800">{s.status}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-stone-900">{s.count.toLocaleString("en-IN")}</div>
              <div className="text-[10px] text-stone-400">
                {Math.round((s.count / totalOrdersCount) * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
