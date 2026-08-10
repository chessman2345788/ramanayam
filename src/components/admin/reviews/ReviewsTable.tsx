"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
  UserCheck,
  Package,
} from "lucide-react";
import { AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";
import { StatusBadge } from "./StatusBadge";

interface ReviewsTableProps {
  reviews: AdminReviewDetail[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onUpdateStatus: (id: string, status: ReviewStatus) => void;
  onDeleteReview: (id: string) => void;
}

export function ReviewsTable({
  reviews,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onUpdateStatus,
  onDeleteReview,
}: ReviewsTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected = reviews.length > 0 && reviews.every((r) => selectedIds.includes(r.id));

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
              <th style={{ padding: "12px 14px", width: 40 }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  style={{ cursor: "pointer", accentColor: "#F57C00" }}
                />
              </th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Product</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Customer</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Rating</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Review Preview</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "12px 14px", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#999999" }}>
                  No customer reviews found matching your search or filters.
                </td>
              </tr>
            ) : (
              reviews.map((rev) => {
                const isSelected = selectedIds.includes(rev.id);
                const isMenuOpen = activeMenuId === rev.id;

                return (
                  <tr
                    key={rev.id}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                      background: isSelected ? "rgba(245,124,0,0.03)" : "transparent",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <td style={{ padding: "12px 14px" }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(rev.id)}
                        style={{ cursor: "pointer", accentColor: "#F57C00" }}
                      />
                    </td>

                    {/* Product Cell */}
                    <td style={{ padding: "12px 14px", maxWidth: 220 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            overflow: "hidden",
                            background: "#FAF8F3",
                            border: "1px solid rgba(0,0,0,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {rev.productImage ? (
                            <img src={rev.productImage} alt={rev.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <Package size={16} style={{ color: "#F57C00" }} />
                          )}
                        </div>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                          <div style={{ fontWeight: 600, color: "#171717", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {rev.productName}
                          </div>
                          <div style={{ fontSize: 11, color: "#999999", fontFamily: "var(--font-jetbrains, monospace)" }}>
                            {rev.productSku}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Customer Cell */}
                    <td style={{ padding: "12px 14px" }}>
                      <div>
                        <div style={{ fontWeight: 600, color: "#171717", display: "flex", alignItems: "center", gap: 4 }}>
                          {rev.customerName}
                          {rev.isVerifiedPurchase && (
                            <span title="Verified Purchaser">
                              <UserCheck size={13} style={{ color: "#16A34A" }} />
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: "#999999" }}>{rev.customerLocation}</div>
                      </div>
                    </td>

                    {/* Rating Cell */}
                    <td style={{ padding: "12px 14px" }}>
                      <RatingStars rating={rev.rating} size={13} showScore />
                    </td>

                    {/* Review Preview Cell */}
                    <td style={{ padding: "12px 14px", maxWidth: 280 }}>
                      <div style={{ fontWeight: 600, color: "#171717", fontSize: 12, marginBottom: 2 }}>
                        {rev.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#666666",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontStyle: "italic",
                        }}
                      >
                        "{rev.comment}"
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td style={{ padding: "12px 14px" }}>
                      <StatusBadge status={rev.status} />
                    </td>

                    {/* Date Cell */}
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#666666", whiteSpace: "nowrap" }}>
                      {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions Menu */}
                    <td style={{ padding: "12px 14px", textAlign: "right", position: "relative" }}>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : rev.id)}
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
                              href={`/admin/reviews/${rev.id}`}
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

                            {rev.status !== "APPROVED" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateStatus(rev.id, "APPROVED");
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
                                  color: "#16A34A",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                <CheckCircle2 size={14} /> Approve
                              </button>
                            )}

                            {rev.status !== "REJECTED" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateStatus(rev.id, "REJECTED");
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
                                }}
                              >
                                <XCircle size={14} /> Reject
                              </button>
                            )}

                            <Link
                              href={`/products`}
                              target="_blank"
                              onClick={() => setActiveMenuId(null)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 10px",
                                borderRadius: 6,
                                fontSize: 12,
                                color: "#666666",
                                textDecoration: "none",
                              }}
                            >
                              <ExternalLink size={14} /> View Product
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                onDeleteReview(rev.id);
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
