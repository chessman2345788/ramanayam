"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import { mockLowStockItems } from "../data/dashboard.mock";

export function LowStockTable() {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#7A1F1F]/10 flex items-center justify-center text-[#7A1F1F]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-[#7A1F1F]">
              Low Stock Alert (&lt; 10)
            </h2>
            <p className="text-xs text-[#666666]">
              Products needing urgent inventory replenishment
            </p>
          </div>
        </div>

        <Link
          href="/admin/inventory"
          className="text-xs font-semibold text-[#F57C00] hover:underline flex items-center gap-1"
        >
          <span>Inventory Manager</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#555555]">
          <thead className="bg-[#FAF8F3] text-[#7A1F1F] font-semibold border-y border-black/6">
            <tr>
              <th className="py-2.5 px-3">Product Name</th>
              <th className="py-2.5 px-3">SKU</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Stock Level</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/4">
            {mockLowStockItems.map((item) => (
              <tr key={item.id} className="hover:bg-red-50/40 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#171717] truncate max-w-48">
                  {item.name}
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-[#666666]">
                  {item.sku}
                </td>
                <td className="py-3 px-3 text-[#666666] truncate max-w-28">
                  {item.category}
                </td>
                <td className="py-3 px-3 font-bold text-[#7A1F1F]">
                  {item.stock} units
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    Critical
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Replenish stock for ${item.name}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-[#F57C00]/10 text-[#F57C00] hover:bg-[#F57C00]/20 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
