"use client";

import React, { useState } from "react";
import {
  X,
  UserCheck,
  MapPin,
  Mail,
  ImageIcon,
  ShoppingBag,
  Clock,
  ShieldCheck,
  CheckCircle2,
  EyeOff,
  Trash2,
  AlertTriangle,
  History,
} from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";
import { StatusBadge } from "./StatusBadge";

interface ReviewDetailsProps {
  review: AdminReviewDetail | null;
  isOpen?: boolean;
  onClose?: () => void;
  onApprove?: (id: string) => void;
  onHide?: (review: AdminReviewDetail) => void;
  onDelete?: (review: AdminReviewDetail) => void;
  onReport?: (review: AdminReviewDetail) => void;
}

export function ReviewDetails({
  review,
  isOpen = true,
  onClose,
  onApprove,
  onHide,
  onDelete,
  onReport,
}: ReviewDetailsProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!isOpen || !review) return null;

  const content = (
    <div className="space-y-6">
      {/* Lightbox modal for photos */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={selectedPhoto}
            alt="Customer review uploaded image"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border border-white/20 object-contain"
          />
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <span className="text-base font-extrabold text-stone-900 font-display">
            {review.reviewNumber}
          </span>
          <StatusBadge status={review.status} />
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Rating & Submitted Date */}
      <div className="bg-amber-50/40 border border-amber-200/60 p-4 rounded-xl flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Customer Rating
          </div>
          <RatingStars rating={review.rating} size={18} showScore />
        </div>
        <div className="text-right text-xs text-stone-500">
          <div className="flex items-center gap-1 font-medium justify-end text-stone-700">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            Submitted Date
          </div>
          <span>
            {new Date(review.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-3">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
          <span>Customer Information</span>
          {review.isVerifiedPurchase && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Purchase
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center font-bold text-amber-700 text-base shrink-0 overflow-hidden shadow-2xs">
            {review.customerAvatar ? (
              <img src={review.customerAvatar} alt={review.customerName} className="w-full h-full object-cover" />
            ) : (
              review.customerName.charAt(0)
            )}
          </div>
          <div className="space-y-0.5 min-w-0">
            <h4 className="text-sm font-bold text-stone-900">{review.customerName}</h4>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 truncate">
              <Mail className="w-3 h-3 text-stone-400 shrink-0" />
              <span>{review.customerEmail}</span>
            </p>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 truncate">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span>{review.customerLocation}</span>
            </p>
          </div>
        </div>

        {review.orderId && (
          <div className="pt-2 border-t border-stone-200/60 text-xs text-stone-600 flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium">
              <ShoppingBag className="w-3.5 h-3.5 text-stone-400" /> Order ID:
            </span>
            <span className="font-mono font-bold text-stone-900">{review.orderId}</span>
            {review.orderDate && (
              <span className="text-[11px] text-stone-400">({review.orderDate})</span>
            )}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-3">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Product Information
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 overflow-hidden shrink-0 shadow-2xs">
            <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">{review.productName}</h4>
            <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
              <span className="font-mono">{review.productSku}</span>
              <span>•</span>
              <span>{review.productCategory}</span>
            </div>
            <div className="text-xs font-extrabold text-amber-700 mt-1">
              ₹{review.productPrice.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      {/* Review Text Content */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-stone-900">"{review.title}"</h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">
          {review.comment}
        </p>

        {/* Customer Photos */}
        {review.images && review.images.length > 0 && (
          <div className="pt-3 border-t border-stone-100 space-y-2">
            <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Customer Photos ({review.images.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {review.images.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Review photo ${i + 1}`}
                  onClick={() => setSelectedPhoto(imgUrl)}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 cursor-pointer hover:scale-105 transition-transform shadow-2xs"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Moderation History */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-4 h-4 text-stone-400" />
          <span>Moderation History</span>
        </div>

        {review.timeline.length === 0 ? (
          <p className="text-xs text-stone-400 italic">No moderation history recorded yet.</p>
        ) : (
          <div className="space-y-2 relative pl-4 border-l-2 border-amber-200">
            {review.timeline.map((event) => (
              <div key={event.id} className="relative text-xs space-y-0.5">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-600 ring-4 ring-white" />
                <div className="font-bold text-stone-900">{event.title}</div>
                <div className="text-stone-600">{event.description}</div>
                <div className="text-[10px] text-stone-400">
                  {event.timestamp} • by {event.actor}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Moderation Actions Footer (if actions supplied) */}
      {(onApprove || onHide || onDelete || onReport) && (
        <div className="pt-4 border-t border-stone-200 flex items-center gap-2.5">
          {review.status !== "APPROVED" && onApprove && (
            <button
              type="button"
              onClick={() => {
                onApprove(review.id);
                if (onClose) onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
          )}

          {review.status !== "HIDDEN" && onHide && (
            <button
              type="button"
              onClick={() => {
                onHide(review);
                if (onClose) onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <EyeOff className="w-4 h-4" /> Hide
            </button>
          )}

          {onReport && (
            <button
              type="button"
              onClick={() => {
                onReport(review);
                if (onClose) onClose();
              }}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Report Review"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(review);
                if (onClose) onClose();
              }}
              className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Delete Review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Render as Drawer modal if onClose provided, otherwise render as card
  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="flex-1" onClick={onClose} />
        <div className="bg-white w-full max-w-xl h-full shadow-2xl border-l border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          <div className="flex-1 overflow-y-auto p-6">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
      {content}
    </div>
  );
}
