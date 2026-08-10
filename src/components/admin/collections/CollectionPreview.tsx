"use client";

import React from "react";
import { Package, Star, ShoppingBag } from "lucide-react";
import { mockSelectableProducts, CollectionProductItem } from "@/data/mockCollectionsData";

interface CollectionPreviewProps {
  assignedProductIds?: string[];
  bannerImage?: string;
  collectionName?: string;
}

export function CollectionPreview({
  assignedProductIds = ["prod_01", "prod_02", "prod_03"],
  bannerImage,
  collectionName = "Collection Storefront Preview",
}: CollectionPreviewProps) {
  const products: CollectionProductItem[] = mockSelectableProducts.filter((p) =>
    assignedProductIds.includes(p.id)
  );

  const displayProducts = products.length > 0 ? products : mockSelectableProducts.slice(0, 4);

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#171717", margin: 0 }}>Live Collection Preview</h4>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Storefront grid view of matching products in this collection ({displayProducts.length} items).
          </p>
        </div>
      </div>

      {/* Banner Preview */}
      {bannerImage && (
        <div
          style={{
            height: 120,
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
            background: "#FAF8F3",
          }}
        >
          <img src={bannerImage} alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              display: "flex",
              alignItems: "flex-end",
              padding: 14,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-display)" }}>
              {collectionName}
            </span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {displayProducts.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#FAF8F3",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 110,
                borderRadius: 6,
                overflow: "hidden",
                background: "#FFFFFF",
              }}
            >
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#171717", lineHeight: 1.3, height: 32, overflow: "hidden" }}>
                {p.name}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#F57C00", marginTop: 4 }}>
                ₹{p.price.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
