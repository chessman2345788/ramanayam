"use client";

import React, { useState } from "react";
import { Key, Eye, EyeOff, Copy, Check } from "lucide-react";

interface ApiKeyCardProps {
  serviceName: string;
  maskedKey: string;
  fullKey: string;
  status: "ACTIVE" | "EXPIRED";
}

export function ApiKeyCard({ serviceName, maskedKey, fullKey, status }: ApiKeyCardProps) {
  const [showFull, setShowFull] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Key size={15} style={{ color: "#F57C00" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>{serviceName}</span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: status === "ACTIVE" ? "#16A34A" : "#6B7280",
            background: status === "ACTIVE" ? "rgba(22,163,74,0.1)" : "rgba(107,114,128,0.1)",
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          {status}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type={showFull ? "text" : "password"}
          readOnly
          value={showFull ? fullKey : maskedKey}
          style={{
            flex: 1,
            padding: "7px 10px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: 12,
            color: "#171717",
            outline: "none",
          }}
        />

        <button
          type="button"
          onClick={() => setShowFull(!showFull)}
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            borderRadius: 8,
            padding: "7px 10px",
            fontSize: 12,
            fontWeight: 600,
            color: "#666666",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {showFull ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showFull ? "Hide" : "Show"}</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            border: "none",
            background: copied ? "#16A34A" : "#F57C00",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "7px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
