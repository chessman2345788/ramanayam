"use client";

import React from "react";
import { Layers, CheckCircle2, Calendar, Package } from "lucide-react";
import { AdminCollectionDetail } from "@/data/mockCollectionsData";

interface CollectionSummaryCardsProps {
  collections: AdminCollectionDetail[];
}

export function CollectionSummaryCards({ collections }: CollectionSummaryCardsProps) {
  const totalCollections = collections.length;
  const activeCollections = collections.filter((c) => c.status === "ACTIVE").length;
  const scheduledCollections = collections.filter((c) => c.status === "SCHEDULED").length;
  const totalProductsAssigned = collections.reduce((acc, c) => acc + c.productsCount, 0);

  const cards = [
    { title: "Total Collections", value: totalCollections, icon: Layers, color: "#171717", bg: "rgba(0,0,0,0.04)" },
    { title: "Active Collections", value: activeCollections, icon: CheckCircle2, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    { title: "Scheduled Collections", value: scheduledCollections, icon: Calendar, color: "#0284C7", bg: "rgba(2,132,199,0.08)" },
    { title: "Products Assigned", value: totalProductsAssigned, icon: Package, color: "#F57C00", bg: "rgba(245,124,0,0.08)" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14,
      }}
    >
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "16px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#666666" }}>{card.title}</span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.color,
                }}
              >
                <IconComponent size={16} />
              </div>
            </div>

            <div style={{ fontSize: 22, fontWeight: 800, color: card.color }}>{card.value}</div>
          </div>
        );
      })}
    </div>
  );
}
