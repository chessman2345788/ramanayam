"use client";

import React from "react";
import { Tag, Sparkles, Award, ShoppingBag, IndianRupee } from "lucide-react";

export function CouponAnalytics() {
  const stats = {
    couponsUsed: 7150,
    totalDiscount: 2053600,
    ordersUsingCoupons: 6420,
    couponRevenue: 15710000,
    mostUsedCoupon: { code: "WELCOME10", usages: 2840, discount: 341000 },
    bestPerformingCoupon: { code: "DIWALI2026", revenue: 4260000, discount: 890000 },
  };

  return (
    <div className="space-y-6">
      {/* Coupon Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-purple-50/60 border border-purple-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-purple-800 uppercase flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-purple-600" /> Total Coupons Used
          </div>
          <div className="text-xl font-extrabold text-purple-950 font-display">
            {stats.couponsUsed.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-purple-700 font-medium">Across all promotions</div>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-amber-800 uppercase flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Total Discount Given
          </div>
          <div className="text-xl font-extrabold text-amber-950 font-display">
            ₹{(stats.totalDiscount / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[10px] text-amber-700 font-medium">Customer promotional savings</div>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase flex items-center gap-1">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> Orders with Coupons
          </div>
          <div className="text-xl font-extrabold text-emerald-950 font-display">
            {stats.ordersUsingCoupons.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-emerald-700 font-bold">78% coupon adoption</div>
        </div>

        <div className="bg-sky-50/60 border border-sky-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-sky-800 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Coupon Order Sales
          </div>
          <div className="text-xl font-extrabold text-sky-950 font-display">
            ₹{(stats.couponRevenue / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[10px] text-sky-700 font-medium">Generated from coupon carts</div>
        </div>
      </div>

      {/* Top Performing Coupons Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-amber-800 uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" /> Most Used Coupon Code
            </div>
            <div className="font-mono font-extrabold text-amber-900 text-lg mt-1">
              {stats.mostUsedCoupon.code}
            </div>
            <div className="text-xs text-amber-700 font-medium">
              {stats.mostUsedCoupon.usages.toLocaleString("en-IN")} redemptions
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-stone-400 font-semibold">Total Discount</div>
            <div className="text-sm font-extrabold text-stone-900">
              ₹{stats.mostUsedCoupon.discount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-emerald-800 uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Highest Revenue Campaign
            </div>
            <div className="font-mono font-extrabold text-emerald-900 text-lg mt-1">
              {stats.bestPerformingCoupon.code}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              ₹{(stats.bestPerformingCoupon.revenue / 100000).toFixed(2)} Lakhs Revenue
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-stone-400 font-semibold">Discount Given</div>
            <div className="text-sm font-extrabold text-stone-900">
              ₹{stats.bestPerformingCoupon.discount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
