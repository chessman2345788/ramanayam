"use client";

import React from "react";
import { Users, UserPlus, RotateCcw, Award, ArrowUpRight } from "lucide-react";
import { mockCustomerAnalytics } from "@/data/mockAnalyticsData";

export function CustomerAnalytics() {
  const {
    newCustomers,
    newCustomersChange,
    returningCustomers,
    returningCustomersChange,
    repeatPurchaseRate,
    topCustomers,
  } = mockCustomerAnalytics;

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
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Customer Analytics</h3>
        <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
          Devotee retention, new registrations, repeat purchase habits, and top patrons.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        <div style={{ background: "#FAF8F3", padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#666666", fontWeight: 500 }}>New Customers</span>
            <UserPlus size={16} style={{ color: "#F57C00" }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#171717" }}>{newCustomers}</div>
          <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <ArrowUpRight size={12} /> +{newCustomersChange}% vs last month
          </div>
        </div>

        <div style={{ background: "#FAF8F3", padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#666666", fontWeight: 500 }}>Returning Customers</span>
            <Users size={16} style={{ color: "#701A75" }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#701A75" }}>{returningCustomers}</div>
          <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <ArrowUpRight size={12} /> +{returningCustomersChange}% vs last month
          </div>
        </div>

        <div style={{ background: "#FAF8F3", padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#666666", fontWeight: 500 }}>Repeat Purchase Rate</span>
            <RotateCcw size={16} style={{ color: "#16A34A" }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#16A34A" }}>{repeatPurchaseRate}%</div>
          <div style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>
            High brand loyalty across festival seasons
          </div>
        </div>
      </div>

      {/* Top Customers Leaderboard */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Award size={16} style={{ color: "#D4AF37" }} />
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#171717", margin: 0 }}>Top Patrons & Devotees</h4>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", color: "#666666", background: "#FAF8F3" }}>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Customer Name</th>
                <th style={{ padding: "8px 12px", textAlign: "center" }}>Orders</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Favorite Category</th>
                <th style={{ padding: "8px 12px", textAlign: "right" }}>Total Spent</th>
                <th style={{ padding: "8px 12px", textAlign: "right" }}>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((cust) => (
                <tr key={cust.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 600, color: "#171717" }}>{cust.name}</div>
                    <div style={{ fontSize: 11, color: "#999999" }}>{cust.email}</div>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, color: "#701A75" }}>
                    {cust.ordersCount}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#666666" }}>
                    <span style={{ fontSize: 11, background: "rgba(245,124,0,0.08)", color: "#F57C00", padding: "2px 6px", borderRadius: 4 }}>
                      {cust.favoriteCategory}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, color: "#F57C00" }}>
                    ₹{cust.totalSpent.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, color: "#999999" }}>
                    {cust.lastOrderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
