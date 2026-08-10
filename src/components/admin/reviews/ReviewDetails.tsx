"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserCheck, ShoppingBag, MapPin, Mail, ExternalLink, Image as ImageIcon } from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";
import { StatusBadge } from "./StatusBadge";

interface ReviewDetailsProps {
  review: AdminReviewDetail;
}

export function ReviewDetails({ review }: ReviewDetailsProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

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
        gap: 24,
      }}
    >
      {/* Lightbox photo modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <img
            src={selectedPhoto}
            alt="Customer upload expanded"
            style={{ maxWidth: "90%", maxHeight: "90vh", borderRadius: 12, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
          />
        </div>
      )}

      {/* Header Info */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#171717" }}>{review.reviewNumber}</span>
            <StatusBadge status={review.status} />
          </div>
          <div style={{ fontSize: 12, color: "#666666" }}>
            Submitted on {new Date(review.createdAt).toLocaleString("en-IN")}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RatingStars rating={review.rating} size={18} showScore />
        </div>
      </div>

      {/* Grid: Customer Info & Product Info */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {/* Customer Card */}
        <div
          style={{
            background: "#FAF8F3",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#701A75", textTransform: "uppercase" }}>
            Customer Information
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#F57C00",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {review.customerAvatar ? (
                <img src={review.customerAvatar} alt={review.customerName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                review.customerName.charAt(0)
              )}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#171717", display: "flex", alignItems: "center", gap: 6 }}>
                {review.customerName}
                {review.isVerifiedPurchase && (
                  <span style={{ fontSize: 11, background: "rgba(22,163,74,0.1)", color: "#16A34A", padding: "2px 6px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    <UserCheck size={12} /> Verified Purchase
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: "#666666", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Mail size={12} /> {review.customerEmail}
              </div>
              <div style={{ fontSize: 12, color: "#666666", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <MapPin size={12} /> {review.customerLocation}
              </div>
            </div>
          </div>

          {review.orderId && (
            <div style={{ fontSize: 12, borderTop: "1px stroke rgba(0,0,0,0.05)", paddingTop: 8, marginTop: 4, color: "#666666" }}>
              Order ID: <span style={{ fontWeight: 600, color: "#171717" }}>{review.orderId}</span> ({review.orderDate})
            </div>
          )}
        </div>

        {/* Product Card */}
        <div
          style={{
            background: "#FAF8F3",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#F57C00", textTransform: "uppercase" }}>
            Product Information
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img src={review.productImage} alt={review.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>{review.productName}</div>
              <div style={{ fontSize: 12, color: "#666666", marginTop: 2 }}>
                SKU: <span style={{ fontFamily: "var(--font-jetbrains, monospace)" }}>{review.productSku}</span> • {review.productCategory}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#F57C00", marginTop: 4 }}>
                ₹{review.productPrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div style={{ background: "#FAF8F3", borderRadius: 12, padding: 18, border: "1px solid rgba(0,0,0,0.06)" }}>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: "0 0 8px 0" }}>
          "{review.title}"
        </h4>
        <p style={{ fontSize: 14, color: "#333333", lineHeight: 1.6, margin: 0 }}>
          {review.comment}
        </p>

        {/* Customer Uploaded Photos */}
        {review.images && review.images.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#666666", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <ImageIcon size={14} style={{ color: "#F57C00" }} /> Uploaded Photos ({review.images.length})
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {review.images.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Review photo ${i + 1}`}
                  onClick={() => setSelectedPhoto(imgUrl)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
