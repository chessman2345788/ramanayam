"use client";

import React from "react";
import { Store, Package, Tag, Layers, Users } from "lucide-react";
import { ApplicabilityType } from "@/data/mockCouponsData";

interface ApplicabilitySelectorProps {
  value: ApplicabilityType;
  onChange: (applicability: ApplicabilityType) => void;
  selectedCategories?: string[];
  onCategoriesChange?: (cats: string[]) => void;
  selectedProducts?: string[];
  onProductsChange?: (prods: string[]) => void;
}

export function ApplicabilitySelector({
  value,
  onChange,
  selectedCategories = [],
  onCategoriesChange,
  selectedProducts = [],
  onProductsChange,
}: ApplicabilitySelectorProps) {
  const options = [
    {
      id: "ENTIRE_STORE" as ApplicabilityType,
      title: "Entire Store",
      desc: "Applies to all products across Ramanayam",
      icon: Store,
    },
    {
      id: "SPECIFIC_CATEGORIES" as ApplicabilityType,
      title: "Specific Categories",
      desc: "Restrict to selected temple product categories",
      icon: Tag,
    },
    {
      id: "SPECIFIC_PRODUCTS" as ApplicabilityType,
      title: "Specific Products",
      desc: "Restrict to specific catalog items",
      icon: Package,
    },
    {
      id: "SPECIFIC_COLLECTIONS" as ApplicabilityType,
      title: "Specific Collections",
      desc: "Festival or seasonal catalog collections",
      icon: Layers,
    },
    {
      id: "SPECIFIC_CUSTOMERS" as ApplicabilityType,
      title: "Specific Customers",
      desc: "VIP or selected customer groups",
      icon: Users,
    },
  ];

  const availableCategories = [
    "Brass Diyas & Lamps",
    "Mala & Rudraksha Beads",
    "Puja Utensils & Sets",
    "Incense & Pure Dhoop",
    "Sacred Food & Prasadam",
    "Temple Decor & Idols",
  ];

  const handleToggleCategory = (cat: string) => {
    if (!onCategoriesChange) return;
    if (selectedCategories.includes(cat)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoriesChange([...selectedCategories, cat]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                isSelected
                  ? "bg-amber-50/60 border-amber-600 ring-1 ring-amber-600 shadow-2xs"
                  : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${
                  isSelected ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-600"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">{opt.title}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">{opt.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Conditional category selection tags */}
      {value === "SPECIFIC_CATEGORIES" && (
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <label className="block text-xs font-semibold text-stone-700">
            Select Applicable Categories:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => {
              const isChecked = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleToggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isChecked
                      ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
