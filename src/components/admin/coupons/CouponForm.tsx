"use client";

import React, { useState, useEffect } from "react";
import { Tag, Sparkles, AlertCircle, CheckCircle2, Save, Wand2 } from "lucide-react";
import { AdminCouponDetail, FestivalTemplate, DiscountType, ApplicabilityType, CouponStatus } from "@/data/mockCouponsData";
import { DiscountTypeSelector } from "./DiscountTypeSelector";
import { ApplicabilitySelector } from "./ApplicabilitySelector";
import { CouponPreview } from "./CouponPreview";

interface CouponFormProps {
  prefilledTemplate?: FestivalTemplate | null;
  initialData?: AdminCouponDetail | null;
  onSubmit: (formData: Partial<AdminCouponDetail>) => void;
}

export interface FormErrors {
  code?: string;
  campaignName?: string;
  value?: string;
  minOrderValue?: string;
  maxDiscount?: string;
  usageLimit?: string;
  perCustomerLimit?: string;
  dateRange?: string;
}

export function CouponForm({ prefilledTemplate, initialData, onSubmit }: CouponFormProps) {
  const [code, setCode] = useState(initialData?.code || prefilledTemplate?.recommendedCode || "");
  const [campaignName, setCampaignName] = useState(initialData?.campaignName || prefilledTemplate?.campaignName || "");
  const [description, setDescription] = useState(initialData?.description || prefilledTemplate?.description || "");
  const [discountType, setDiscountType] = useState<DiscountType>(initialData?.discountType || prefilledTemplate?.discountType || "PERCENTAGE");
  const [value, setValue] = useState<number>(initialData?.value ?? prefilledTemplate?.value ?? 20);
  const [maxDiscount, setMaxDiscount] = useState<number>(initialData?.maxDiscount ?? 1000);
  const [minOrderValue, setMinOrderValue] = useState<number>(initialData?.minOrderValue ?? prefilledTemplate?.minOrderValue ?? 999);
  
  const [usageLimit, setUsageLimit] = useState<number>(initialData?.usageLimit ?? 1000);
  const [perCustomerLimit, setPerCustomerLimit] = useState<number>(initialData?.perCustomerLimit ?? 1);
  const [applicability, setApplicability] = useState<ApplicabilityType>(initialData?.applicability || "ENTIRE_STORE");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData?.applicableCategories || ["Brass Diyas & Lamps"]);

  const [startDate, setStartDate] = useState(initialData?.startDate || new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(initialData?.startTime || "00:00");
  const [endDate, setEndDate] = useState(initialData?.endDate || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10));
  const [endTime, setEndTime] = useState(initialData?.endTime || "23:59");
  const [timezone, setTimezone] = useState(initialData?.timezone || "Asia/Kolkata (IST)");
  const [status, setStatus] = useState<CouponStatus>(initialData?.status || "ACTIVE");

  const [errors, setErrors] = useState<FormErrors>({});

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

  const handleGenerateCode = () => {
    const prefixes = ["RAM", "FEST", "DIVINE", "PUJA", "BLESS"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    setCode(`${randomPrefix}${randomNum}`);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!code.trim()) {
      newErrors.code = "Coupon code is required.";
    } else if (code.trim().length < 3) {
      newErrors.code = "Coupon code must be at least 3 characters.";
    }

    if (!campaignName.trim()) {
      newErrors.campaignName = "Campaign name is required.";
    }

    if (value <= 0) {
      newErrors.value = "Discount value must be greater than 0.";
    } else if (discountType === "PERCENTAGE" && value > 100) {
      newErrors.value = "Percentage discount cannot exceed 100%.";
    }

    if (minOrderValue < 0) {
      newErrors.minOrderValue = "Minimum order value cannot be negative.";
    }

    if (maxDiscount < 0) {
      newErrors.maxDiscount = "Maximum discount cannot be negative.";
    }

    if (usageLimit <= 0) {
      newErrors.usageLimit = "Total usage limit must be at least 1.";
    }

    if (perCustomerLimit <= 0) {
      newErrors.perCustomerLimit = "Per-customer usage limit must be at least 1.";
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.dateRange = "Expiry date cannot be earlier than start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      code: code.trim().toUpperCase(),
      campaignName: campaignName.trim(),
      description: description.trim(),
      discountType,
      value,
      maxDiscount,
      minOrderValue,
      usageLimit,
      perCustomerLimit,
      applicability,
      applicableCategories: selectedCategories,
      startDate,
      startTime,
      endDate,
      endTime,
      timezone,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Form Sections */}
      <div className="lg:col-span-8 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <Tag className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">1. Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Code */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Coupon Code *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SAVE20"
                  className="w-full pr-10 pl-3 py-2 text-xs font-mono font-bold bg-stone-50 border border-stone-200 rounded-xl uppercase text-amber-800 outline-none focus:border-amber-600"
                />
                <button
                  type="button"
                  onClick={handleGenerateCode}
                  title="Generate Random Code"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-amber-700 transition-colors"
                >
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
              {errors.code && <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.code}</p>}
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. Diwali Mahotsav Special"
                className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
              />
              {errors.campaignName && <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.campaignName}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain promotion offer terms..."
              className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600 resize-none"
            />
          </div>

          {/* Discount Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">Discount Type</label>
            <DiscountTypeSelector value={discountType} onChange={setDiscountType} />
          </div>

          {/* Value Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Discount Value ({discountType === "PERCENTAGE" ? "%" : "₹"}) *
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                min={1}
                max={discountType === "PERCENTAGE" ? 100 : 100000}
                className="w-full px-3 py-2 text-xs font-bold bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
              />
              {errors.value && <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.value}</p>}
            </div>

            {discountType === "PERCENTAGE" && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Maximum Discount Cap (₹)
                </label>
                <input
                  type="number"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(Number(e.target.value))}
                  placeholder="e.g. 1000"
                  className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Usage Limits */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">2. Usage & Minimum Order Limits</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Minimum Order Value (₹)</label>
              <input
                type="number"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(Number(e.target.value))}
                min={0}
                className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Total Usage Limit</label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Per Customer Limit</label>
              <input
                type="number"
                value={perCustomerLimit}
                onChange={(e) => setPerCustomerLimit(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Applicability */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <Tag className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">3. Applicability Scope</h3>
          </div>

          <ApplicabilitySelector
            value={applicability}
            onChange={setApplicability}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
          />
        </div>

        {/* Schedule & Status */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-stone-900 font-display">4. Schedule & Initial Status</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Start Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-24 px-2 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Expiry Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-24 px-2 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {errors.dateRange && (
            <p className="text-[11px] text-rose-600 font-medium">{errors.dateRange}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Timezone</label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Campaign Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CouponStatus)}
                className="w-full px-3 py-2 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600 cursor-pointer"
              >
                <option value="ACTIVE">Active (Live immediately)</option>
                <option value="SCHEDULED">Scheduled (Launch on start date)</option>
                <option value="DRAFT">Draft (Saved internally)</option>
                <option value="DISABLED">Disabled (Inactive)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Coupon</span>
          </button>
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="lg:col-span-4 space-y-4">
        <div className="sticky top-6 space-y-4">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Live Customer Preview
          </h3>

          <CouponPreview
            code={code}
            campaignName={campaignName}
            description={description}
            discountType={discountType}
            value={value}
            minOrderValue={minOrderValue}
            endDate={endDate}
          />
        </div>
      </div>
    </form>
  );
}
