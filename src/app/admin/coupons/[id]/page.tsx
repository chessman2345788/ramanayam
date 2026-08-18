"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, Tag, ShieldCheck, Users, Edit3, Eye, Loader2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CouponStatusBadge } from "@/components/admin/coupons/CouponStatusBadge";
import { CouponAnalytics } from "@/components/admin/coupons/CouponAnalytics";
import { CouponForm } from "@/components/admin/coupons/CouponForm";
import { AdminCouponDetail, CouponStatus, DiscountType } from "@/data/mockCouponsData";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminCouponDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const couponId = params?.id as string;
  const isEditModeParam = searchParams.get("edit") === "true";

  const [coupon, setCoupon] = useState<AdminCouponDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(isEditModeParam);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadCouponDetail = useCallback(async () => {
    if (!couponId) return;
    setIsLoading(true);
    try {
      const c = await AdminService.fetchCouponByIdFromApi(couponId);
      if (c) {
        const now = new Date();
        const startDate = c.startDate ? new Date(c.startDate) : null;
        const endDate = c.endDate ? new Date(c.endDate) : null;

        let status: CouponStatus = "ACTIVE";
        if (!c.isActive) {
          status = "DISABLED";
        } else if (endDate && now > endDate) {
          status = "EXPIRED";
        } else if (startDate && now < startDate) {
          status = "SCHEDULED";
        }

        const formatted: AdminCouponDetail = {
          id: c.id,
          code: c.code,
          campaignName: c.description || c.code,
          description: c.description || "",
          discountType: (c.discountType === "FIXED" ? "FIXED_AMOUNT" : "PERCENTAGE") as DiscountType,
          value: Number(c.discountValue || 0),
          maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : undefined,
          minOrderValue: c.minOrderAmount ? Number(c.minOrderAmount) : 0,
          usageCount: c.usedCount || 0,
          usageLimit: c.usageLimit || 9999,
          perCustomerLimit: 1,
          usedTodayCount: 0,
          revenueGenerated: 0,
          totalDiscountAmount: 0,
          status,
          applicability: "ENTIRE_STORE",
          startDate: c.startDate ? new Date(c.startDate).toISOString().slice(0, 10) : new Date(c.createdAt).toISOString().slice(0, 10),
          endDate: c.endDate ? new Date(c.endDate).toISOString().slice(0, 10) : "2099-12-31",
          applicableCategories: [],
          applicableProducts: [],
          excludedProducts: [],
          timezone: "Asia/Kolkata (IST)",
          createdBy: "Admin",
          timeline: [
            {
              id: `t_${c.id}`,
              title: "Coupon Created",
              description: `Created on ${new Date(c.createdAt).toLocaleDateString("en-IN")}`,
              timestamp: new Date(c.createdAt).toLocaleString("en-IN"),
              actor: "System",
            },
          ],
        };

        setCoupon(formatted);
      }
    } catch (err: any) {
      console.error("Failed to load coupon details:", err);
      showToast("Error loading coupon details from database.");
    } finally {
      setIsLoading(false);
    }
  }, [couponId]);

  useEffect(() => {
    loadCouponDetail();
  }, [loadCouponDetail]);

  const handleUpdateCoupon = async (updatedData: Partial<AdminCouponDetail>) => {
    if (!coupon) return;
    try {
      const descParts = [];
      if (updatedData.campaignName) descParts.push(updatedData.campaignName);
      if (updatedData.description) descParts.push(updatedData.description);

      const apiData: Record<string, any> = {
        code: updatedData.code ? updatedData.code.toUpperCase().trim() : undefined,
        description: descParts.join(" - ") || updatedData.description || undefined,
        discountType: updatedData.discountType === "FIXED_AMOUNT" ? "FIXED" : updatedData.discountType === "PERCENTAGE" ? "PERCENTAGE" : undefined,
        discountValue: updatedData.value !== undefined ? Number(updatedData.value) : undefined,
        minOrderAmount: updatedData.minOrderValue !== undefined ? Number(updatedData.minOrderValue) : undefined,
        maxDiscount: updatedData.maxDiscount !== undefined ? Number(updatedData.maxDiscount) : undefined,
        usageLimit: updatedData.usageLimit !== undefined ? Number(updatedData.usageLimit) : undefined,
        isActive: updatedData.status !== undefined ? updatedData.status !== "DISABLED" : undefined,
      };

      if (updatedData.startDate) {
        const time = updatedData.startTime || "00:00";
        apiData.startDate = new Date(`${updatedData.startDate}T${time}:00Z`).toISOString();
      }

      if (updatedData.endDate) {
        const time = updatedData.endTime || "23:59";
        apiData.endDate = new Date(`${updatedData.endDate}T${time}:59Z`).toISOString();
      }

      await AdminService.updateCouponInApi(coupon.id, apiData);
      setIsEditing(false);
      showToast(`Updated campaign settings for ${coupon.code}!`);
      await loadCouponDetail();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to update coupon.";
      showToast(`Error: ${errMsg}`);
    }
  };

  if (isLoading || !coupon) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
        <p className="text-sm font-semibold text-stone-700">Loading coupon details from database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Navigation & Header */}
      <div>
        <Link
          href="/admin/coupons"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Coupons Overview
        </Link>

        <AdminPageHeader
          title={`Campaign: ${coupon.code}`}
          subtitle={coupon.campaignName}
          actions={
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              {isEditing ? (
                <>
                  <Eye className="w-4 h-4 text-amber-600" />
                  <span>View Details</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 text-amber-600" />
                  <span>Edit Coupon</span>
                </>
              )}
            </button>
          }
        />
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
            Editing campaign settings for code <span className="font-mono font-bold">{coupon.code}</span>.
          </div>
          <CouponForm initialData={coupon} onSubmit={handleUpdateCoupon} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Campaign Overview & Analytics */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-extrabold text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-xl text-base">
                    {coupon.code}
                  </span>
                  <CouponStatusBadge status={coupon.status} />
                </div>
                <div className="text-xs text-stone-400">Created by {coupon.createdBy}</div>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900">{coupon.campaignName}</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{coupon.description}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                <div>
                  <div className="text-stone-400 font-medium">Discount Offer</div>
                  <div className="font-extrabold text-amber-700 text-sm mt-0.5">
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.value}% OFF`
                      : coupon.discountType === "FIXED_AMOUNT"
                      ? `₹${coupon.value} OFF`
                      : "FREE SHIPPING"}
                  </div>
                </div>

                <div>
                  <div className="text-stone-400 font-medium">Min Order</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    ₹{coupon.minOrderValue.toLocaleString("en-IN")}
                  </div>
                </div>

                <div>
                  <div className="text-stone-400 font-medium">Total Redemptions</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {coupon.usageCount} / {coupon.usageLimit}
                  </div>
                </div>

                <div>
                  <div className="text-stone-400 font-medium">Applicability</div>
                  <div className="font-bold text-emerald-700 text-sm mt-0.5">
                    {coupon.applicability.replace(/_/g, " ")}
                  </div>
                </div>
              </div>

              {/* Applicable Categories */}
              {coupon.applicableCategories.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-stone-500">Applicable Categories:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {coupon.applicableCategories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Analytics */}
            <CouponAnalytics />
          </div>

          {/* Timeline Audit Log */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-display">Campaign Audit Log</h3>
                <p className="text-xs text-stone-500">Lifecycle timeline of code modifications</p>
              </div>

              <div className="space-y-3 relative pl-4 border-l-2 border-amber-200">
                {coupon.timeline.map((evt, idx) => (
                  <div key={evt.id || idx} className="relative text-xs space-y-0.5">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-600 ring-4 ring-white" />
                    <div className="font-bold text-stone-900">{evt.title}</div>
                    <div className="text-stone-600">{evt.description}</div>
                    <div className="text-[10px] text-stone-400">
                      {evt.timestamp} • by {evt.actor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
