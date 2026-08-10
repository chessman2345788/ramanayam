"use client";

import React, { useState } from "react";
import { Package, Search, Star, TrendingUp } from "lucide-react";
import { mockTopProducts, ProductBreakdown } from "@/data/mockAnalyticsData";

export function TopProductsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockTopProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Top Selling Products</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            High-demand spiritual catalog items by volume and revenue generated.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", width: 220 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999999" }} />
          <input
            type="text"
            placeholder="Search SKU or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 10px 6px 30px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.12)",
              fontSize: 12,
              outline: "none",
              background: "#FAF8F3",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#FAF8F3", color: "#666666" }}>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>Product</th>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>SKU</th>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "10px 12px", fontWeight: 600, textAlign: "right" }}>Units Sold</th>
              <th style={{ padding: "10px 12px", fontWeight: 600, textAlign: "right" }}>Revenue</th>
              <th style={{ padding: "10px 12px", fontWeight: 600, textAlign: "center" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr
                key={prod.id}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(245,124,0,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "#FAF8F3",
                      border: "1px solid rgba(0,0,0,0.06)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {prod.image ? (
                      <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <Package size={18} style={{ color: "#F57C00" }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#171717", lineHeight: "1.3" }}>{prod.name}</div>
                    <div style={{ fontSize: 11, color: "#999999" }}>{prod.views} views</div>
                  </div>
                </td>
                <td style={{ padding: "12px", fontFamily: "var(--font-jetbrains, monospace)", fontSize: 12, color: "#666666" }}>
                  {prod.sku}
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      background: "rgba(112,26,117,0.08)",
                      color: "#701A75",
                      padding: "3px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {prod.category}
                  </span>
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontWeight: 600, color: "#171717" }}>
                  {prod.unitsSold.toLocaleString("en-IN")}
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontWeight: 700, color: "#F57C00" }}>
                  ₹{prod.revenue.toLocaleString("en-IN")}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: "#D4AF37" }}>
                    <Star size={12} fill="#D4AF37" />
                    {prod.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
