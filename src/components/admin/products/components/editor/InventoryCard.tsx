"use client";

import React from "react";
import { Boxes } from "lucide-react";

interface InventoryCardProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function InventoryCard({ formData, onChange }: InventoryCardProps) {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-black/6 pb-2">
        <h3 className="font-serif font-bold text-base text-[#7A1F1F]">
          Inventory & Stock Management
        </h3>
        <span className="text-[11px] font-semibold text-[#666666] flex items-center gap-1">
          <Boxes className="w-3.5 h-3.5 text-[#F57C00]" />
          Tracked Stock
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SKU */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            SKU Code (Stock Keeping Unit) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.sku || ""}
            onChange={(e) => onChange("sku", e.target.value)}
            placeholder="RM-BRS-04"
            className="w-full h-10 px-3 font-mono text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>

        {/* Barcode */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Barcode / EAN / ISBN
          </label>
          <input
            type="text"
            value={formData.barcode || ""}
            onChange={(e) => onChange("barcode", e.target.value)}
            placeholder="890482910401"
            className="w-full h-10 px-3 font-mono text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>

        {/* Available Stock */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Available Quantity in Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.stock ?? 10}
            onChange={(e) => onChange("stock", Number(e.target.value))}
            placeholder="25"
            className="w-full h-10 px-3 font-semibold text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
        </div>

        {/* Low Stock Threshold Limit */}
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Low Stock Threshold Trigger
          </label>
          <input
            type="number"
            value={formData.lowStockLimit ?? 10}
            onChange={(e) => onChange("lowStockLimit", Number(e.target.value))}
            placeholder="10"
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
          />
          <p className="text-[10px] text-[#999999] mt-1">
            Sends automated low-inventory alerts when stock drops below this number.
          </p>
        </div>
      </div>
    </div>
  );
}
