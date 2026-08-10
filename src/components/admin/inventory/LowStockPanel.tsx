"use client";

import React from "react";
import Image from "next/image";
import { AlertTriangle, PlusCircle, Package } from "lucide-react";
import { InventoryItem } from "@/types/inventory";

interface LowStockPanelProps {
  items: InventoryItem[];
  onRestock: (item: InventoryItem) => void;
}

export const LowStockPanel: React.FC<LowStockPanelProps> = ({ items, onRestock }) => {
  const lowStockItems = items.filter((i) => i.available <= i.lowStockThreshold);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-900">
          <div className="w-7 h-7 rounded-lg bg-amber-200/80 flex items-center justify-center text-amber-800">
            <AlertTriangle size={16} />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-bold">Low Stock & Out of Stock Alerts ({lowStockItems.length})</h3>
            <p className="text-[11px] text-amber-700/90">Items below minimum threshold requiring immediate restock order.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {lowStockItems.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.productName} fill className="object-cover" unoptimized />
                ) : (
                  <Package size={16} className="text-amber-700 m-auto" />
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-stone-900 text-xs truncate">{item.productName}</div>
                <div className="text-[10px] text-rose-600 font-semibold">
                  {item.available === 0 ? "OUT OF STOCK" : `${item.available} left (Min: ${item.lowStockThreshold})`}
                </div>
              </div>
            </div>

            <button
              onClick={() => onRestock(item)}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 shrink-0 shadow-2xs"
            >
              <PlusCircle size={12} />
              <span>Restock</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
