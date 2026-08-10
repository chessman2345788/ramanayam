"use client";

import React from "react";
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import { mockOrderStatuses } from "@/data/mockAnalyticsData";

export function OrderAnalytics() {
  const totalOrdersCount = mockOrderStatuses.reduce((acc, o) => acc + o.count, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 size={16} style={{ color: "#16A34A" }} />;
      case "Processing":
        return <ShoppingBag size={16} style={{ color: "#2563EB" }} />;
      case "Pending":
        return <Clock size={16} style={{ color: "#D97706" }} />;
      case "Returned":
        return <AlertCircle size={16} style={{ color: "#DC2626" }} />;
      case "Refunded":
        return <RefreshCw size={16} style={{ color: "#9333EA" }} />;
      case "Cancelled":
        return <XCircle size={16} style={{ color: "#6B7280" }} />;
      default:
        return <ShoppingBag size={16} />;
    }
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
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Order Status Analytics</h3>
        <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
          Fulfillment funnel across pending, processing, delivered, and cancelled states.
        </p>
      </div>

      {/* Stacked Progress Bar */}
      <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", background: "#FAF8F3" }}>
        {mockOrderStatuses.map((item) => {
          const percent = (item.count / totalOrdersCount) * 100;
          return (
            <div
              key={item.status}
              style={{
                width: `${percent}%`,
                background: item.color,
                height: "100%",
              }}
              title={`${item.status}: ${item.count} orders (${percent.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Grid of Status Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
        {mockOrderStatuses.map((item) => {
          const percent = ((item.count / totalOrdersCount) * 100).toFixed(1);
          return (
            <div
              key={item.status}
              style={{
                background: "#FAF8F3",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#171717" }}>{item.status}</span>
                {getStatusIcon(item.status)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#171717" }}>{item.count}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666666" }}>
                <span>{percent}% share</span>
                <span style={{ fontWeight: 600, color: item.color }}>₹{(item.value / 1000).toFixed(0)}k</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
