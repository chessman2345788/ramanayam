"use client";

import React from "react";
import { Calendar, X, Sparkles, Tag, CheckCircle2 } from "lucide-react";
import { AdminCouponDetail } from "@/data/mockCouponsData";
import { CouponStatusBadge } from "./CouponStatusBadge";

interface CampaignCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  coupons: AdminCouponDetail[];
}

export function CampaignCalendar({ isOpen, onClose, coupons }: CampaignCalendarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
        }}
      />
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 480,
          background: "#FFFFFF",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          padding: 24,
          gap: 20,
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(245,124,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F57C00",
              }}
            >
              <Calendar size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#171717", margin: 0 }}>Campaign Calendar</h3>
              <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
                Seasonal timeline of active and scheduled promotions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "#FAF8F3",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#666666",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* List of campaigns sorted by start date */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {coupons.map((c) => (
            <div
              key={c.id}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains, monospace)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#F57C00",
                    background: "#FFFFFF",
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: "1px solid rgba(245,124,0,0.2)",
                  }}
                >
                  {c.code}
                </span>
                <CouponStatusBadge status={c.status} />
              </div>

              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>{c.campaignName}</div>
                <div style={{ fontSize: 12, color: "#666666", marginTop: 2 }}>{c.description}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#666666",
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                  paddingTop: 8,
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={12} style={{ color: "#701A75" }} /> {c.startDate} — {c.endDate}
                </span>
                <span style={{ fontWeight: 600, color: "#16A34A" }}>{c.usageCount} used</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
