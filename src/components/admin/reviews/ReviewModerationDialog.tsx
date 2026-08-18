"use client";

import React, { useState } from "react";
import { AlertTriangle, EyeOff, Trash2, Shield, X, Check } from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";

export type ModerationDialogMode = "HIDE" | "DELETE" | "REPORT" | null;

interface ReviewModerationDialogProps {
  isOpen: boolean;
  mode: ModerationDialogMode;
  review: AdminReviewDetail | null;
  onClose: () => void;
  onConfirmHide: (id: string, reason?: string, notes?: string) => void;
  onConfirmDelete: (id: string) => void;
  onConfirmReport: (id: string, reason?: string, notes?: string) => void;
}

const defaultReasons = [
  "Spam / Fake Account Review",
  "External Promotional Links / URLs",
  "Inappropriate or Offensive Language",
  "Logistics / Shipping Complaint (Non-Product Issue)",
  "Competitor Defamation",
  "Product Quality Inspection Pending",
  "Other Policy Violation",
];

export function ReviewModerationDialog({
  isOpen,
  mode,
  review,
  onClose,
  onConfirmHide,
  onConfirmDelete,
  onConfirmReport,
}: ReviewModerationDialogProps) {
  const [reason, setReason] = useState(defaultReasons[0]);
  const [notes, setNotes] = useState("");

  if (!isOpen || !mode || !review) return null;

  const isDelete = mode === "DELETE";
  const isHide = mode === "HIDE";
  const isReport = mode === "REPORT";

  const getHeaderInfo = () => {
    if (isDelete) {
      return {
        title: "Delete Review Permanently",
        subtitle: "This action is destructive and cannot be undone.",
        icon: Trash2,
        iconStyle: "bg-red-50 text-red-600 border-red-200",
        confirmBtnStyle: "bg-red-600 hover:bg-red-700 text-white",
        confirmText: "Delete Review",
      };
    }
    if (isHide) {
      return {
        title: "Hide Review from Storefront",
        subtitle:
          "Hiding this review will remove it from public display on the Ramanayam storefront, but it will remain saved in admin moderation records.",
        icon: EyeOff,
        iconStyle: "bg-amber-50 text-amber-700 border-amber-200",
        confirmBtnStyle: "bg-stone-900 hover:bg-black text-white",
        confirmText: "Hide Review",
      };
    }
    return {
      title: "Report & Flag Review",
      subtitle: "Flag this review for policy violations, spam, or inappropriate content.",
      icon: AlertTriangle,
      iconStyle: "bg-rose-50 text-rose-700 border-rose-200",
      confirmBtnStyle: "bg-rose-600 hover:bg-rose-700 text-white",
      confirmText: "Submit Report",
    };
  };

  const header = getHeaderInfo();
  const IconComp = header.icon;

  const handleSubmit = () => {
    if (isDelete) {
      onConfirmDelete(review.id);
    } else if (isHide) {
      onConfirmHide(review.id, reason, notes);
    } else if (isReport) {
      onConfirmReport(review.id, reason, notes);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/60">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${header.iconStyle}`}>
              <IconComp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">{header.title}</h3>
              <p className="text-xs text-stone-500">{review.reviewNumber} • {review.productName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            {header.subtitle}
          </p>

          {/* Target Review Snippet */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-1">
            <div className="font-bold text-stone-900">"{review.title}"</div>
            <div className="text-stone-600 line-clamp-2 italic">"{review.comment}"</div>
            <div className="text-[11px] text-stone-400">By {review.customerName}</div>
          </div>

          {/* Reason Selection (For Hide & Report) */}
          {(isHide || isReport) && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Reason for Moderation Action:
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
                >
                  {defaultReasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Internal Moderator Notes (Optional):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain rationale for admin record..."
                  className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600 resize-none"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer ${header.confirmBtnStyle}`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{header.confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
