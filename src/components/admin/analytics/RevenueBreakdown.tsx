"use client";

import React, { useState } from "react";
import { Layers, Tag, Sparkles, CreditCard } from "lucide-react";
import {
  mockCategories,
  mockTopProducts,
  mockFestivals,
  mockPaymentMethods,
} from "@/data/mockAnalyticsData";

type BreakdownDimension = "category" | "product" | "festival" | "payment";

export function RevenueBreakdown() {
  const [dimension, setDimension] = useState<BreakdownDimension>("category");

  const totalCategoryRevenue = mockCategories.reduce((acc, c) => acc + c.revenue, 0);
  const totalProductRevenue = mockTopProducts.reduce((acc, p) => acc + p.revenue, 0);
  const totalFestivalRevenue = mockFestivals.reduce((acc, f) => acc + f.revenue, 0);
  const totalPaymentRevenue = mockPaymentMethods.reduce((acc, p) => acc + p.revenue, 0);

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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Revenue Breakdown</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Examine revenue allocation across business dimensions.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: "flex", background: "#FAF8F3", borderRadius: 8, padding: 3, border: "1px solid rgba(0,0,0,0.06)", flexWrap: "wrap" }}>
          {[
            { id: "category", label: "Category", icon: Layers },
            { id: "product", label: "Product", icon: Tag },
            { id: "festival", label: "Festival", icon: Sparkles },
            { id: "payment", label: "Payment Method", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = dimension === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDimension(tab.id as BreakdownDimension)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: isSelected ? 600 : 400,
                  border: "none",
                  background: isSelected ? "#FFFFFF" : "transparent",
                  color: isSelected ? "#F57C00" : "#666666",
                  boxShadow: isSelected ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  cursor: "pointer",
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content per Dimension */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {dimension === "category" &&
          mockCategories.map((item) => {
            const percent = ((item.revenue / totalCategoryRevenue) * 100).toFixed(1);
            return (
              <div key={item.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: "#171717" }}>{item.name}</span>
                  <span style={{ fontWeight: 700, color: "#171717" }}>
                    ₹{item.revenue.toLocaleString("en-IN")} ({percent}%)
                  </span>
                </div>
                <div style={{ height: 8, background: "#FAF8F3", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${percent}%`,
                      background: item.color || "#F57C00",
                      borderRadius: 4,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}

        {dimension === "product" &&
          mockTopProducts.map((item) => {
            const percent = ((item.revenue / totalProductRevenue) * 100).toFixed(1);
            return (
              <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: "#171717" }}>{item.name}</span>
                  <span style={{ fontWeight: 700, color: "#171717" }}>
                    ₹{item.revenue.toLocaleString("en-IN")} ({percent}%)
                  </span>
                </div>
                <div style={{ height: 8, background: "#FAF8F3", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${percent}%`,
                      background: "#F57C00",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            );
          })}

        {dimension === "festival" &&
          mockFestivals.map((item) => {
            const percent = ((item.revenue / totalFestivalRevenue) * 100).toFixed(1);
            return (
              <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: "#171717" }}>{item.name} ({item.dateRange})</span>
                  <span style={{ fontWeight: 700, color: "#171717" }}>
                    ₹{item.revenue.toLocaleString("en-IN")} ({percent}%)
                  </span>
                </div>
                <div style={{ height: 8, background: "#FAF8F3", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${percent}%`,
                      background: item.color || "#701A75",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            );
          })}

        {dimension === "payment" &&
          mockPaymentMethods.map((item) => {
            return (
              <div key={item.method} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: "#171717" }}>{item.method}</span>
                  <span style={{ fontWeight: 700, color: "#171717" }}>
                    ₹{item.revenue.toLocaleString("en-IN")} ({item.percentage}%)
                  </span>
                </div>
                <div style={{ height: 8, background: "#FAF8F3", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${item.percentage}%`,
                      background: item.color || "#3B82F6",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
