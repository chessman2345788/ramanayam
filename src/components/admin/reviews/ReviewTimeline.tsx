"use client";

import React from "react";
import { Clock, CheckCircle2, XCircle, Edit3, AlertTriangle } from "lucide-react";
import { TimelineEvent } from "@/data/mockReviewsData";

interface ReviewTimelineProps {
  events: TimelineEvent[];
}

export function ReviewTimeline({ events }: ReviewTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "SUBMITTED":
        return <Clock size={14} style={{ color: "#F57C00" }} />;
      case "APPROVED":
        return <CheckCircle2 size={14} style={{ color: "#16A34A" }} />;
      case "REJECTED":
        return <XCircle size={14} style={{ color: "#DC2626" }} />;
      case "EDITED":
        return <Edit3 size={14} style={{ color: "#2563EB" }} />;
      case "REPORTED":
        return <AlertTriangle size={14} style={{ color: "#701A75" }} />;
      default:
        return <Clock size={14} />;
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
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Review Audit Timeline</h3>
        <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
          Chronological history of submission, flags, and moderation actions.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative", paddingLeft: 8 }}>
        {events.map((event, idx) => (
          <div key={event.id || idx} style={{ display: "flex", gap: 14, position: "relative" }}>
            {/* Timeline line connecting events */}
            {idx < events.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 13,
                  top: 24,
                  bottom: -16,
                  width: 2,
                  background: "rgba(0,0,0,0.08)",
                }}
              />
            )}

            <div
              style={{
                width: 28,
                height: 28,
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
              {getEventIcon(event.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>{event.title}</div>
              <div style={{ fontSize: 12, color: "#666666", marginTop: 2 }}>{event.description}</div>
              <div style={{ fontSize: 11, color: "#999999", marginTop: 4 }}>
                {event.timestamp} • By {event.actor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
