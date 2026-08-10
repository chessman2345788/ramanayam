"use client";

import React from "react";
import { CollectionStatus } from "@/data/mockCollectionsData";
import { CheckCircle2, Calendar, Archive, FileEdit } from "lucide-react";

interface CollectionStatusBadgeProps {
  status: CollectionStatus;
}

export function CollectionStatusBadge({ status }: CollectionStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "rgba(22,163,74,0.1)",
          color: "#16A34A",
          border: "rgba(22,163,74,0.25)",
          icon: <CheckCircle2 size={12} />,
          label: "Active",
        };
      case "SCHEDULED":
        return {
          bg: "rgba(2,132,199,0.1)",
          color: "#0284C7",
          border: "rgba(2,132,199,0.25)",
          icon: <Calendar size={12} />,
          label: "Scheduled",
        };
      case "ARCHIVED":
        return {
          bg: "rgba(107,114,128,0.1)",
          color: "#6B7280",
          border: "rgba(107,114,128,0.25)",
          icon: <Archive size={12} />,
          label: "Archived",
        };
      case "DRAFT":
        return {
          bg: "rgba(217,119,6,0.1)",
          color: "#D97706",
          border: "rgba(217,119,6,0.25)",
          icon: <FileEdit size={12} />,
          label: "Draft",
        };
      default:
        return {
          bg: "rgba(0,0,0,0.06)",
          color: "#666666",
          border: "rgba(0,0,0,0.1)",
          icon: <CheckCircle2 size={12} />,
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
