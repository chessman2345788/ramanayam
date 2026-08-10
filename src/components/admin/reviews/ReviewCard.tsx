"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, Eye, CheckCircle2, XCircle } from "lucide-react";
import { AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";
import { StatusBadge } from "./StatusBadge";

interface ReviewCardProps {
  review: AdminReviewDetail;
  onUpdateStatus?: (id: string, status: ReviewStatus) => void;
}

export function ReviewCard({ review, onUpdateStatus }: ReviewCardProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <StatusBadge status={review.status} />
        <span style={{ fontSize: 11, color: "#999999" }}>{review.reviewNumber}</span>
      </div>

      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
          {review.title}
        </div>
        <RatingStars rating={review.rating} size={13} showScore />
      </div>

      <p style={{ fontSize: 12, color: "#666666", margin: 0, fontStyle: "italic", lineHeight: 1.4 }}>
        "{review.comment}"
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FAF8F3",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#F57C00",
          }}
        >
          {review.customerAvatar ? (
            <img src={review.customerAvatar} alt={review.customerName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            review.customerName.charAt(0)
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#171717", display: "flex", alignItems: "center", gap: 4 }}>
            {review.customerName}
            {review.isVerifiedPurchase && <UserCheck size={12} style={{ color: "#16A34A" }} />}
          </div>
          <div style={{ fontSize: 11, color: "#999999" }}>{review.productName}</div>
        </div>

        <Link
          href={`/admin/reviews/${review.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: "#F57C00",
            textDecoration: "none",
          }}
        >
          <Eye size={14} /> Details
        </Link>
      </div>
    </div>
  );
}
