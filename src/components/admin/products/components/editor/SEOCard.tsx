"use client";

import React from "react";
import { Globe, Search } from "lucide-react";

interface SEOCardProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function SEOCard({ formData, onChange }: SEOCardProps) {
  const title = formData.seoTitle || formData.name || "Product Title — Ramanayam";
  const slug = formData.slug || "product-permalink";
  const desc =
    formData.seoDescription ||
    formData.shortDesc ||
    "Authentic temple e-commerce product handcrafted by traditional artisans.";

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-black/6 pb-2">
        <h3 className="font-serif font-bold text-base text-[#7A1F1F]">
          Search Engine Optimization (SEO)
        </h3>
        <span className="text-[11px] font-semibold text-[#666666] flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#F57C00]" />
          Search Visibility
        </span>
      </div>

      {/* Google SERP Live Snippet Preview Box */}
      <div className="p-4 bg-[#FAF8F3] border border-black/10 rounded-xl space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] text-[#202124]">
          <Search className="w-3 h-3 text-[#70757a]" />
          <span className="text-[#202124]">https://ramanayam.com › products › {slug}</span>
        </div>
        <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
          {title}
        </h4>
        <p className="text-xs text-[#4d5156] line-clamp-2 leading-snug">
          {desc}
        </p>
      </div>

      {/* SEO Form Inputs */}
      <div className="space-y-3 pt-1">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-[#171717]">
              Meta SEO Title
            </label>
            <span className="text-[10px] text-[#999999]">{title.length} / 60 chars</span>
          </div>
          <input
            type="text"
            value={formData.seoTitle || ""}
            onChange={(e) => onChange("seoTitle", e.target.value)}
            placeholder="Buy Handcrafted Pure Brass Diya Lamp Online | Ramanayam"
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-[#171717]">
              Meta Description
            </label>
            <span className="text-[10px] text-[#999999]">{desc.length} / 160 chars</span>
          </div>
          <textarea
            rows={2}
            value={formData.seoDescription || ""}
            onChange={(e) => onChange("seoDescription", e.target.value)}
            placeholder="Authentic temple brass diyas for home worship. Hand-engraved by artisans..."
            className="w-full p-2.5 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>
      </div>
    </div>
  );
}
