"use client";

import React from "react";
import { Percent, IndianRupee, Package, Tag, Truck } from "lucide-react";
import { DiscountType } from "@/data/mockCouponsData";

interface DiscountTypeSelectorProps {
  value: DiscountType;
  onChange: (type: DiscountType) => void;
}

export function DiscountTypeSelector({ value, onChange }: DiscountTypeSelectorProps) {
  const options = [
    {
      id: "PERCENTAGE" as DiscountType,
      title: "Percentage Discount",
      desc: "Apply a % reduction to order subtotal",
      icon: Percent,
    },
    {
      id: "FIXED_AMOUNT" as DiscountType,
      title: "Fixed Amount Discount",
      desc: "Deduct a flat ₹ rupee amount",
      icon: IndianRupee,
    },
    {
      id: "PRODUCT_SPECIFIC" as DiscountType,
      title: "Product Specific",
      desc: "Discount applicable to selected items only",
      icon: Package,
    },
    {
      id: "CATEGORY_SPECIFIC" as DiscountType,
      title: "Category Specific",
      desc: "Discount for specific temple categories",
      icon: Tag,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
              isSelected
                ? "bg-amber-50/60 border-amber-600 ring-1 ring-amber-600 shadow-2xs"
                : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
            }`}
          >
            <div
              className={`p-2 rounded-lg shrink-0 ${
                isSelected ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-600"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">{opt.title}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
