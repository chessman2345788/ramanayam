"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReviewDetails } from "@/components/admin/reviews/ReviewDetails";
import { ModerationPanel } from "@/components/admin/reviews/ModerationPanel";
import { ReviewTimeline } from "@/components/admin/reviews/ReviewTimeline";
import { ProductReviewSummary } from "@/components/admin/reviews/ProductReviewSummary";
import { mockReviewsList, AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";

export default function AdminReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = params?.id as string;

  const initialReview = mockReviewsList.find((r) => r.id === reviewId) || mockReviewsList[0];
  const [review, setReview] = useState<AdminReviewDetail>(initialReview);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleUpdateStatus = (
    id: string,
    status: ReviewStatus,
    reason?: string,
    notes?: string
  ) => {
    const nowStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTimelineEvent = {
      id: `t_${Date.now()}`,
      type: status === "APPROVED" ? ("APPROVED" as const) : ("REJECTED" as const),
      title: status === "APPROVED" ? "Review Approved" : "Review Rejected",
      description: status === "APPROVED"
        ? "Review published to product page on storefront."
        : `Rejected: ${reason || "Policy non-compliance"}. Notes: ${notes || "None"}`,
      timestamp: nowStr,
      actor: "Admin Moderator",
    };

    setReview((prev) => ({
      ...prev,
      status,
      rejectionReason: reason,
      moderatorNotes: notes,
      moderatedAt: new Date().toISOString(),
      timeline: [...prev.timeline, newTimelineEvent],
    }));

    showToast(`Review status updated to ${status}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#171717",
            color: "#FFFFFF",
            padding: "12px 18px",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 100,
          }}
        >
          <CheckCircle2 size={16} style={{ color: "#F57C00" }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Back Button & Header */}
      <div>
        <Link
          href="/admin/reviews"
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
          <ArrowLeft size={14} /> Back to Reviews List
        </Link>

        <AdminPageHeader
          title={`Review Details - ${review.reviewNumber}`}
          subtitle={`Moderation workspace for ${review.productName}`}
        />
      </div>

      {/* Grid: Left Column (Details & Summary), Right Column (Moderation & Timeline) */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Main Review details card */}
          <ReviewDetails review={review} />
          {/* Product Review overall summary & rating distribution */}
          <ProductReviewSummary review={review} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Moderation Controls Panel */}
          <ModerationPanel review={review} onUpdateStatus={handleUpdateStatus} />
          {/* Review Lifecycle Timeline */}
          <ReviewTimeline events={review.timeline} />
        </div>
      </div>
    </div>
  );
}
