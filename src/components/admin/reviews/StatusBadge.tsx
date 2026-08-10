"use client";

import React from "react";
import { ReviewStatus } from "@/data/mockReviewsData";
import { Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: ReviewStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "APPROVED":
        return {
          bg: "rgba(22,163,74,0.1)",
          color: "#16A34A",
          border: "rgba(22,163,74,0.25)",
          icon: <CheckCircle2 size={12} />,
          label: "Approved",
        };
      case "PENDING":
        return {
          bg: "rgba(245,124,0,0.1)",
          color: "#F57C00",
          border: "rgba(245,124,0,0.25)",
          icon: <Clock size={12} />,
          label: "Pending",
        };
      case "REJECTED":
        return {
          bg: "rgba(220,38,38,0.1)",
          color: "#DC2626",
          border: "rgba(220,38,38,0.25)",
          icon: <XCircle size={12} />,
          label: "Rejected",
        };
      case "REPORTED":
        return {
          bg: "rgba(112,26,117,0.1)",
          color: "#701A75",
          border: "rgba(112,26,117,0.25)",
          icon: <AlertTriangle size={12} />,
          label: "Reported",
        };
      default:
        return {
          bg: "rgba(0,0,0,0.06)",
          color: "#666666",
          border: "rgba(0,0,0,0.1)",
          icon: <Clock size={12} />,
          label: status,
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
      }}
    >
      {style.icon}
      {style.label}
    </span>
  );
}
