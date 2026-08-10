"use client";

import React from "react";
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users,
  UserPlus,
  RotateCcw,
  Percent,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { KPIItem } from "@/data/mockAnalyticsData";

interface AnalyticsCardsProps {
  kpiItems: KPIItem[];
}

const iconMap: Record<string, React.ElementType> = {
  today_revenue: DollarSign,
  monthly_revenue: TrendingUp,
  yearly_revenue: Sparkles,
  total_orders: ShoppingBag,
  aov: Percent,
  conversion_rate: RotateCcw,
  returning_customers: Users,
  new_customers: UserPlus,
  net_profit: DollarSign,
  gross_sales: TrendingUp,
  refunds: RefreshCw,
  cancelled_orders: XCircle,
};

export function AnalyticsCards({ kpiItems }: AnalyticsCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
      }}
    >
      {kpiItems.map((item) => {
        const IconComponent = iconMap[item.id] || DollarSign;
        const isPositive = item.change >= 0;
        const isRefundOrCancel = item.id === "refunds" || item.id === "cancelled_orders";
        // For refunds/cancellations, negative change is actually good (decrease)
        const isGoodTrend = isRefundOrCancel ? item.change <= 0 : isPositive;

        return (
          <div
            key={item.id}
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "16px 20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
              transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,124,0,0.3)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#666666" }}>{item.title}</span>
                <div title={item.tooltip} style={{ cursor: "help", display: "inline-flex" }}>
                  <HelpCircle size={13} style={{ color: "#BBBBBB" }} />
                </div>
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: item.id.includes("revenue") || item.id === "net_profit"
                    ? "rgba(245,124,0,0.1)"
                    : item.id.includes("customer")
                    ? "rgba(112,26,117,0.08)"
                    : "rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.id.includes("revenue") || item.id === "net_profit"
                    ? "#F57C00"
                    : item.id.includes("customer")
                    ? "#701A75"
                    : "#171717",
                }}
              >
                <IconComponent size={16} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#171717", letterSpacing: "-0.02em" }}>
                {item.value}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 2,
                    fontSize: 12,
                    fontWeight: 600,
                    color: isGoodTrend ? "#16A34A" : "#DC2626",
                    background: isGoodTrend ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(item.change)}%
                </span>
                <span style={{ fontSize: 11, color: "#999999" }}>{item.period}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
