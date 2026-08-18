"use client";

import React from "react";
import { X, Users, ShoppingBag, Calendar, IndianRupee } from "lucide-react";
import { CouponUsageRecord, AdminCouponDetail } from "@/data/mockCouponsData";

interface CouponUsageTableProps {
  isOpen: boolean;
  coupon: AdminCouponDetail | null;
  usages: CouponUsageRecord[];
  onClose: () => void;
}

export function CouponUsageTable({
  isOpen,
  coupon,
  usages,
  onClose,
}: CouponUsageTableProps) {
  if (!isOpen || !coupon) return null;

  const filteredUsages = usages.filter((u) => u.couponCode === coupon.code || usages.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="flex-1" onClick={onClose} />
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl border-l border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/80">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Coupon Usage History
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                {coupon.code} ({coupon.usageCount} total redemptions)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Table */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-stone-500 font-medium">Total Discount Given:</span>
              <span className="ml-2 font-extrabold text-amber-700 text-sm">
                ₹{coupon.totalDiscountAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Revenue Generated:</span>
              <span className="ml-2 font-extrabold text-emerald-700 text-sm">
                ₹{coupon.revenueGenerated.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Order Total</th>
                  <th className="p-3">Used At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-stone-400 text-xs">
                      No redemptions recorded for this coupon code yet.
                    </td>
                  </tr>
                ) : (
                  filteredUsages.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Customer */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-amber-700 text-xs overflow-hidden shrink-0">
                            {u.customerAvatar ? (
                              <img src={u.customerAvatar} alt={u.customerName} className="w-full h-full object-cover" />
                            ) : (
                              u.customerName.charAt(0)
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{u.customerName}</div>
                            <div className="text-[10px] text-stone-400">{u.customerEmail}</div>
                          </div>
                        </div>
                      </td>

                      {/* Order ID */}
                      <td className="p-3 font-mono font-bold text-stone-800 whitespace-nowrap">
                        {u.orderId}
                      </td>

                      {/* Discount Amount */}
                      <td className="p-3 font-bold text-rose-700 whitespace-nowrap">
                        -₹{u.discountAmount.toLocaleString("en-IN")}
                      </td>

                      {/* Order Amount */}
                      <td className="p-3 font-bold text-stone-900 whitespace-nowrap">
                        ₹{u.orderAmount.toLocaleString("en-IN")}
                      </td>

                      {/* Used At */}
                      <td className="p-3 text-stone-500 text-[11px] whitespace-nowrap">
                        {u.usedAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
