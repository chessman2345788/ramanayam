"use client";

import React from "react";
import { Plus, Trash2, Layers } from "lucide-react";
import { ProductVariant } from "../../types/product.types";

interface VariantEditorProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

export function VariantEditor({ variants, onChange }: VariantEditorProps) {
  const handleAddVariant = () => {
    const newVar: ProductVariant = {
      id: `var-${Date.now()}`,
      name: `Variant ${variants.length + 1}`,
      sku: `SKU-VAR-${variants.length + 1}`,
      price: 0,
      stock: 10,
    };
    onChange([...variants, newVar]);
  };

  const handleUpdateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    onChange(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleDeleteVariant = (id: string) => {
    onChange(variants.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-black/6 pb-2">
        <div>
          <h3 className="font-serif font-bold text-base text-[#7A1F1F]">
            Product Variants & Options
          </h3>
          <p className="text-xs text-[#666666]">
            Configure multi-size, weight, or material options for this product
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddVariant}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F57C00]/10 text-[#F57C00] hover:bg-[#F57C00]/20 font-semibold rounded-xl text-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Variant
        </button>
      </div>

      {variants.length === 0 ? (
        <div className="p-6 text-center text-xs text-[#999999] border border-dashed border-black/10 rounded-xl">
          No variants created. Click "Add Variant" if this product has size or weight options.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#555555]">
            <thead className="bg-[#FAF8F3] text-[#7A1F1F] font-semibold border-y border-black/6">
              <tr>
                <th className="py-2.5 px-3">Variant Name</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Price (₹)</th>
                <th className="py-2.5 px-3">Stock</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/4">
              {variants.map((v) => (
                <tr key={v.id}>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={v.name}
                      onChange={(e) => handleUpdateVariant(v.id, "name", e.target.value)}
                      placeholder="e.g. Large (8 inch)"
                      className="w-full h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={v.sku}
                      onChange={(e) => handleUpdateVariant(v.id, "sku", e.target.value)}
                      placeholder="SKU"
                      className="w-full h-8 px-2 font-mono text-[11px] bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={v.price || ""}
                      onChange={(e) => handleUpdateVariant(v.id, "price", Number(e.target.value))}
                      placeholder="Price"
                      className="w-24 h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={v.stock || ""}
                      onChange={(e) => handleUpdateVariant(v.id, "stock", Number(e.target.value))}
                      placeholder="Stock"
                      className="w-20 h-8 px-2 bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717]"
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
