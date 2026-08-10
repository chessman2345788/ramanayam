"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Layers, Sparkles, Eye, CheckCircle2, Clock } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CollectionStatusBadge } from "@/components/admin/collections/CollectionStatusBadge";
import { CollectionPreview } from "@/components/admin/collections/CollectionPreview";
import { mockCollectionsList, AdminCollectionDetail } from "@/data/mockCollectionsData";

export default function AdminCollectionDetailPage() {
  const params = useParams();
  const collectionId = params?.id as string;

  const initialCollection = mockCollectionsList.find((c) => c.id === collectionId) || mockCollectionsList[0];
  const [collection] = useState<AdminCollectionDetail>(initialCollection);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
      {/* Navigation */}
      <div>
        <Link
          href="/admin/collections"
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
          <ArrowLeft size={14} /> Back to Collections Overview
        </Link>

        <AdminPageHeader
          title={`Collection - ${collection.name}`}
          subtitle={`Curated storefront collection details & assigned product grid`}
        />
      </div>

      {/* Grid: Left Column (Summary & Products Grid), Right Column (Rules & Timeline) */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Collection Header Banner Card */}
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
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#F57C00",
                    background: "rgba(245,124,0,0.08)",
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  /{collection.slug}
                </span>
                <CollectionStatusBadge status={collection.status} />
              </div>
              <span style={{ fontSize: 12, color: "#666666" }}>Created on {collection.createdAt}</span>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#171717", margin: "0 0 4px 0" }}>
                {collection.name}
              </h3>
              <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>{collection.description}</p>
            </div>

            {/* Config Badges Grid */}
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
                <div style={{ fontSize: 11, color: "#666666" }}>Collection Type</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#701A75", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                  {collection.type === "AUTOMATIC" ? <Sparkles size={14} /> : <Layers size={14} />}
                  {collection.type}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#666666" }}>Store Visibility</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#0284C7", marginTop: 2 }}>
                  {collection.visibility}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#666666" }}>Products Assigned</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#F57C00", marginTop: 2 }}>
                  {collection.productsCount} items
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Products Live Preview */}
          <CollectionPreview
            assignedProductIds={collection.assignedProductIds}
            bannerImage={collection.bannerImage}
            collectionName={collection.name}
          />
        </div>

        {/* Right Sidebar: Rules & Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Condition Rules */}
          {collection.type === "AUTOMATIC" && (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.06)",
                padding: 20,
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#701A75", display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={16} /> Automatic Smart Condition Rules
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {collection.automaticRules.map((rule, i) => (
                  <div
                    key={rule.id || i}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      background: "#FAF8F3",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#171717",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    Product <span style={{ color: "#F57C00" }}>{rule.field}</span> {rule.operator} "{rule.value}"
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Log */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>Collection History Log</div>
            <div style={{ display: "flex", gap: 10, fontSize: 12, color: "#666666" }}>
              <Clock size={15} style={{ color: "#F57C00", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, color: "#171717" }}>Collection Created</div>
                <div>Created on {collection.createdAt} by Merchant Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
