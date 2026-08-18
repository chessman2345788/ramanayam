"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReviewDetails } from "@/components/admin/reviews/ReviewDetails";
import { ModerationPanel } from "@/components/admin/reviews/ModerationPanel";
import { ReviewTimeline } from "@/components/admin/reviews/ReviewTimeline";
import { ProductReviewSummary } from "@/components/admin/reviews/ProductReviewSummary";
import { AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";
import { AdminService } from "@/services/admin.service";

export default function AdminReviewDetailPage() {
  const params = useParams();
  const reviewId = params?.id as string;

  const [review, setReview] = useState<AdminReviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadReview = useCallback(async () => {
    if (!reviewId) return;
    setIsLoading(true);
    try {
      // Fetch review by ID from admin reviews list endpoint
      const result = await AdminService.fetchReviewsListFromApi({ limit: 100 });
      const raw = result.data.find((r: any) => r.id === reviewId);

      if (raw) {
        const custName = raw.user
          ? `${raw.user.firstName || ""} ${raw.user.lastName || ""}`.trim() || raw.user.email
          : "Customer";
        const custEmail = raw.user?.email || "";
        const prodName = raw.product?.name || "Product";

        const formatted: AdminReviewDetail = {
          id: raw.id,
          reviewNumber: `REV-${raw.id.slice(0, 6).toUpperCase()}`,
          rating: raw.rating || 5,
          title: raw.comment ? (raw.comment.length > 50 ? raw.comment.slice(0, 50) + "..." : raw.comment) : "Customer Review",
          comment: raw.comment || "",
          status: "APPROVED" as ReviewStatus,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
          helpfulCount: 0,

          productId: raw.productId,
          productName: prodName,
          productSku: "N/A",
          productImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=400&auto=format&fit=crop&q=80",
          productCategory: "General",
          productPrice: 0,
          productAverageRating: 5.0,
          productTotalReviews: 1,

          customerId: raw.userId,
          customerName: custName,
          customerEmail: custEmail,
          customerLocation: "India",
          isVerifiedPurchase: false,

          images: [],
          timeline: [
            {
              id: `t_${raw.id}`,
              type: "SUBMITTED",
              title: "Review Submitted",
              description: `Submitted by customer with rating ${raw.rating}/5.`,
              timestamp: new Date(raw.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              actor: custName,
            },
          ],
        };

        setReview(formatted);
      } else {
        setReview(null);
      }
    } catch (err: any) {
      console.error("Failed to load review details:", err);
      showToast("Error loading review details from database.");
    } finally {
      setIsLoading(false);
    }
  }, [reviewId]);

  useEffect(() => {
    loadReview();
  }, [loadReview]);

  const handleUpdateStatus = async (
    id: string,
    status: ReviewStatus,
    _reason?: string,
    _notes?: string
  ) => {
    showToast(`Note: Review status '${status}' is not stored in backend schema (no status column). To moderate, edit rating/comment or delete.`);
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
        <p className="text-sm font-semibold text-stone-700">Loading review from database...</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-lg font-bold text-stone-800">Review Not Found</h2>
        <p className="text-xs text-stone-500">The requested review ID does not exist in the database.</p>
        <Link
          href="/admin/reviews"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Reviews List</span>
        </Link>
      </div>
    );
  }

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
