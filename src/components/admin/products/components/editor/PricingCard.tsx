"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

interface PricingCardProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function PricingCard({ formData, onChange }: PricingCardProps) {
  const price = Number(formData.price || 0);
  const mrp = Number(formData.mrp || 0);
  const costPrice = Number(formData.costPrice || 0);

  const profit = price > costPrice ? price - costPrice : 0;
  const marginPercentage = price > 0 ? ((profit / price) * 100).toFixed(1) : "0";
  const discountPercentage = mrp > price ? (((mrp - price) / mrp) * 100).toFixed(0) : "0";

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <h3 className="font-serif font-bold text-base text-[#7A1F1F] border-b border-black/6 pb-2">
        Pricing & Taxes
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Selling Price */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Selling Price (INR ₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.price || ""}
            onChange={(e) => onChange("price", Number(e.target.value))}
            placeholder="1250"
            className="w-full h-10 px-3 font-semibold text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>

        {/* Maximum Retail Price (MRP) */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            M.R.P. (List Price ₹)
          </label>
          <input
            type="number"
            value={formData.mrp || ""}
            onChange={(e) => onChange("mrp", Number(e.target.value))}
            placeholder="1800"
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>

        {/* GST Tax Rate */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            GST Tax Scribe (%)
          </label>
          <select
            value={formData.gstRate ?? 12}
            onChange={(e) => onChange("gstRate", Number(e.target.value))}
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:border-[#F57C00]"
          >
            <option value={0}>0% (Exempt)</option>
            <option value={5}>5% GST</option>
            <option value={12}>12% GST</option>
            <option value={18}>18% GST</option>
            <option value={28}>28% GST</option>
          </select>
        </div>

        {/* Cost Per Item */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Cost Price Per Item (₹)
          </label>
          <input
            type="number"
            value={formData.costPrice || ""}
            onChange={(e) => onChange("costPrice", Number(e.target.value))}
            placeholder="650"
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>
      </div>

      {/* Margin & Discount Calculation Box */}
      <div className="p-3 bg-[#FAF8F3] border border-black/6 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#7A1F1F] font-semibold">
          <TrendingUp className="w-4 h-4 text-[#F57C00]" />
          <span>Estimated Profit Margin:</span>
          <span className="text-emerald-700 font-bold">{marginPercentage}% (₹{profit})</span>
        </div>

        {Number(discountPercentage) > 0 && (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F57C00]/10 text-[#F57C00] rounded-full">
            {discountPercentage}% Off MRP
          </span>
        )}
      </div>
    </div>
  );
}
