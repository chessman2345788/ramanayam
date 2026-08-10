"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreVertical, Eye, Copy, Trash2, Layers, Sparkles, Folder } from "lucide-react";
import { AdminCollectionDetail } from "@/data/mockCollectionsData";
import { CollectionStatusBadge } from "./CollectionStatusBadge";

interface CollectionsTableProps {
  collections: AdminCollectionDetail[];
  onDuplicateCollection: (collection: AdminCollectionDetail) => void;
  onDeleteCollection: (id: string) => void;
}

export function CollectionsTable({
  collections,
  onDuplicateCollection,
  onDeleteCollection,
}: CollectionsTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

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
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Image</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Collection</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Products</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Type</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Visibility</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Created</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "12px 14px", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#999999" }}>
                  No collections found matching your search or filters.
                </td>
              </tr>
            ) : (
              collections.map((col) => {
                const isMenuOpen = activeMenuId === col.id;

                return (
                  <tr
                    key={col.id}
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
                    {/* Image */}
                    <td style={{ padding: "12px 14px" }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          overflow: "hidden",
                          background: "#FAF8F3",
                          border: "1px solid rgba(0,0,0,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {col.thumbnail ? (
                          <img src={col.thumbnail} alt={col.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <Folder size={18} style={{ color: "#F57C00" }} />
                        )}
                      </div>
                    </td>

                    {/* Collection Name & Slug */}
                    <td style={{ padding: "12px 14px", maxWidth: 220 }}>
                      <div style={{ fontWeight: 700, color: "#171717", lineHeight: "1.3" }}>{col.name}</div>
                      <div style={{ fontSize: 11, color: "#666666", fontFamily: "var(--font-jetbrains, monospace)" }}>
                        /{col.slug}
                      </div>
                    </td>

                    {/* Products Count */}
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#171717",
                          background: "#FAF8F3",
                          border: "1px solid rgba(0,0,0,0.08)",
                          padding: "2px 8px",
                          borderRadius: 6,
                        }}
                      >
                        {col.productsCount} items
                      </span>
                    </td>

                    {/* Type Badge */}
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: col.type === "AUTOMATIC" ? "#701A75" : "#F57C00",
                          background: col.type === "AUTOMATIC" ? "rgba(112,26,117,0.08)" : "rgba(245,124,0,0.08)",
                          padding: "3px 8px",
                          borderRadius: 6,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {col.type === "AUTOMATIC" ? <Sparkles size={11} /> : <Layers size={11} />}
                        {col.type}
                      </span>
                    </td>

                    {/* Visibility */}
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: col.visibility === "PUBLIC" ? "#16A34A" : col.visibility === "FESTIVAL" ? "#D97706" : "#6B7280",
                          background: col.visibility === "PUBLIC" ? "rgba(22,163,74,0.08)" : col.visibility === "FESTIVAL" ? "rgba(217,119,6,0.08)" : "rgba(107,114,128,0.08)",
                          padding: "3px 8px",
                          borderRadius: 6,
                        }}
                      >
                        {col.visibility}
                      </span>
                    </td>

                    {/* Created */}
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#666666", whiteSpace: "nowrap" }}>
                      {col.createdAt}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "12px 14px" }}>
                      <CollectionStatusBadge status={col.status} />
                    </td>

                    {/* Actions Menu */}
                    <td style={{ padding: "12px 14px", textAlign: "right", position: "relative" }}>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : col.id)}
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
                              width: 160,
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
                              href={`/admin/collections/${col.id}`}
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
                                onDuplicateCollection(col);
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
                                color: "#701A75",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              <Copy size={14} /> Duplicate
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onDeleteCollection(col.id);
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
