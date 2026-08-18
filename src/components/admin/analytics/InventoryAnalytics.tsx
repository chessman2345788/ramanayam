"use client";

import React from "react";
import Link from "next/link";
import { Package, AlertTriangle, XCircle, Zap, Clock, ExternalLink } from "lucide-react";

export function InventoryAnalytics() {
  const inventoryStats = {
    totalValue: 8450000,
    turnoverRate: 4.8, // turns per year
    lowStockCount: 14,
    outOfStockCount: 3,
    fastMovingCount: 22,
    slowMovingCount: 8,
  };

  const fastMovingProducts = [
    { name: "Pure Desi Cow Ghee Wicks (Box of 200)", speed: "710 units / mo", stock: 0, alert: "OUT_OF_STOCK" },
    { name: "Organic Mysore Sandalwood Dhoop Cones", speed: "580 units / mo", stock: 120, alert: "IN_STOCK" },
    { name: "Handcrafted Antique Brass Peacock Diya", speed: "342 units / mo", stock: 28, alert: "IN_STOCK" },
  ];

  return (
    <div className="space-y-6">
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-amber-600" /> Total Inventory Value
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-display">
            ₹{(inventoryStats.totalValue / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[10px] text-stone-400 font-medium">At current retail prices</div>
        </div>

        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Stock Turnover
          </div>
          <div className="text-xl font-extrabold text-emerald-700 font-display">
            {inventoryStats.turnoverRate}x / yr
          </div>
          <div className="text-[10px] text-emerald-600 font-bold">Optimal stock velocity</div>
        </div>

        <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-amber-800 uppercase flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Low Stock Items
          </div>
          <div className="text-xl font-extrabold text-amber-900 font-display">
            {inventoryStats.lowStockCount} Products
          </div>
          <Link
            href="/admin/inventory?filter=low_stock"
            className="text-[11px] font-bold text-amber-700 hover:underline inline-flex items-center gap-0.5"
          >
            <span>View Low Stock</span> <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-rose-800 uppercase flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Out of Stock
          </div>
          <div className="text-xl font-extrabold text-rose-900 font-display">
            {inventoryStats.outOfStockCount} Products
          </div>
          <Link
            href="/admin/inventory?filter=out_of_stock"
            className="text-[11px] font-bold text-rose-700 hover:underline inline-flex items-center gap-0.5"
          >
            <span>View Out of Stock</span> <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Fast Moving vs Slow Moving Products */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3">
        <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600" />
          <span>Fastest Moving Inventory Items</span>
        </div>

        <div className="space-y-2">
          {fastMovingProducts.map((p) => (
            <div key={p.name} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl text-xs">
              <div className="font-semibold text-stone-800 truncate max-w-[280px]">{p.name}</div>
              <div className="font-bold text-emerald-700">{p.speed}</div>
              <div>
                {p.stock === 0 ? (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-stone-600 bg-stone-200/60 px-2 py-0.5 rounded-full">
                    {p.stock} units left
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
