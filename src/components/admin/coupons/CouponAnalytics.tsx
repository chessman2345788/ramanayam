"use client";

import React from "react";
import { BarChart3, TrendingUp, DollarSign, Award, Percent } from "lucide-react";
import { mockCouponsList, AdminCouponDetail } from "@/data/mockCouponsData";

interface CouponAnalyticsProps {
  coupons?: AdminCouponDetail[];
}

export function CouponAnalytics({ coupons = mockCouponsList }: CouponAnalyticsProps) {
  const totalRedemptions = coupons.reduce((acc, c) => acc + c.usageCount, 0);
  const totalRevenueGenerated = coupons.reduce((acc, c) => acc + c.revenueGenerated, 0);
  const totalDiscountGiven = coupons.reduce((acc, c) => acc + c.totalDiscountAmount, 0);

  const sortedByUsage = [...coupons].sort((a, b) => b.usageCount - a.usageCount);

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Coupon Performance & Analytics</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            ROI breakdown of promotional discount campaigns.
          </p>
        </div>
        <BarChart3 size={18} style={{ color: "#F57C00" }} />
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        <div style={{ background: "#FAF8F3", padding: 14, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 11, color: "#666666", fontWeight: 500 }}>Total Redemptions</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#171717", marginTop: 4 }}>
            {totalRedemptions.toLocaleString("en-IN")}
          </div>
        </div>

        <div style={{ background: "#FAF8F3", padding: 14, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 11, color: "#666666", fontWeight: 500 }}>Revenue Generated</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#F57C00", marginTop: 4 }}>
            ₹{(totalRevenueGenerated / 100000).toFixed(2)}L
          </div>
        </div>

        <div style={{ background: "#FAF8F3", padding: 14, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 11, color: "#666666", fontWeight: 500 }}>Discount Provided</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#701A75", marginTop: 4 }}>
            ₹{(totalDiscountGiven / 100000).toFixed(2)}L
          </div>
        </div>

        <div style={{ background: "#FAF8F3", padding: 14, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 11, color: "#666666", fontWeight: 500 }}>Avg Conversion Boost</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#16A34A", marginTop: 4 }}>
            +18.4%
          </div>
        </div>
      </div>

      {/* Top Performing Leaderboard Table */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Award size={15} style={{ color: "#D4AF37" }} />
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#171717", margin: 0 }}>Top Performing Coupon Codes</h4>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#FAF8F3", color: "#666666" }}>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Code</th>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Campaign</th>
                <th style={{ padding: "8px 10px", textAlign: "center" }}>Usage</th>
                <th style={{ padding: "8px 10px", textAlign: "right" }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sortedByUsage.slice(0, 4).map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 700, fontFamily: "var(--font-jetbrains, monospace)", color: "#F57C00" }}>
                    {c.code}
                  </td>
                  <td style={{ padding: "8px 10px", color: "#171717" }}>{c.campaignName}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center", fontWeight: 600 }}>{c.usageCount}</td>
                  <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700, color: "#16A34A" }}>
                    ₹{(c.revenueGenerated / 100000).toFixed(1)}L
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
