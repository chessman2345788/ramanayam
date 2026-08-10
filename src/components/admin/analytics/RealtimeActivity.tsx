"use client";

import React from "react";
import { ShoppingBag, CreditCard, AlertTriangle, UserPlus, Radio } from "lucide-react";
import { mockRealtimeActivities } from "@/data/mockAnalyticsData";

export function RealtimeActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag size={15} style={{ color: "#F57C00" }} />;
      case "payment":
        return <CreditCard size={15} style={{ color: "#16A34A" }} />;
      case "inventory":
        return <AlertTriangle size={15} style={{ color: "#D97706" }} />;
      case "customer":
        return <UserPlus size={15} style={{ color: "#701A75" }} />;
      default:
        return <ShoppingBag size={15} />;
    }
  };

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
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            <span
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#EF4444",
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                opacity: 0.75,
              }}
            />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Real-Time Activity Stream</h3>
            <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
              Live feed of incoming orders, payments, stock changes, and registrations.
            </p>
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#EF4444",
            background: "rgba(239,68,68,0.1)",
            padding: "3px 8px",
            borderRadius: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Radio size={12} /> LIVE
        </span>
      </div>

      {/* Activities Feed List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {mockRealtimeActivities.map((act) => (
          <div
            key={act.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: 10,
              background: "#FAF8F3",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {getActivityIcon(act.type)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#171717", display: "flex", alignItems: "center", gap: 6 }}>
                  {act.title}
                  {act.badge && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        background: "rgba(0,0,0,0.06)",
                        color: "#666666",
                        padding: "1px 5px",
                        borderRadius: 4,
                      }}
                    >
                      {act.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#666666", marginTop: 2 }}>{act.description}</div>
              </div>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              {act.amount && <div style={{ fontSize: 13, fontWeight: 700, color: "#F57C00" }}>{act.amount}</div>}
              <div style={{ fontSize: 11, color: "#999999" }}>{act.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
