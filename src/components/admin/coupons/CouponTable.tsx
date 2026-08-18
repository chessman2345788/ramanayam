"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Power,
  Trash2,
  Users,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { AdminCouponDetail, CouponStatus } from "@/data/mockCouponsData";
import { CouponStatusBadge } from "./CouponStatusBadge";

interface CouponTableProps {
  coupons: AdminCouponDetail[];
  onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
  onDuplicateCoupon: (coupon: AdminCouponDetail) => void;
  onDeleteModal: (coupon: AdminCouponDetail) => void;
  onViewUsageModal: (coupon: AdminCouponDetail) => void;
}

export function CouponTable({
  coupons,
  onToggleStatus,
  onDuplicateCoupon,
  onDeleteModal,
  onViewUsageModal,
}: CouponTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const formatDiscountDisplay = (coupon: AdminCouponDetail) => {
    if (coupon.discountType === "PERCENTAGE") return `${coupon.value}% OFF`;
    if (coupon.discountType === "FIXED_AMOUNT") return `₹${coupon.value} OFF`;
    if (coupon.discountType === "PRODUCT_SPECIFIC") return `₹${coupon.value} OFF (Product)`;
    if (coupon.discountType === "CATEGORY_SPECIFIC") return `${coupon.value}% OFF (Category)`;
    return "FREE SHIPPING";
  };

  const getDiscountTypeLabel = (coupon: AdminCouponDetail) => {
    if (coupon.discountType === "PERCENTAGE") return "Percentage";
    if (coupon.discountType === "FIXED_AMOUNT") return "Fixed Amount";
    if (coupon.discountType === "PRODUCT_SPECIFIC") return "Product Specific";
    if (coupon.discountType === "CATEGORY_SPECIFIC") return "Category Specific";
    return "Free Shipping";
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3.5">Coupon Code</th>
              <th className="p-3.5">Discount</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Min Order</th>
              <th className="p-3.5">Usage</th>
              <th className="p-3.5">Usage Limit</th>
              <th className="p-3.5">Start Date</th>
              <th className="p-3.5">Expiry Date</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-8 text-center text-stone-500 text-xs">
                  No promotional coupons match your search or filter settings.
                </td>
              </tr>
            ) : (
              coupons.map((c) => {
                const isMenuOpen = activeMenuId === c.id;
                const usagePercent = Math.round((c.usageCount / (c.usageLimit || 1)) * 100);

                return (
                  <tr key={c.id} className="hover:bg-amber-50/20 transition-colors">
                    {/* Code */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg text-xs">
                          {c.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 truncate max-w-[160px] mt-0.5">
                        {c.campaignName}
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="p-3.5 whitespace-nowrap font-bold text-stone-900">
                      {formatDiscountDisplay(c)}
                    </td>

                    {/* Type */}
                    <td className="p-3.5 whitespace-nowrap text-stone-600 font-medium">
                      {getDiscountTypeLabel(c)}
                    </td>

                    {/* Minimum Order */}
                    <td className="p-3.5 whitespace-nowrap font-semibold text-stone-800">
                      ₹{c.minOrderValue.toLocaleString("en-IN")}
                    </td>

                    {/* Usage */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-stone-900">
                        {c.usageCount.toLocaleString("en-IN")}
                      </div>
                      <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            usagePercent >= 100 ? "bg-rose-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                      </div>
                    </td>

                    {/* Usage Limit */}
                    <td className="p-3.5 whitespace-nowrap text-stone-600 font-medium">
                      <div>Total: {c.usageLimit.toLocaleString("en-IN")}</div>
                      <div className="text-[10px] text-stone-400">
                        Max {c.perCustomerLimit}/customer
                      </div>
                    </td>

                    {/* Start Date */}
                    <td className="p-3.5 whitespace-nowrap text-stone-600 text-[11px]">
                      {c.startDate}
                    </td>

                    {/* Expiry Date */}
                    <td className="p-3.5 whitespace-nowrap text-stone-600 text-[11px]">
                      {c.endDate}
                    </td>

                    {/* Status */}
                    <td className="p-3.5 whitespace-nowrap">
                      <CouponStatusBadge status={c.status} />
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right whitespace-nowrap relative">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/coupons/${c.id}`}
                          title="View Details"
                          className="p-1.5 text-stone-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setActiveMenuId(isMenuOpen ? null : c.id)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Action Dropdown */}
                      {isMenuOpen && (
                        <>
                          <div
                            onClick={() => setActiveMenuId(null)}
                            className="fixed inset-0 z-40"
                          />
                          <div className="absolute right-3 top-10 w-44 bg-white rounded-xl border border-stone-200 shadow-xl p-1 z-50 text-left animate-in fade-in zoom-in-95 duration-100 space-y-0.5">
                            <Link
                              href={`/admin/coupons/${c.id}`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-600" /> View Campaign
                            </Link>

                            <Link
                              href={`/admin/coupons/${c.id}?edit=true`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5 text-sky-600" /> Edit Coupon
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                onDuplicateCoupon(c);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5 text-purple-600" /> Duplicate
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onViewUsageModal(c);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Users className="w-3.5 h-3.5 text-emerald-600" /> View Usage
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onToggleStatus(c.id, c.status);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Power className="w-3.5 h-3.5" />
                              <span>{c.status === "ACTIVE" ? "Disable" : "Enable"}</span>
                            </button>

                            <div className="my-1 border-t border-stone-100" />

                            <button
                              type="button"
                              onClick={() => {
                                onDeleteModal(c);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
