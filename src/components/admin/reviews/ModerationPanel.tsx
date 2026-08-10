"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Shield, FileText } from "lucide-react";
import { AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";

interface ModerationPanelProps {
  review: AdminReviewDetail;
  onUpdateStatus: (id: string, status: ReviewStatus, reason?: string, notes?: string) => void;
}

const rejectionReasons = [
  "Logistics / Shipping Complaint (Non-product issue)",
  "Spam & External Promotional Links",
  "Inappropriate or Offensive Language",
  "Unverified Buyer False Claim",
  "Competitor Defamation",
  "Duplicate / Irrelevant Content",
];

export function ModerationPanel({ review, onUpdateStatus }: ModerationPanelProps) {
  const [reason, setReason] = useState(review.rejectionReason || rejectionReasons[0]);
  const [notes, setNotes] = useState(review.moderatorNotes || "");
  const [actionDone, setActionDone] = useState<string | null>(null);

  const handleApprove = () => {
    onUpdateStatus(review.id, "APPROVED", undefined, notes);
    setActionDone("Review has been approved and published to the store!");
  };

  const handleReject = () => {
    onUpdateStatus(review.id, "REJECTED", reason, notes);
    setActionDone("Review has been rejected and hidden from storefront.");
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
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(245,124,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F57C00",
          }}
        >
          <Shield size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Moderation Control Panel</h3>
          <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
            Approve, reject, or flag this review per store guidelines.
          </p>
        </div>
      </div>

      {actionDone && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            background: "rgba(22,163,74,0.1)",
            color: "#16A34A",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CheckCircle2 size={16} /> {actionDone}
        </div>
      )}

      {/* Rejection Reason Selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>
          Rejection Reason (If rejecting):
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FAF8F3",
            fontSize: 13,
            outline: "none",
          }}
        >
          {rejectionReasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Moderator Internal Notes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#666666", display: "flex", alignItems: "center", gap: 4 }}>
          <FileText size={13} /> Internal Moderator Notes (Visible to admin team only):
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes explaining moderation rationale..."
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FAF8F3",
            fontSize: 13,
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, paddingTop: 6 }}>
        <button
          type="button"
          onClick={handleApprove}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            background: "#16A34A",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
            transition: "opacity 0.15s ease",
          }}
        >
          <CheckCircle2 size={16} /> Approve Review
        </button>

        <button
          type="button"
          onClick={handleReject}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            background: "#DC2626",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(220,38,38,0.25)",
            transition: "opacity 0.15s ease",
          }}
        >
          <XCircle size={16} /> Reject Review
        </button>
      </div>
    </div>
  );
}
