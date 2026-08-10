"use client";

import React, { useState, useEffect } from "react";
import { Tag, ShieldAlert, Users, Calendar, Sparkles } from "lucide-react";
import {
  AdminCouponDetail,
  DiscountType,
  CustomerTypeEligibility,
  FestivalTemplate,
} from "@/data/mockCouponsData";

interface CouponFormProps {
  initialData?: Partial<AdminCouponDetail>;
  prefilledTemplate?: FestivalTemplate | null;
  onSubmit: (formData: Partial<AdminCouponDetail>) => void;
}

export function CouponForm({ initialData, prefilledTemplate, onSubmit }: CouponFormProps) {
  const [code, setCode] = useState(initialData?.code || "");
  const [campaignName, setCampaignName] = useState(initialData?.campaignName || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [discountType, setDiscountType] = useState<DiscountType>(initialData?.discountType || "PERCENTAGE");
  const [value, setValue] = useState<number>(initialData?.value || 20);
  const [maxDiscount, setMaxDiscount] = useState<number>(initialData?.maxDiscount || 1000);
  const [minOrderValue, setMinOrderValue] = useState<number>(initialData?.minOrderValue || 999);
  const [usageLimit, setUsageLimit] = useState<number>(initialData?.usageLimit || 1000);
  const [perCustomerLimit, setPerCustomerLimit] = useState<number>(initialData?.perCustomerLimit || 1);
  const [customerEligibility, setCustomerEligibility] = useState<CustomerTypeEligibility>(
    initialData?.customerEligibility || "ALL"
  );
  const [startDate, setStartDate] = useState(initialData?.startDate || "2026-08-10");
  const [endDate, setEndDate] = useState(initialData?.endDate || "2026-08-25");
  const [applicableCategories, setApplicableCategories] = useState<string>(
    initialData?.applicableCategories?.join(", ") || "Brass Diyas & Lamps, Sacred Food & Prasadam"
  );

  // Auto prefill if festival template selected
  useEffect(() => {
    if (prefilledTemplate) {
      setCode(prefilledTemplate.recommendedCode);
      setCampaignName(prefilledTemplate.campaignName);
      setDescription(prefilledTemplate.description);
      setDiscountType(prefilledTemplate.discountType);
      setValue(prefilledTemplate.value);
      setMinOrderValue(prefilledTemplate.minOrderValue);
    }
  }, [prefilledTemplate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      code: code.toUpperCase(),
      campaignName,
      description,
      discountType,
      value,
      maxDiscount,
      minOrderValue,
      usageLimit,
      perCustomerLimit,
      customerEligibility,
      startDate,
      endDate,
      applicableCategories: applicableCategories.split(",").map((s) => s.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* General Section */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 10 }}>
          <Tag size={16} style={{ color: "#F57C00" }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>1. General Details</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Campaign Name *</label>
            <input
              type="text"
              required
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Diwali Mahotsav Sale"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Coupon Code *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. DIWALI2026"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-jetbrains, monospace)", color: "#F57C00", background: "#FAF8F3", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. 30% OFF on all brass oil lamps during festival period"
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Discount Type</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as DiscountType)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FIXED_AMOUNT">Flat Amount (₹)</option>
              <option value="FREE_SHIPPING">Free Shipping</option>
              <option value="BUY_X_GET_Y">Buy X Get Y (UI Ready)</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>
              Discount Value {discountType === "PERCENTAGE" ? "(%)" : "(₹)"}
            </label>
            <input
              type="number"
              disabled={discountType === "FREE_SHIPPING"}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>
        </div>
      </div>

      {/* Rules Section */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 10 }}>
          <ShieldAlert size={16} style={{ color: "#701A75" }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>2. Rules & Limitations</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Minimum Order Value (₹)</label>
            <input
              type="number"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(Number(e.target.value))}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Maximum Discount Limit (₹)</label>
            <input
              type="number"
              value={maxDiscount}
              onChange={(e) => setMaxDiscount(Number(e.target.value))}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Total Usage Limit</label>
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(Number(e.target.value))}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Per Customer Usage Limit</label>
            <input
              type="number"
              value={perCustomerLimit}
              onChange={(e) => setPerCustomerLimit(Number(e.target.value))}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Applicable Categories (Comma separated)</label>
          <input
            type="text"
            value={applicableCategories}
            onChange={(e) => setApplicableCategories(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
          />
        </div>
      </div>

      {/* Customer Eligibility & Schedule Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {/* Customer Eligibility */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 10 }}>
            <Users size={16} style={{ color: "#16A34A" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#171717", margin: 0 }}>3. Customer Eligibility</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { id: "ALL", label: "All Customers" },
              { id: "NEW", label: "New Devotees Only" },
              { id: "RETURNING", label: "Returning Buyers" },
              { id: "VIP", label: "VIP Patrons" },
            ].map((option) => (
              <label
                key={option.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: customerEligibility === option.id ? "rgba(245,124,0,0.08)" : "#FAF8F3",
                }}
              >
                <input
                  type="radio"
                  name="eligibility"
                  checked={customerEligibility === option.id}
                  onChange={() => setCustomerEligibility(option.id as CustomerTypeEligibility)}
                  style={{ accentColor: "#F57C00" }}
                />
                <span style={{ fontWeight: customerEligibility === option.id ? 700 : 400 }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 10 }}>
            <Calendar size={16} style={{ color: "#0284C7" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#171717", margin: 0 }}>4. Campaign Schedule</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 24px",
            borderRadius: 10,
            border: "none",
            background: "#F57C00",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(245,124,0,0.25)",
          }}
        >
          <Sparkles size={16} /> Save & Activate Campaign
        </button>
      </div>
    </form>
  );
}
