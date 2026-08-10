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
import { AreaChart as AreaIcon, LineChart as LineIcon, BarChart3 as BarIcon } from "lucide-react";
import { mockTimeSeriesData, TimeSeriesDataPoint } from "@/data/mockAnalyticsData";

type PeriodType = "daily" | "weekly" | "monthly" | "yearly";
type ChartType = "area" | "line" | "bar";

export function RevenueChart() {
  const [period, setPeriod] = useState<PeriodType>("monthly");
  const [chartType, setChartType] = useState<ChartType>("area");

  const data: TimeSeriesDataPoint[] = mockTimeSeriesData[period];

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
    return `₹${val}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload as TimeSeriesDataPoint;
      return (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            padding: "10px 14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#171717", marginBottom: 6 }}>
            {pData.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
            <div style={{ color: "#F57C00", fontWeight: 600 }}>
              Revenue: ₹{pData.revenue.toLocaleString("en-IN")}
            </div>
            <div style={{ color: "#701A75", fontWeight: 600 }}>
              Gross Sales: ₹{pData.grossSales.toLocaleString("en-IN")}
            </div>
            <div style={{ color: "#16A34A", fontWeight: 600 }}>
              Est. Profit: ₹{pData.netProfit.toLocaleString("en-IN")}
            </div>
            <div style={{ color: "#666666" }}>Orders: {pData.orders} orders</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Header controls */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Sales & Revenue Analytics</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Track sales trends, gross revenue, and estimated profits over time.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Period selector */}
          <div style={{ display: "flex", background: "#FAF8F3", borderRadius: 8, padding: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
            {(["daily", "weekly", "monthly", "yearly"] as PeriodType[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: period === p ? 600 : 400,
                  border: "none",
                  background: period === p ? "#FFFFFF" : "transparent",
                  color: period === p ? "#F57C00" : "#666666",
                  boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chart type toggle */}
          <div style={{ display: "flex", background: "#FAF8F3", borderRadius: 8, padding: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
            <button
              type="button"
              onClick={() => setChartType("area")}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "none",
                background: chartType === "area" ? "#FFFFFF" : "transparent",
                color: chartType === "area" ? "#F57C00" : "#999999",
                cursor: "pointer",
              }}
              title="Area Chart"
            >
              <AreaIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => setChartType("line")}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "none",
                background: chartType === "line" ? "#FFFFFF" : "transparent",
                color: chartType === "line" ? "#F57C00" : "#999999",
                cursor: "pointer",
              }}
              title="Line Chart"
            >
              <LineIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "none",
                background: chartType === "bar" ? "#FFFFFF" : "transparent",
                color: chartType === "bar" ? "#F57C00" : "#999999",
                cursor: "pointer",
              }}
              title="Bar Chart"
            >
              <BarIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="saffronGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F57C00" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F57C00" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="maroonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#701A75" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#701A75" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="label" stroke="#999999" fontSize={11} tickLine={false} />
              <YAxis stroke="#999999" fontSize={11} tickFormatter={formatCurrency} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="grossSales" stroke="#701A75" strokeWidth={2} fillOpacity={1} fill="url(#maroonGradient)" name="Gross Sales" />
              <Area type="monotone" dataKey="revenue" stroke="#F57C00" strokeWidth={2.5} fillOpacity={1} fill="url(#saffronGradient)" name="Revenue" />
            </AreaChart>
          ) : chartType === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="label" stroke="#999999" fontSize={11} tickLine={false} />
              <YAxis stroke="#999999" fontSize={11} tickFormatter={formatCurrency} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="grossSales" stroke="#701A75" strokeWidth={2} dot={{ r: 4 }} name="Gross Sales" />
              <Line type="monotone" dataKey="revenue" stroke="#F57C00" strokeWidth={3} dot={{ r: 5 }} name="Revenue" />
              <Line type="monotone" dataKey="netProfit" stroke="#16A34A" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Net Profit" />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="label" stroke="#999999" fontSize={11} tickLine={false} />
              <YAxis stroke="#999999" fontSize={11} tickFormatter={formatCurrency} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="grossSales" fill="#701A75" radius={[4, 4, 0, 0]} name="Gross Sales" opacity={0.3} />
              <Bar dataKey="revenue" fill="#F57C00" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, fontSize: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#F57C00" }} />
          <span style={{ color: "#171717", fontWeight: 500 }}>Net Revenue</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#701A75" }} />
          <span style={{ color: "#171717", fontWeight: 500 }}>Gross Sales</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#16A34A" }} />
          <span style={{ color: "#171717", fontWeight: 500 }}>Estimated Net Profit</span>
        </div>
      </div>
    </div>
  );
}
