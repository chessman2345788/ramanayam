"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useAdminDashboardQuery } from "@/hooks/useAdminDashboard";

type Timeframe = "Monthly" | "Weekly" | "Daily";
type ChartType = "area" | "line" | "bar";

export function RevenueChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("Monthly");
  const [chartType, setChartType] = useState<ChartType>("area");

  const { data: apiData } = useAdminDashboardQuery();

  const data =
    timeframe === "Monthly"
      ? apiData?.revenueMonthly || [
          { date: "Jan", revenue: 0, orders: 0 },
          { date: "Feb", revenue: 0, orders: 0 },
          { date: "Mar", revenue: 0, orders: 0 },
          { date: "Apr", revenue: 0, orders: 0 },
          { date: "May", revenue: 0, orders: 0 },
          { date: "Jun", revenue: 0, orders: 0 },
        ]
      : timeframe === "Weekly"
      ? apiData?.revenueWeekly || [
          { date: "Mon", revenue: 0, orders: 0 },
          { date: "Tue", revenue: 0, orders: 0 },
          { date: "Wed", revenue: 0, orders: 0 },
          { date: "Thu", revenue: 0, orders: 0 },
          { date: "Fri", revenue: 0, orders: 0 },
          { date: "Sat", revenue: 0, orders: 0 },
          { date: "Sun", revenue: 0, orders: 0 },
        ]
      : apiData?.revenueDaily || [
          { date: "06:00 AM", revenue: 0, orders: 0 },
          { date: "09:00 AM", revenue: 0, orders: 0 },
          { date: "12:00 PM", revenue: 0, orders: 0 },
          { date: "03:00 PM", revenue: 0, orders: 0 },
          { date: "06:00 PM", revenue: 0, orders: 0 },
          { date: "09:00 PM", revenue: 0, orders: 0 },
        ];

  const formatYAxis = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
    return `₹${val}`;
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#7A1F1F]">
            Revenue & Sales Analytics
          </h2>
          <p className="text-xs text-[#666666] mt-0.5">
            Gross revenue generated across sacred goods and temple puja services
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe selector */}
          <div className="flex items-center p-1 bg-[#FAF8F3] border border-black/5 rounded-xl text-xs font-semibold">
            {(["Monthly", "Weekly", "Daily"] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeframe === tf
                    ? "bg-white text-[#F57C00] shadow-xs"
                    : "text-[#666666] hover:text-[#171717]"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type selector */}
          <div className="flex items-center p-1 bg-[#FAF8F3] border border-black/5 rounded-xl text-xs font-semibold">
            {(["area", "line", "bar"] as ChartType[]).map((ct) => (
              <button
                key={ct}
                type="button"
                onClick={() => setChartType(ct)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  chartType === ct
                    ? "bg-[#7A1F1F] text-white shadow-xs"
                    : "text-[#666666] hover:text-[#171717]"
                }`}
              >
                {ct}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="saffronGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F57C00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F57C00" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#888888" }} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#888888" }} />
              <Tooltip
                formatter={(val: any) => [`₹${Number(val || 0).toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#F57C00" strokeWidth={2.5} fillOpacity={1} fill="url(#saffronGradient)" />
            </AreaChart>
          ) : chartType === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#888888" }} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#888888" }} />
              <Tooltip
                formatter={(val: any) => [`₹${Number(val || 0).toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#7A1F1F" strokeWidth={3} dot={{ r: 4, fill: "#7A1F1F" }} />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#888888" }} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#888888" }} />
              <Tooltip
                formatter={(val: any) => [`₹${Number(val || 0).toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
              <Bar dataKey="revenue" fill="#F57C00" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
