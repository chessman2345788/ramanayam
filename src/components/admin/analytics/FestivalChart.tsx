"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, TrendingUp, ShoppingBag, Flame, Award } from "lucide-react";
import { mockFestivals, FestivalBreakdown } from "@/data/mockAnalyticsData";

export function FestivalChart() {
  const [activeFestivalId, setActiveFestivalId] = useState<string>(mockFestivals[0].id);

  const selectedFestival: FestivalBreakdown =
    mockFestivals.find((f) => f.id === activeFestivalId) || mockFestivals[0];

  const totalFestivalRevenue = mockFestivals.reduce((acc, f) => acc + f.revenue, 0);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FAF8F3 100%)",
        borderRadius: 16,
        border: "1px solid rgba(245,124,0,0.2)",
        padding: 24,
        boxShadow: "0 4px 20px rgba(245,124,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #F57C00 0%, #701A75 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
            }}
          >
            <Flame size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#171717", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
              Sacred Festival Sales Analytics
              <span style={{ fontSize: 11, background: "rgba(245,124,0,0.12)", color: "#F57C00", padding: "2px 8px", borderRadius: 12, fontWeight: 600 }}>
                Ramanayam Specialization
              </span>
            </h3>
            <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
              Peak seasonal revenue and demand analytics across major Hindu religious festivals.
            </p>
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "#701A75" }}>
          Total Festival Demand: ₹{(totalFestivalRevenue / 10000000).toFixed(2)} Cr
        </div>
      </div>

      {/* Festival Selector Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {mockFestivals.map((fest) => {
          const isActive = fest.id === activeFestivalId;
          return (
            <button
              key={fest.id}
              type="button"
              onClick={() => setActiveFestivalId(fest.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 10,
                border: isActive ? `1.5px solid ${fest.color}` : "1px solid rgba(0,0,0,0.08)",
                background: isActive ? `${fest.color}12` : "#FFFFFF",
                color: isActive ? fest.color : "#666666",
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              <Sparkles size={14} style={{ color: isActive ? fest.color : "#999999" }} />
              <span>{fest.name}</span>
            </button>
          );
        })}
      </div>

      {/* Festival Metrics Detail Card */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 14,
          border: `1px solid ${selectedFestival.color}30`,
          padding: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666666" }}>
            <Calendar size={14} style={{ color: selectedFestival.color }} /> Festival Window
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#171717", marginTop: 4 }}>
            {selectedFestival.dateRange}
          </div>
          <div style={{ fontSize: 11, color: "#999999", marginTop: 2 }}>Peak preparation campaign</div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666666" }}>
            <Sparkles size={14} style={{ color: "#F57C00" }} /> Festival Revenue
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#F57C00", marginTop: 4 }}>
            ₹{selectedFestival.revenue.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 600, marginTop: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <TrendingUp size={12} /> +{selectedFestival.growth}% YoY growth
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666666" }}>
            <ShoppingBag size={14} style={{ color: "#701A75" }} /> Orders Processed
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#701A75", marginTop: 4 }}>
            {selectedFestival.orders.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: 11, color: "#666666", marginTop: 2 }}>
            AOV: ₹{Math.round(selectedFestival.revenue / selectedFestival.orders).toLocaleString("en-IN")}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666666" }}>
            <Award size={14} style={{ color: "#D4AF37" }} /> Best Selling Product
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#171717", marginTop: 6, lineHeight: 1.3 }}>
            {selectedFestival.topProduct}
          </div>
          <div style={{ fontSize: 11, color: "#D4AF37", fontWeight: 600, marginTop: 2 }}>#1 Festival Bestseller</div>
        </div>
      </div>
    </div>
  );
}
