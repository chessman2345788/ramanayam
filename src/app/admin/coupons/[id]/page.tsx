"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Tag, Calendar, Users, Shield, CheckCircle2, Clock } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CouponStatusBadge } from "@/components/admin/coupons/CouponStatusBadge";
import { CouponAnalytics } from "@/components/admin/coupons/CouponAnalytics";
import { mockCouponsList, AdminCouponDetail } from "@/data/mockCouponsData";

export default function AdminCouponDetailPage() {
  const params = useParams();
  const couponId = params?.id as string;

  const initialCoupon = mockCouponsList.find((c) => c.id === couponId) || mockCouponsList[0];
  const [coupon] = useState<AdminCouponDetail>(initialCoupon);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
      {/* Navigation */}
      <div>
        <Link
          href="/admin/coupons"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#666666",
            textDecoration: "none",
            marginBottom: 12,
          }}
        >
          <ArrowLeft size={14} /> Back to Coupons Overview
        </Link>

        <AdminPageHeader
          title={`Campaign Details - ${coupon.code}`}
          subtitle={coupon.campaignName}
        />
      </div>

      {/* Grid: Left Column (Summary & Rules), Right Column (Analytics & Timeline) */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Main Campaign Card */}
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
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains, monospace)",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#F57C00",
                    background: "rgba(245,124,0,0.08)",
                    padding: "4px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(245,124,0,0.2)",
                  }}
                >
                  {coupon.code}
                </span>
                <CouponStatusBadge status={coupon.status} />
              </div>
              <div style={{ fontSize: 12, color: "#666666" }}>Created by {coupon.createdBy}</div>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#171717", margin: "0 0 4px 0" }}>
                {coupon.campaignName}
              </h3>
              <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>{coupon.description}</p>
            </div>

            {/* Configs summary grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 12,
                background: "#FAF8F3",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: "#666666" }}>Discount Offer</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#701A75", marginTop: 2 }}>
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.value}% OFF`
                    : coupon.discountType === "FIXED_AMOUNT"
                    ? `₹${coupon.value} OFF`
                    : "FREE SHIPPING"}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#666666" }}>Min Order Value</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#171717", marginTop: 2 }}>
                  ₹{coupon.minOrderValue.toLocaleString("en-IN")}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#666666" }}>Total Usage Limit</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#171717", marginTop: 2 }}>
                  {coupon.usageCount} / {coupon.usageLimit}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#666666" }}>Customer Eligibility</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#16A34A", marginTop: 2 }}>
                  {coupon.customerEligibility}
                </div>
              </div>
            </div>

            {/* Applicable categories & products */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Applicable Product Categories</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {coupon.applicableCategories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      background: "rgba(245,124,0,0.08)",
                      color: "#F57C00",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Analytics Panel */}
          <CouponAnalytics />
        </div>

        {/* Timeline Sidebar */}
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
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Campaign Timeline Log</h3>
            <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
              Audit events for code creation, activation, and expiration.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 8 }}>
            {coupon.timeline.map((evt, idx) => (
              <div key={evt.id || idx} style={{ display: "flex", gap: 12, position: "relative" }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#FAF8F3",
                    border: "1px solid rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 2,
                  }}
                >
                  <Clock size={13} style={{ color: "#F57C00" }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>{evt.title}</div>
                  <div style={{ fontSize: 12, color: "#666666", marginTop: 2 }}>{evt.description}</div>
                  <div style={{ fontSize: 11, color: "#999999", marginTop: 4 }}>
                    {evt.timestamp} • By {evt.actor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
