"use client";

import React from "react";
import { Tag, CheckCircle2, Clock, XCircle, Users, IndianRupee } from "lucide-react";
import { AdminCouponDetail } from "@/data/mockCouponsData";

interface CouponSummaryCardsProps {
  coupons: AdminCouponDetail[];
}

export function CouponSummaryCards({ coupons }: CouponSummaryCardsProps) {
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.status === "ACTIVE").length;
  const scheduledCoupons = coupons.filter((c) => c.status === "SCHEDULED").length;
  const expiredCoupons = coupons.filter((c) => c.status === "EXPIRED").length;
  const totalRedemptions = coupons.reduce((acc, c) => acc + c.usageCount, 0);
  const totalDiscountGiven = coupons.reduce((acc, c) => acc + c.totalDiscountAmount, 0);

  const cards = [
    {
      title: "Total Coupons",
      value: totalCoupons,
      subtitle: "All created campaigns",
      icon: Tag,
      iconBg: "bg-stone-100 text-stone-800 border-stone-200",
      valueColor: "text-stone-900",
    },
    {
      title: "Active Coupons",
      value: activeCoupons,
      subtitle: "Live & redeemable",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      valueColor: "text-emerald-600",
    },
    {
      title: "Scheduled Coupons",
      value: scheduledCoupons,
      subtitle: "Upcoming promotions",
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      valueColor: "text-amber-600",
    },
    {
      title: "Expired Coupons",
      value: expiredCoupons,
      subtitle: "Ended or limits met",
      icon: XCircle,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
      valueColor: "text-rose-600",
    },
    {
      title: "Total Redemptions",
      value: totalRedemptions.toLocaleString("en-IN"),
      subtitle: "Times coupons used",
      icon: Users,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      valueColor: "text-purple-600",
    },
    {
      title: "Total Discount Given",
      value: `₹${totalDiscountGiven.toLocaleString("en-IN")}`,
      subtitle: "Customer savings",
      icon: IndianRupee,
      iconBg: "bg-amber-50 text-amber-700 border-amber-200",
      valueColor: "text-amber-700",
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
