"use client";

import React from "react";
import { Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { ProductVariant } from "../../types/product.types";

interface VariantEditorProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

export function VariantEditor({ variants, onChange }: VariantEditorProps) {
  const handleAddVariant = () => {
    const newIndex = variants.length + 1;
    const isFirst = variants.length === 0;
    const newVar: ProductVariant = {
      id: `var-${Date.now()}`,
      name: `Option ${newIndex}`,
      variantName: `Option ${newIndex}`,
      sku: `RAM-VAR-${newIndex}-${Date.now().toString().slice(-4)}`,
      price: 0,
      compareAtPrice: 0,
      stock: 25,
      isDefault: isFirst,
      isActive: true,
      needsPricing: false,
      attributes: { unit: "" },
    };
    onChange([...variants, newVar]);
  };

  const handleUpdateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    onChange(
      variants.map((v) => {
        if (v.id !== id) return v;
        const updated = { ...v, [field]: value };
        if (field === "name") {
          updated.variantName = value;
        }
        return updated;
      })
    );
  };

  const handleUpdateAttribute = (id: string, attrKey: string, attrValue: string) => {
    onChange(
      variants.map((v) => {
        if (v.id !== id) return v;
        const attributes = { ...(v.attributes || {}), [attrKey]: attrValue };
        return { ...v, attributes };
      })
    );
  };

  const handleSetDefault = (id: string) => {
    onChange(
      variants.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
  };

  const handleDeleteVariant = (id: string) => {
    const remaining = variants.filter((v) => v.id !== id);
    if (remaining.length > 0 && !remaining.some((v) => v.isDefault)) {
      remaining[0].isDefault = true;
    }
    onChange(remaining);
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-black/6 pb-2">
        <div>
          <h3 className="font-serif font-bold text-base text-[#7A1F1F]">
            Product Variants & Options
          </h3>
          <p className="text-xs text-[#666666]">
            Configure multi-size, weight, material, or pack options with per-variant prices and SKUs
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddVariant}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F57C00]/10 text-[#F57C00] hover:bg-[#F57C00]/20 font-semibold rounded-xl text-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Option / Variant
        </button>
      </div>

      {variants.length === 0 ? (
        <div className="p-6 text-center text-xs text-[#999999] border border-dashed border-black/10 rounded-xl">
          No variants configured. Click "Add Option / Variant" to define sizes, weights, or packaging.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#555555]">
            <thead className="bg-[#FAF8F3] text-[#7A1F1F] font-semibold border-y border-black/6">
              <tr>
                <th className="py-2.5 px-3">Default</th>
                <th className="py-2.5 px-3">Variant Name</th>
                <th className="py-2.5 px-3">Unit / Attribute</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Selling Price (₹)</th>
                <th className="py-2.5 px-3">MRP (₹)</th>
                <th className="py-2.5 px-3">Stock</th>
                <th className="py-2.5 px-3">Needs Pricing</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/4">
              {variants.map((v) => (
                <tr key={v.id} className={v.isDefault ? "bg-[#FAF8F3]/60" : ""}>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleSetDefault(v.id)}
                      title={v.isDefault ? "Default Variant" : "Click to make Default"}
                      className={`p-1 rounded-full transition-colors ${
                        v.isDefault ? "text-[#E8660A]" : "text-black/20 hover:text-black/50"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={v.variantName || v.name || ""}
                      onChange={(e) => handleUpdateVariant(v.id, "name", e.target.value)}
                      placeholder="e.g. 250g, Size 4, Brass"
                      className="w-full min-w-[120px] h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] focus:outline-none focus:border-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={v.attributes?.unit || ""}
                      onChange={(e) => handleUpdateAttribute(v.id, "unit", e.target.value)}
                      placeholder="e.g. per 250g"
                      className="w-full min-w-[100px] h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] focus:outline-none focus:border-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={v.sku || ""}
                      onChange={(e) => handleUpdateVariant(v.id, "sku", e.target.value)}
                      placeholder="SKU"
                      className="w-full min-w-[130px] h-8 px-2 font-mono text-[11px] bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] focus:outline-none focus:border-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={v.price || ""}
                      onChange={(e) => handleUpdateVariant(v.id, "price", Number(e.target.value))}
                      placeholder="0"
                      className="w-20 h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] font-semibold focus:outline-none focus:border-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={v.compareAtPrice || ""}
                      onChange={(e) => handleUpdateVariant(v.id, "compareAtPrice", Number(e.target.value))}
                      placeholder="MRP"
                      className="w-20 h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] focus:outline-none focus:border-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={v.stock !== undefined ? v.stock : ""}
                      onChange={(e) => handleUpdateVariant(v.id, "stock", Number(e.target.value))}
                      placeholder="Stock"
                      className="w-16 h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] focus:outline-none focus:border-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={Boolean(v.needsPricing)}
                      onChange={(e) => handleUpdateVariant(v.id, "needsPricing", e.target.checked)}
                      className="w-4 h-4 text-[#E8660A] rounded border-black/20 focus:ring-[#E8660A]"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteVariant(v.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
