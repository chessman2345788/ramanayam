"use client";

import React from "react";
import { MessageSquare, Clock, CheckCircle2, XCircle, Star, Package } from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";

interface ReviewsSummaryCardsProps {
  reviews: AdminReviewDetail[];
}

export function ReviewsSummaryCards({ reviews }: ReviewsSummaryCardsProps) {
  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter((r) => r.status === "PENDING").length;
  const approvedReviews = reviews.filter((r) => r.status === "APPROVED").length;
  const rejectedReviews = reviews.filter((r) => r.status === "REJECTED" || r.status === "REPORTED").length;

  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : "0.0";
  const uniqueProductsWithReviews = new Set(reviews.map((r) => r.productId)).size;

  const cards = [
    { title: "Total Reviews", value: totalReviews, icon: MessageSquare, color: "#171717", bg: "rgba(0,0,0,0.04)" },
    { title: "Pending Reviews", value: pendingReviews, icon: Clock, color: "#F57C00", bg: "rgba(245,124,0,0.08)" },
    { title: "Approved Reviews", value: approvedReviews, icon: CheckCircle2, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    { title: "Rejected / Reported", value: rejectedReviews, icon: XCircle, color: "#DC2626", bg: "rgba(220,38,38,0.08)" },
    { title: "Average Rating", value: `${avgRating} ★`, icon: Star, color: "#D4AF37", bg: "rgba(212,175,55,0.1)" },
    { title: "Products with Reviews", value: uniqueProductsWithReviews, icon: Package, color: "#701A75", bg: "rgba(112,26,117,0.08)" },
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
