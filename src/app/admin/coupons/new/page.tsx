"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FestivalTemplates } from "@/components/admin/coupons/FestivalTemplates";
import { CouponForm } from "@/components/admin/coupons/CouponForm";
import { FestivalTemplate, AdminCouponDetail } from "@/data/mockCouponsData";

export default function CreateCouponPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<FestivalTemplate | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSelectTemplate = (template: FestivalTemplate) => {
    setSelectedTemplate(template);
    showToast(`Loaded prefilled rules for ${template.festivalName} (${template.recommendedCode})`);
  };

  const handleFormSubmit = (formData: Partial<AdminCouponDetail>) => {
    showToast(`Successfully created coupon campaign ${formData.code}!`);
    setTimeout(() => {
      router.push("/admin/coupons");
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#171717",
            color: "#FFFFFF",
            padding: "12px 18px",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 100,
          }}
        >
          <CheckCircle2 size={16} style={{ color: "#F57C00" }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Navigation & Header */}
      <div>
        <Link
          href="/admin/coupons"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#666666",
            textDecoration: "none",
            marginBottom: 12,
          }}
        >
          <ArrowLeft size={14} /> Back to Coupons Overview
        </Link>

        <AdminPageHeader
          title="Create New Coupon"
          subtitle="Set up a new discount code or launch a festival promotional campaign."
        />
      </div>

      {/* Festival Templates Bar */}
      <FestivalTemplates onSelectTemplate={handleSelectTemplate} />

      {/* Main Coupon Creation Form */}
      <CouponForm prefilledTemplate={selectedTemplate} onSubmit={handleFormSubmit} />
    </div>
  );
}
