"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FestivalTemplates } from "@/components/admin/coupons/FestivalTemplates";
import { CouponForm } from "@/components/admin/coupons/CouponForm";
import { FestivalTemplate, AdminCouponDetail } from "@/data/mockCouponsData";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function CreateCouponPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<FestivalTemplate | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSelectTemplate = (template: FestivalTemplate) => {
    setSelectedTemplate(template);
    showToast(`Loaded prefilled rules for ${template.festivalName} (${template.recommendedCode})`);
  };

  const handleFormSubmit = async (formData: Partial<AdminCouponDetail>) => {
    if (!formData.code || !formData.value) {
      showToast("Coupon code and discount value are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const code = formData.code.toUpperCase().trim();
      const descParts = [];
      if (formData.campaignName) descParts.push(formData.campaignName);
      if (formData.description) descParts.push(formData.description);

      const apiData: Record<string, any> = {
        code,
        description: descParts.join(" - ") || undefined,
        discountType: formData.discountType === "FIXED_AMOUNT" ? "FIXED" : "PERCENTAGE",
        discountValue: Number(formData.value),
        minOrderAmount: formData.minOrderValue ? Number(formData.minOrderValue) : undefined,
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
        isActive: formData.status !== "DISABLED",
      };

      if (formData.startDate) {
        const time = formData.startTime || "00:00";
        apiData.startDate = new Date(`${formData.startDate}T${time}:00Z`).toISOString();
      }

      if (formData.endDate) {
        const time = formData.endTime || "23:59";
        apiData.endDate = new Date(`${formData.endDate}T${time}:59Z`).toISOString();
      }

      await AdminService.createCouponInApi(apiData);
      showToast(`Successfully created coupon code ${code}!`);
      setTimeout(() => {
        router.push("/admin/coupons");
      }, 1200);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to create coupon.";
      showToast(`Error: ${errMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
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
          title="Create New Coupon"
          subtitle="Configure discount rules, set customer applicability, schedule campaign dates, and preview the coupon."
        />
      </div>

      {/* Festival Templates Quick Start Bar */}
      <FestivalTemplates onSelectTemplate={handleSelectTemplate} />

      {/* Multi-Section Coupon Creation Form with Live Preview */}
      <CouponForm prefilledTemplate={selectedTemplate} onSubmit={handleFormSubmit} />
    </div>
  );
}
