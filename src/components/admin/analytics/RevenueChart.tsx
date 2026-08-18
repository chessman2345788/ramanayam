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
  CartesianGrid,
  Tooltip,
} from "recharts";
import { AreaChart as AreaIcon, LineChart as LineIcon, BarChart3 as BarIcon, TrendingUp } from "lucide-react";
import { mockTimeSeriesData, TimeSeriesDataPoint } from "@/data/mockAnalyticsData";

type MetricType = "revenue" | "orders" | "aov";
type ChartType = "area" | "line" | "bar";

export function RevenueChart() {
  const [metric, setMetric] = useState<MetricType>("revenue");
  const [chartType, setChartType] = useState<ChartType>("area");

  // Format dataset with calculated AOV
  const rawData = mockTimeSeriesData.yearly;
  const chartData = rawData.map((d) => ({
    ...d,
    aov: Math.round(d.revenue / (d.orders || 1)),
  }));

  const formatValue = (val: number) => {
    if (metric === "orders") return val.toLocaleString("en-IN");
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
    return `₹${val}`;
  };

  const getMetricLabel = () => {
    if (metric === "revenue") return "Revenue (₹)";
    if (metric === "orders") return "Orders Count";
    return "Average Order Value (₹)";
  };

  const getMetricColor = () => {
    if (metric === "revenue") return "#d97706"; // Saffron amber-600
    if (metric === "orders") return "#7c3aed"; // Purple
    return "#059669"; // Emerald
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload;
      return (
        <div className="bg-white border border-stone-200 rounded-xl p-3 shadow-xl text-xs space-y-1">
          <div className="font-bold text-stone-900">{pData.label} Overview</div>
          <div className="font-extrabold text-amber-700">
            Revenue: ₹{pData.revenue.toLocaleString("en-IN")}
          </div>
          <div className="font-semibold text-purple-700">
            Orders: {pData.orders.toLocaleString("en-IN")}
          </div>
          <div className="font-semibold text-emerald-700">
            AOV: ₹{pData.aov.toLocaleString("en-IN")}
          </div>
        </div>
      );
    }
    return null;
  };

  const activeColor = getMetricColor();

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>Sales Performance Over Time</span>
          </h3>
          <p className="text-xs text-stone-500">Track revenue, orders volume, and average order value trends</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector Tabs */}
          <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMetric("revenue")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metric === "revenue" ? "bg-white text-amber-700 shadow-2xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Revenue
            </button>
            <button
              type="button"
              onClick={() => setMetric("orders")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metric === "orders" ? "bg-white text-purple-700 shadow-2xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Orders
            </button>
            <button
              type="button"
              onClick={() => setMetric("aov")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metric === "aov" ? "bg-white text-emerald-700 shadow-2xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              AOV
            </button>
          </div>

          {/* Chart Type Selector */}
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setChartType("area")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                chartType === "area" ? "bg-white text-amber-700 shadow-2xs" : "text-stone-400 hover:text-stone-700"
              }`}
              title="Area Chart"
            >
              <AreaIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setChartType("line")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                chartType === "line" ? "bg-white text-amber-700 shadow-2xs" : "text-stone-400 hover:text-stone-700"
              }`}
              title="Line Chart"
            >
              <LineIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                chartType === "bar" ? "bg-white text-amber-700 shadow-2xs" : "text-stone-400 hover:text-stone-700"
              }`}
              title="Bar Chart"
            >
              <BarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={activeColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="label" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={11} tickFormatter={formatValue} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={activeColor}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#metricGradient)"
                name={getMetricLabel()}
              />
            </AreaChart>
          ) : chartType === "line" ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="label" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={11} tickFormatter={formatValue} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={activeColor}
                strokeWidth={2.5}
                dot={{ r: 4, fill: activeColor }}
                name={getMetricLabel()}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="label" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={11} tickFormatter={formatValue} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={metric} fill={activeColor} radius={[6, 6, 0, 0]} name={getMetricLabel()} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
