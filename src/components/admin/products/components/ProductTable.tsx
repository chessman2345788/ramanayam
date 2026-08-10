"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Edit2, Copy, Eye, Trash2, Archive, MoreVertical } from "lucide-react";
import { Product } from "../types/product.types";
import { StatusBadge } from "./StatusBadge";

interface ProductTableProps {
  products: Product[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onToggleFeatured: (id: string) => void;
  onDelete: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onArchive: (product: Product) => void;
}

export function ProductTable({
  products,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onToggleFeatured,
  onDelete,
  onDuplicate,
  onArchive,
}: ProductTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const isAllSelected =
    products.length > 0 && products.every((p) => selectedIds.includes(p.id));

  return (
    <div className="overflow-x-auto bg-white border border-black/10 rounded-2xl shadow-xs">
      <table className="w-full text-left text-xs text-[#555555]">
        <thead className="bg-[#FAF8F3] text-[#7A1F1F] font-semibold border-b border-black/6">
          <tr>
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                className="rounded text-[#F57C00] focus:ring-[#F57C00] cursor-pointer"
              />
            </th>
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">SKU</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Brand</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-center">Featured</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/4">
          {products.length === 0 ? (
            <tr>
              <td colSpan={10} className="py-12 text-center text-[#999999]">
                No products found matching filters.
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              const primaryImage =
                product.images.find((img) => img.isPrimary)?.url ||
                product.images[0]?.url ||
                "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80";

              return (
                <tr
                  key={product.id}
                  className={`hover:bg-black/2 transition-colors ${
                    isSelected ? "bg-[#F57C00]/[0.03]" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(product.id)}
                      className="rounded text-[#F57C00] focus:ring-[#F57C00] cursor-pointer"
                    />
                  </td>

                  {/* Image + Product Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#FAF8F3] border border-black/10 shrink-0">
                        {/* eslint-disable-next-next/no-img-element */}
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-semibold text-[#171717] hover:text-[#F57C00] transition-colors truncate block"
                        >
                          {product.name}
                        </Link>
                        {product.variants.length > 0 && (
                          <span className="text-[10px] text-[#999999]">
                            {product.variants.length} variants available
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-[#666666]">
                    {product.sku}
                  </td>
                  <td className="py-3 px-4 text-[#666666]">{product.category}</td>
                  <td className="py-3 px-4 text-[#666666]">{product.brand}</td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#171717]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-[10px] text-[#999999] line-through ml-1.5">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4 font-semibold text-[#171717]">
                    {product.stock} units
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <StatusBadge status={product.status} />
                  </td>

                  {/* Featured Star */}
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleFeatured(product.id)}
                      className="p-1 hover:bg-black/5 rounded-full transition-colors"
                      title={product.isFeatured ? "Unmark featured" : "Mark as featured"}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          product.isFeatured
                            ? "fill-[#D4AF37] text-[#D4AF37]"
                            : "text-[#BBBBBB]"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Action Dropdown Menu */}
                  <td className="py-3 px-4 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === product.id ? null : product.id
                          )
                        }
                        className="p-1 rounded-md text-[#666666] hover:text-[#171717] hover:bg-black/5 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === product.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-black/10 z-30 py-1 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                          <Link
                            href={`/admin/products/${product.id}`}
                            onClick={() => setActiveMenuId(null)}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/4 text-[#171717]"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[#666666]" />
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onDuplicate(product);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-black/4 text-[#171717]"
                          >
                            <Copy className="w-3.5 h-3.5 text-[#666666]" />
                            Duplicate
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onArchive(product);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-black/4 text-[#171717]"
                          >
                            <Archive className="w-3.5 h-3.5 text-[#666666]" />
                            Archive
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onDelete(product);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-red-50 text-red-600 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
