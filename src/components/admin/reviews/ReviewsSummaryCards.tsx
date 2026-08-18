"use client";

import React from "react";
import { MessageSquare, Clock, CheckCircle2, EyeOff, Star, ShieldCheck } from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";

interface ReviewsSummaryCardsProps {
  reviews: AdminReviewDetail[];
}

export function ReviewsSummaryCards({ reviews }: ReviewsSummaryCardsProps) {
  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter((r) => r.status === "PENDING").length;
  const approvedReviews = reviews.filter((r) => r.status === "APPROVED").length;
  const hiddenReviews = reviews.filter((r) => r.status === "HIDDEN" || r.status === "REJECTED").length;
  
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";
      
  const verifiedCount = reviews.filter((r) => r.isVerifiedPurchase).length;
  const verifiedPercent = totalReviews > 0 ? Math.round((verifiedCount / totalReviews) * 100) : 0;

  const cards = [
    {
      title: "Total Reviews",
      value: totalReviews,
      subtitle: "All customer submissions",
      icon: MessageSquare,
      iconBg: "bg-stone-100 text-stone-800 border-stone-200",
      valueColor: "text-stone-900",
    },
    {
      title: "Pending Reviews",
      value: pendingReviews,
      subtitle: "Needs moderation",
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      valueColor: "text-amber-600",
    },
    {
      title: "Approved Reviews",
      value: approvedReviews,
      subtitle: "Live on storefront",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      valueColor: "text-emerald-600",
    },
    {
      title: "Hidden Reviews",
      value: hiddenReviews,
      subtitle: "Hidden or rejected",
      icon: EyeOff,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
      valueColor: "text-rose-600",
    },
    {
      title: "Average Rating",
      value: `${avgRating} ★`,
      subtitle: "Overall customer rating",
      icon: Star,
      iconBg: "bg-amber-50 text-amber-700 border-amber-200",
      valueColor: "text-amber-700",
    },
    {
      title: "Verified Reviews",
      value: verifiedCount,
      subtitle: `${verifiedPercent}% verified buyers`,
      icon: ShieldCheck,
      iconBg: "bg-purple-50 text-purple-700 border-purple-200",
      valueColor: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{card.title}</span>
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${card.iconBg}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className={`text-2xl font-extrabold font-display ${card.valueColor}`}>
                {card.value}
              </div>
              <p className="text-[11px] font-medium text-stone-400 mt-0.5">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
