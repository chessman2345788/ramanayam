"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { ProductService } from "@/services/product.service";

interface GeneralCardProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const DEFAULT_CATEGORIES = [
  { id: "c20c95be-bd39-4ebd-bca4-e387a8c20bdb", name: "Puja Brassware" },
  { id: "18fbd5ec-6e36-41b9-b60f-c8fb837c1988", name: "Idols & Murtis" },
  { id: "4972a1e1-64dc-4f39-81a8-eff9496e68a6", name: "Incense & Fragrances" },
  { id: "bea3c548-1675-4ea6-8b52-61f1a96ae8e6", name: "Temple & Home Decor" },
  { id: "fb052d03-ebb5-447b-9d24-836a79a492f7", name: "Samagri & Ritual Kits" },
];

const DEFAULT_VENDORS = [
  { id: "0b989d8b-454a-4325-b305-5f646d8260a1", name: "Moradabad Sacred Brass Guild" },
  { id: "7d8af774-c6f7-4cb8-a380-ef8c27c9548d", name: "Mysore Sandalwood Craft House" },
];

export function GeneralCard({ formData, onChange }: GeneralCardProps) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(DEFAULT_CATEGORIES);
  const [vendors, setVendors] = useState<{ id: string; name: string }[]>(DEFAULT_VENDORS);

  useEffect(() => {
    // Initialize form defaults if empty
    if (!formData.categoryId && DEFAULT_CATEGORIES.length > 0) {
      onChange("categoryId", DEFAULT_CATEGORIES[0].id);
      onChange("category", DEFAULT_CATEGORIES[0].name);
    }
    if (!formData.vendorId && DEFAULT_VENDORS.length > 0) {
      onChange("vendorId", DEFAULT_VENDORS[0].id);
      onChange("vendor", DEFAULT_VENDORS[0].name);
    }

    ProductService.fetchCategoriesFromApi().then((cats) => {
      if (cats && cats.length > 0) {
        setCategories(cats.map((c) => ({ id: c.id, name: c.name })));
        if (!formData.categoryId) {
          const firstCat = cats[0];
          onChange("categoryId", firstCat.id);
          onChange("category", firstCat.name);
        }
      }
    });

    ProductService.fetchVendorsFromApi().then((vends) => {
      if (vends && vends.length > 0) {
        setVendors(vends.map((v) => ({ id: v.id, name: v.name })));
        if (!formData.vendorId) {
          const firstVendor = vends[0];
          onChange("vendorId", firstVendor.id);
          onChange("vendor", firstVendor.name);
        }
      }
    });
  }, []);

  const generateSlug = () => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      onChange("slug", slug);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const catObj = categories.find((c) => c.id === selectedId);
    onChange("categoryId", selectedId);
    if (catObj) {
      onChange("category", catObj.name);
    }
  };

  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const vendObj = vendors.find((v) => v.id === selectedId);
    onChange("vendorId", selectedId);
    if (vendObj) {
      onChange("vendor", vendObj.name);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <h3 className="font-serif font-bold text-base text-[#7A1F1F] border-b border-black/6 pb-2">
        General Information
      </h3>

      {/* Product Name */}
      <div>
        <label className="block text-xs font-semibold text-[#171717] mb-1">
          Product Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g. Handcrafted Pure Brass Diya Lamp"
          className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
        />
      </div>

      {/* Slug with Auto-generate button */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-[#171717]">
            Permalink Slug
          </label>
          <button
            type="button"
            onClick={generateSlug}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#F57C00] hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            Auto Generate
          </button>
        </div>
        <div className="flex items-center">
          <span className="h-10 px-3 bg-[#FAF8F3] border border-r-0 border-black/10 rounded-l-xl text-xs text-[#999999] flex items-center">
            /products/
          </span>
          <input
            type="text"
            value={formData.slug || ""}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="handcrafted-pure-brass-diya-lamp"
            className="w-full h-10 px-3 text-xs bg-white border border-black/10 rounded-r-xl text-[#171717] focus:outline-none focus:border-[#F57C00]"
          />
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-xs font-semibold text-[#171717] mb-1">
          Short Description (Subtitle)
        </label>
        <input
          type="text"
          value={formData.shortDesc || ""}
          onChange={(e) => onChange("shortDesc", e.target.value)}
          placeholder="Brief 1-sentence summary displayed in product cards..."
          className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-xs font-semibold text-[#171717] mb-1">
          Full Description & Ritual Significance
        </label>
        <textarea
          rows={4}
          value={formData.fullDesc || ""}
          onChange={(e) => onChange("fullDesc", e.target.value)}
          placeholder="Detailed product story, craftsmanship, temple origin, and usage instructions..."
          className="w-full p-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:bg-white focus:border-[#F57C00]"
        />
      </div>

      {/* Category & Vendor Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.categoryId || ""}
            onChange={handleCategoryChange}
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:border-[#F57C00]"
          >
            {categories.length === 0 ? (
              <option value="">Loading categories...</option>
            ) : (
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Vendor / Artisan Guild <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.vendorId || ""}
            onChange={handleVendorChange}
            className="w-full h-10 px-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-xl text-[#171717] focus:outline-none focus:border-[#F57C00]"
          >
            {vendors.length === 0 ? (
              <option value="">Loading vendors...</option>
            ) : (
              vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
