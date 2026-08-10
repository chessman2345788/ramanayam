"use client";

import React from "react";
import { Eye, Star, Flame, Sparkles, TrendingUp } from "lucide-react";
import { ProductStatus } from "../../types/product.types";

interface VisibilityCardProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function VisibilityCard({ formData, onChange }: VisibilityCardProps) {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <h3 className="font-serif font-bold text-base text-[#7A1F1F] border-b border-black/6 pb-2">
        Publishing & Feature Flags
      </h3>

      {/* Status Selection */}
      <div>
        <label className="block text-xs font-semibold text-[#171717] mb-1">
          Catalog Publishing Status
        </label>
        <select
          value={formData.status || "Active"}
          onChange={(e) => onChange("status", e.target.value as ProductStatus)}
          className="w-full h-10 px-3 font-semibold text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
        >
          <option value="Active">Active (Visible in Store)</option>
          <option value="Draft">Draft (Hidden in Admin)</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Archived">Archived (Unlisted)</option>
        </select>
      </div>

      {/* Feature Flags Checkboxes */}
      <div className="space-y-2.5 pt-2">
        <label className="block text-xs font-semibold text-[#171717]">
          Storefront Badges & Showcase Flags
        </label>

        <label className="flex items-center gap-2.5 p-2 bg-[#FAF8F3] border border-black/5 rounded-xl text-xs font-medium cursor-pointer hover:bg-white transition-colors">
          <input
            type="checkbox"
            checked={!!formData.isFeatured}
            onChange={(e) => onChange("isFeatured", e.target.checked)}
            className="rounded text-[#F57C00] focus:ring-[#F57C00]"
          />
          <Star className="w-4 h-4 text-[#D4AF37]" />
          <span>Showcase in Featured Collection</span>
        </label>

        <label className="flex items-center gap-2.5 p-2 bg-[#FAF8F3] border border-black/5 rounded-xl text-xs font-medium cursor-pointer hover:bg-white transition-colors">
          <input
            type="checkbox"
            checked={!!formData.isBestSeller}
            onChange={(e) => onChange("isBestSeller", e.target.checked)}
            className="rounded text-[#F57C00] focus:ring-[#F57C00]"
          />
          <Flame className="w-4 h-4 text-[#F57C00]" />
          <span>Mark as Best Seller</span>
        </label>

        <label className="flex items-center gap-2.5 p-2 bg-[#FAF8F3] border border-black/5 rounded-xl text-xs font-medium cursor-pointer hover:bg-white transition-colors">
          <input
            type="checkbox"
            checked={!!formData.isNewArrival}
            onChange={(e) => onChange("isNewArrival", e.target.checked)}
            className="rounded text-[#F57C00] focus:ring-[#F57C00]"
          />
          <Sparkles className="w-4 h-4 text-[#7A1F1F]" />
          <span>Mark as New Arrival</span>
        </label>

        <label className="flex items-center gap-2.5 p-2 bg-[#FAF8F3] border border-black/5 rounded-xl text-xs font-medium cursor-pointer hover:bg-white transition-colors">
          <input
            type="checkbox"
            checked={!!formData.isTrending}
            onChange={(e) => onChange("isTrending", e.target.checked)}
            className="rounded text-[#F57C00] focus:ring-[#F57C00]"
          />
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Highlight as Trending Item</span>
        </label>
      </div>
    </div>
  );
}
