"use client";

import React from "react";
import { Layers, TrendingUp, ShoppingBag, Package } from "lucide-react";
import { mockCategories } from "@/data/mockAnalyticsData";

export function TopCategoriesGrid() {
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
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Top Categories Overview</h3>
        <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
          Performance overview of main store departments.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {mockCategories.map((cat) => (
          <div
            key={cat.name}
            style={{
              background: "#FAF8F3",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              transition: "transform 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = cat.color || "#F57C00";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: cat.color ? `${cat.color}15` : "rgba(245,124,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: cat.color || "#F57C00",
                }}
              >
                <Layers size={16} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#16A34A",
                  background: "rgba(22,163,74,0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <TrendingUp size={11} />
                +{cat.growth}%
              </span>
            </div>

            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>{cat.name}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F57C00", marginTop: 4 }}>
                ₹{cat.revenue.toLocaleString("en-IN")}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#666666",
                borderTop: "1px stroke rgba(0,0,0,0.06)",
                paddingTop: 8,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <ShoppingBag size={12} /> {cat.orders} orders
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Package size={12} /> {cat.productsCount} items
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
