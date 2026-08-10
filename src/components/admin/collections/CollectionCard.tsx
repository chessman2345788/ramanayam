"use client";

import React from "react";
import Link from "next/link";
import { Layers, Eye, Sparkles } from "lucide-react";
import { AdminCollectionDetail } from "@/data/mockCollectionsData";
import { CollectionStatusBadge } from "./CollectionStatusBadge";

interface CollectionCardProps {
  collection: AdminCollectionDetail;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
      }}
    >
      <div style={{ height: 120, position: "relative", background: "#FAF8F3" }}>
        <img src={collection.thumbnail} alt={collection.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <CollectionStatusBadge status={collection.status} />
        </div>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#171717", lineHeight: 1.3 }}>{collection.name}</div>
        <div style={{ fontSize: 12, color: "#666666", lineHeight: 1.4, height: 34, overflow: "hidden" }}>
          {collection.description}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 10, marginTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#F57C00" }}>{collection.productsCount} products</span>
          <Link
            href={`/admin/collections/${collection.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: "#701A75",
              textDecoration: "none",
            }}
          >
            <Eye size={14} /> View
          </Link>
        </div>
      </div>
    </div>
  );
}
