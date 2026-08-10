"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreVertical, Eye, Copy, Trash2, Power, Tag } from "lucide-react";
import { AdminCouponDetail, CouponStatus } from "@/data/mockCouponsData";
import { CouponStatusBadge } from "./CouponStatusBadge";

interface CouponTableProps {
  coupons: AdminCouponDetail[];
  onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
  onDuplicateCoupon: (coupon: AdminCouponDetail) => void;
  onDeleteCoupon: (id: string) => void;
}

export function CouponTable({
  coupons,
  onToggleStatus,
  onDuplicateCoupon,
  onDeleteCoupon,
}: CouponTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const formatDiscountLabel = (coupon: AdminCouponDetail) => {
    if (coupon.discountType === "PERCENTAGE") return `${coupon.value}% OFF`;
    if (coupon.discountType === "FIXED_AMOUNT") return `₹${coupon.value} OFF`;
    if (coupon.discountType === "FREE_SHIPPING") return "FREE SHIPPING";
    return "BUY X GET Y";
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#FAF8F3", color: "#666666" }}>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Coupon Code</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Campaign Name</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Discount</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Usage</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Expiry</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Created By</th>
              <th style={{ padding: "12px 14px", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#999999" }}>
                  No coupons found matching your search or filters.
                </td>
              </tr>
            ) : (
              coupons.map((c) => {
                const isMenuOpen = activeMenuId === c.id;
                const usagePercent = Math.min(100, Math.round((c.usageCount / c.usageLimit) * 100));

                return (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(245,124,0,0.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {/* Code */}
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontFamily: "var(--font-jetbrains, monospace)",
                          fontSize: 13,
                          color: "#F57C00",
                          background: "rgba(245,124,0,0.08)",
                          padding: "4px 8px",
                          borderRadius: 6,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {c.code}
                      </span>
                    </td>

                    {/* Campaign Name & Description */}
                    <td style={{ padding: "12px 14px", maxWidth: 220 }}>
                      <div style={{ fontWeight: 600, color: "#171717", lineHeight: "1.3" }}>{c.campaignName}</div>
                      <div style={{ fontSize: 11, color: "#666666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {c.description}
                      </div>
                    </td>

                    {/* Discount Badge */}
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#701A75",
                          background: "rgba(112,26,117,0.08)",
                          padding: "3px 8px",
                          borderRadius: 6,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Tag size={12} />
                        {formatDiscountLabel(c)}
                      </span>
                    </td>

                    {/* Usage Meter */}
                    <td style={{ padding: "12px 14px", minWidth: 130 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666666", marginBottom: 3 }}>
                        <span style={{ fontWeight: 600, color: "#171717" }}>{c.usageCount}</span>
                        <span>/ {c.usageLimit}</span>
                      </div>
                      <div style={{ height: 6, background: "#FAF8F3", borderRadius: 3, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${usagePercent}%`,
                            background: usagePercent >= 100 ? "#DC2626" : usagePercent >= 80 ? "#D97706" : "#F57C00",
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    </td>

                    {/* Expiry Date */}
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#666666", whiteSpace: "nowrap" }}>
                      {c.endDate}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: "12px 14px" }}>
                      <CouponStatusBadge status={c.status} />
                    </td>

                    {/* Created By */}
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#666666" }}>
                      {c.createdBy}
                    </td>

                    {/* Actions Menu */}
                    <td style={{ padding: "12px 14px", textAlign: "right", position: "relative" }}>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : c.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 6,
                          borderRadius: 6,
                          cursor: "pointer",
                          color: "#666666",
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {isMenuOpen && (
                        <>
                          <div
                            onClick={() => setActiveMenuId(null)}
                            style={{ position: "fixed", inset: 0, zIndex: 40 }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              right: 14,
                              top: "80%",
                              width: 170,
                              background: "#FFFFFF",
                              borderRadius: 10,
                              border: "1px solid rgba(0,0,0,0.08)",
                              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                              padding: 4,
                              zIndex: 50,
                              textAlign: "left",
                            }}
                          >
                            <Link
                              href={`/admin/coupons/${c.id}`}
                              onClick={() => setActiveMenuId(null)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 10px",
                                borderRadius: 6,
                                fontSize: 12,
                                color: "#171717",
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              <Eye size={14} style={{ color: "#F57C00" }} /> View Details
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                onToggleStatus(c.id, c.status);
                                setActiveMenuId(null);
                              }}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 10px",
                                borderRadius: 6,
                                border: "none",
                                background: "transparent",
                                fontSize: 12,
                                color: c.status === "ACTIVE" ? "#DC2626" : "#16A34A",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              <Power size={14} />
                              {c.status === "ACTIVE" ? "Disable Code" : "Activate Code"}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onDuplicateCoupon(c);
                                setActiveMenuId(null);
                              }}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 10px",
                                borderRadius: 6,
                                border: "none",
                                background: "transparent",
                                fontSize: 12,
                                color: "#171717",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              <Copy size={14} style={{ color: "#701A75" }} /> Duplicate
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onDeleteCoupon(c.id);
                                setActiveMenuId(null);
                              }}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 10px",
                                borderRadius: 6,
                                border: "none",
                                background: "transparent",
                                fontSize: 12,
                                color: "#DC2626",
                                fontWeight: 500,
                                cursor: "pointer",
                                borderTop: "1px solid rgba(0,0,0,0.05)",
                                marginTop: 4,
                              }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
