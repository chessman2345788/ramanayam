"use client";

import React from "react";
import { Tag, Sparkles, Scissors, Clock } from "lucide-react";
import { DiscountType } from "@/data/mockCouponsData";

interface CouponPreviewProps {
  code: string;
  campaignName: string;
  description: string;
  discountType: DiscountType;
  value: number;
  minOrderValue: number;
  endDate: string;
}

export function CouponPreview({
  code,
  campaignName,
  description,
  discountType,
  value,
  minOrderValue,
  endDate,
}: CouponPreviewProps) {
  const displayCode = code.trim().toUpperCase() || "YOURCODE";
  const displayDiscount =
    discountType === "PERCENTAGE"
      ? `${value || 0}% OFF`
      : discountType === "FIXED_AMOUNT"
      ? `₹${value || 0} OFF`
      : discountType === "PRODUCT_SPECIFIC"
      ? `₹${value || 0} OFF`
      : discountType === "CATEGORY_SPECIFIC"
      ? `${value || 0}% OFF`
      : "FREE SHIPPING";

  const formattedDate = endDate
    ? new Date(endDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "30 Sep 2026";

  return (
    <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white rounded-2xl p-5 shadow-xl border border-amber-500/30 relative overflow-hidden space-y-4">
      {/* Decorative background aura */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            Store Coupon Preview
          </span>
        </div>
        <Scissors className="w-4 h-4 text-amber-500/50" />
      </div>

      {/* Main Ticket Box */}
      <div className="bg-stone-950/80 rounded-xl p-4 border border-dashed border-amber-500/40 relative">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-2xl font-extrabold text-amber-400 font-display tracking-tight">
              {displayDiscount}
            </div>
            <div className="text-xs font-semibold text-stone-200 mt-0.5 line-clamp-1">
              {campaignName || "Festival Special Discount"}
            </div>
          </div>

          {/* Code Badge */}
          <div className="bg-amber-500/20 border border-amber-400/50 px-3 py-1.5 rounded-xl font-mono font-extrabold text-amber-300 text-sm tracking-wider shadow-inner">
            {displayCode}
          </div>
        </div>

        {description && (
          <p className="text-[11px] text-stone-300 leading-relaxed mt-2 border-t border-stone-800 pt-2 italic">
            "{description}"
          </p>
        )}
      </div>

      {/* Footer Terms */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2 font-medium">
        <span>Minimum order ₹{minOrderValue ? minOrderValue.toLocaleString("en-IN") : "0"}</span>
        <span className="flex items-center gap-1 text-amber-300">
          <Clock className="w-3 h-3" /> Valid until {formattedDate}
        </span>
      </div>
    </div>
  );
}
