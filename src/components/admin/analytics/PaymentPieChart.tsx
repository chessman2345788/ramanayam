"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CreditCard } from "lucide-react";
import { mockPaymentMethods } from "@/data/mockAnalyticsData";

export function PaymentPieChart() {
  const totalRevenue = mockPaymentMethods.reduce((acc, p) => acc + p.revenue, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            padding: "8px 12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: 700, color: "#171717", marginBottom: 2 }}>{data.method}</div>
          <div style={{ color: "#F57C00", fontWeight: 600 }}>
            Revenue: ₹{data.revenue.toLocaleString("en-IN")} ({data.percentage}%)
          </div>
          <div style={{ color: "#666666" }}>{data.transactions} transactions</div>
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
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Payment Method Distribution</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Gateway share: UPI, Card, Net Banking, Wallet & COD.
          </p>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(245,124,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F57C00",
          }}
        >
          <CreditCard size={16} />
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        {/* Pie Canvas */}
        <div style={{ width: 220, height: 220, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockPaymentMethods}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="percentage"
              >
                {mockPaymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: 11, color: "#999999" }}>Total</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#171717" }}>
              ₹{(totalRevenue / 100000).toFixed(1)}L
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 10 }}>
          {mockPaymentMethods.map((pm) => (
            <div key={pm.method} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: pm.color }} />
                <span style={{ fontWeight: 500, color: "#171717" }}>{pm.method}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontWeight: 700, color: "#171717" }}>{pm.percentage}%</span>
                <span style={{ fontSize: 11, color: "#999999", marginLeft: 6 }}>
                  (₹{(pm.revenue / 1000).toFixed(0)}k)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
