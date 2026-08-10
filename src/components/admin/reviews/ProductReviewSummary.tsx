"use client";

import React from "react";
import { Star, BarChart2 } from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";

interface ProductReviewSummaryProps {
  review: AdminReviewDetail;
  allProductReviews?: AdminReviewDetail[];
}

export function ProductReviewSummary({ review, allProductReviews = [] }: ProductReviewSummaryProps) {
  const avgRating = review.productAverageRating || 4.8;
  const totalReviews = review.productTotalReviews || 128;

  // Mock distribution percentages for 5★ to 1★
  const distribution = [
    { stars: 5, percent: 78, count: Math.round(totalReviews * 0.78) },
    { stars: 4, percent: 14, count: Math.round(totalReviews * 0.14) },
    { stars: 3, percent: 5, count: Math.round(totalReviews * 0.05) },
    { stars: 2, percent: 2, count: Math.round(totalReviews * 0.02) },
    { stars: 1, percent: 1, count: Math.round(totalReviews * 0.01) },
  ];

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
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Product Review Summary</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Overall customer rating breakdown for {review.productName}.
          </p>
        </div>
        <BarChart2 size={18} style={{ color: "#F57C00" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Score Card */}
        <div style={{ textAlign: "center", minWidth: 100 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#171717" }}>{avgRating}</div>
          <RatingStars rating={avgRating} size={14} />
          <div style={{ fontSize: 11, color: "#999999", marginTop: 4 }}>Based on {totalReviews} reviews</div>
        </div>

        {/* Rating Breakdown Bars */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {distribution.map((dist) => (
            <div key={dist.stars} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
              <span style={{ width: 24, color: "#666666", fontWeight: 600 }}>{dist.stars}★</span>
              <div style={{ flex: 1, height: 7, background: "#FAF8F3", borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${dist.percent}%`,
                    background: dist.stars >= 4 ? "#F57C00" : dist.stars === 3 ? "#D4AF37" : "#DC2626",
                    borderRadius: 4,
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: "#999999", minWidth: 32, textAlign: "right" }}>{dist.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
