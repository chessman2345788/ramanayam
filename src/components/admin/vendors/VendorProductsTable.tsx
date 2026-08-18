"use client";

import React from "react";
import { Package } from "lucide-react";
import { VendorProductItem } from "@/data/mockVendorsData";

interface VendorProductsTableProps {
  products: VendorProductItem[];
}

export function VendorProductsTable({ products }: VendorProductsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
      <div className="p-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-stone-900 font-display">Seller Products Catalog</h3>
        </div>
        <span className="text-xs font-medium text-stone-400">{products.length} Products Listed</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3.5">Product Name</th>
              <th className="p-3.5">SKU</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">Stock</th>
              <th className="p-3.5">Sales</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-stone-400 text-xs">
                  No products currently listed for this vendor.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="p-3.5 font-bold text-stone-900">{p.name}</td>
                  <td className="p-3.5 font-mono text-[11px] text-stone-500">{p.sku}</td>
                  <td className="p-3.5 text-stone-700 font-medium">{p.category}</td>
                  <td className="p-3.5 font-extrabold text-amber-700">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="p-3.5 font-bold text-stone-900">{p.stock} units</td>
                  <td className="p-3.5 font-semibold text-stone-600">{p.salesCount} sold</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        p.status === "IN_STOCK"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.status === "LOW_STOCK"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {p.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
