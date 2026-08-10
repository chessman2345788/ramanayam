"use client";

import React, { useState } from "react";
import { Database, Download, RefreshCw, CheckCircle2, ShieldCheck } from "lucide-react";

interface BackupCardProps {
  lastBackupDate: string;
  onBackupNow: () => void;
  onRestore: () => void;
}

export function BackupCard({ lastBackupDate, onBackupNow, onRestore }: BackupCardProps) {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      onBackupNow();
    }, 2000);
  };

  return (
    <div
      style={{
        background: "#FAF8F3",
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
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
            <Database size={18} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>Automated Database Backups</div>
            <div style={{ fontSize: 12, color: "#666666" }}>
              Last backup completed: <span style={{ fontWeight: 600, color: "#171717" }}>{lastBackupDate}</span>
            </div>
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16A34A",
            background: "rgba(22,163,74,0.1)",
            padding: "3px 8px",
            borderRadius: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ShieldCheck size={13} /> Protected
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 14 }}>
        <button
          type="button"
          onClick={handleBackup}
          disabled={isBackingUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: 8,
            border: "none",
            background: isBackingUp ? "#16A34A" : "#F57C00",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 700,
            cursor: isBackingUp ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(245,124,0,0.2)",
          }}
        >
          {isBackingUp ? (
            <>
              <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} /> Backing Up Snapshot...
            </>
          ) : (
            <>
              <Download size={15} /> Backup Now
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onRestore}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            color: "#171717",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <RefreshCw size={15} style={{ color: "#701A75" }} /> Restore from Backup (UI)
        </button>
      </div>
    </div>
  );
}
