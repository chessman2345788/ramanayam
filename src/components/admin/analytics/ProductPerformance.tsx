"use client";

import React, { useState } from "react";
import { Eye, ShoppingBag, Star, AlertTriangle, XCircle, Package } from "lucide-react";
import { mockTopProducts, ProductBreakdown } from "@/data/mockAnalyticsData";

type MetricTab = "viewed" | "purchased" | "rated" | "low_stock" | "out_of_stock";

export function ProductPerformance() {
  const [activeTab, setActiveTab] = useState<MetricTab>("viewed");

  const getFilteredProducts = (): ProductBreakdown[] => {
    switch (activeTab) {
      case "viewed":
        return [...mockTopProducts].sort((a, b) => b.views - a.views);
      case "purchased":
        return [...mockTopProducts].sort((a, b) => b.unitsSold - a.unitsSold);
      case "rated":
        return [...mockTopProducts].sort((a, b) => b.rating - a.rating);
      case "low_stock":
        return mockTopProducts.filter((p) => p.status === "LOW_STOCK");
      case "out_of_stock":
        return mockTopProducts.filter((p) => p.status === "OUT_OF_STOCK");
      default:
        return mockTopProducts;
    }
  };

  const products = getFilteredProducts();

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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Product Performance Highlights</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Filter products by traffic views, sales volume, customer ratings, and inventory alerts.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#FAF8F3", borderRadius: 8, padding: 3, border: "1px solid rgba(0,0,0,0.06)", flexWrap: "wrap" }}>
          {[
            { id: "viewed", label: "Most Viewed", icon: Eye },
            { id: "purchased", label: "Most Purchased", icon: ShoppingBag },
            { id: "rated", label: "Highest Rated", icon: Star },
            { id: "low_stock", label: "Low Stock", icon: AlertTriangle },
            { id: "out_of_stock", label: "Out of Stock", icon: XCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as MetricTab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
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

      {/* Product items list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {products.length === 0 ? (
          <div style={{ padding: 30, textAlign: "center", color: "#999999", fontSize: 13 }}>
            No products match this filter currently.
          </div>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.05)",
                background: "#FAF8F3",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    overflow: "hidden",
                    background: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <Package size={16} style={{ color: "#F57C00" }} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#666666" }}>
                    SKU: {item.sku} • {item.category}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16, textAlign: "right" }}>
                {activeTab === "viewed" && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>
                      {item.views.toLocaleString()} views
                    </div>
                    <div style={{ fontSize: 11, color: "#666666" }}>{item.unitsSold} sold</div>
                  </div>
                )}
                {activeTab === "purchased" && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#F57C00" }}>
                      {item.unitsSold} units
                    </div>
                    <div style={{ fontSize: 11, color: "#666666" }}>₹{item.revenue.toLocaleString("en-IN")}</div>
                  </div>
                )}
                {activeTab === "rated" && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#D4AF37", display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={14} fill="#D4AF37" /> {item.rating} / 5
                    </div>
                    <div style={{ fontSize: 11, color: "#666666" }}>{item.unitsSold} reviews verified</div>
                  </div>
                )}
                {(activeTab === "low_stock" || activeTab === "out_of_stock") && (
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: item.status === "OUT_OF_STOCK" ? "rgba(220,38,38,0.1)" : "rgba(217,119,6,0.1)",
                        color: item.status === "OUT_OF_STOCK" ? "#DC2626" : "#D97706",
                      }}
                    >
                      {item.status === "OUT_OF_STOCK" ? "Out of Stock (0)" : `Low Stock (${item.stock} left)`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
