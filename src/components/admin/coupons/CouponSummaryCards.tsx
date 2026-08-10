"use client";

import React from "react";
import { CheckCircle2, Calendar, Clock, Sparkles, DollarSign, Percent } from "lucide-react";
import { AdminCouponDetail } from "@/data/mockCouponsData";

interface CouponSummaryCardsProps {
  coupons: AdminCouponDetail[];
}

export function CouponSummaryCards({ coupons }: CouponSummaryCardsProps) {
  const activeCount = coupons.filter((c) => c.status === "ACTIVE").length;
  const scheduledCount = coupons.filter((c) => c.status === "SCHEDULED").length;
  const expiredCount = coupons.filter((c) => c.status === "EXPIRED" || c.status === "DISABLED").length;

  const usedToday = coupons.reduce((acc, c) => acc + c.usedTodayCount, 0);
  const totalDiscountGiven = coupons.reduce((acc, c) => acc + c.totalDiscountAmount, 0);
  
  // Calculate average conversion rate or fixed metric
  const avgConversion = "14.2%";

  const cards = [
    { title: "Active Coupons", value: activeCount, icon: CheckCircle2, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    { title: "Scheduled Coupons", value: scheduledCount, icon: Calendar, color: "#0284C7", bg: "rgba(2,132,199,0.08)" },
    { title: "Expired / Disabled", value: expiredCount, icon: Clock, color: "#6B7280", bg: "rgba(107,114,128,0.08)" },
    { title: "Coupons Used Today", value: `${usedToday} redemptions`, icon: Sparkles, color: "#F57C00", bg: "rgba(245,124,0,0.08)" },
    { title: "Total Discount Given", value: `₹${(totalDiscountGiven / 100000).toFixed(2)}L`, icon: DollarSign, color: "#701A75", bg: "rgba(112,26,117,0.08)" },
    { title: "Conversion Rate", value: avgConversion, icon: Percent, color: "#D4AF37", bg: "rgba(212,175,55,0.1)" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 14,
      }}
    >
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "14px 16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 10,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#666666" }}>{card.title}</span>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.color,
                }}
              >
                <IconComponent size={15} />
              </div>
            </div>

            <div style={{ fontSize: 20, fontWeight: 800, color: card.color }}>{card.value}</div>
          </div>
        );
      })}
    </div>
  );
}
