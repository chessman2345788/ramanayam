"use client";

import React from "react";
import { Package, Boxes, AlertTriangle, XCircle, Clock, IndianRupee } from "lucide-react";
import { InventoryItem } from "@/types/inventory";

interface InventorySummaryCardsProps {
  items: InventoryItem[];
}

export const InventorySummaryCards: React.FC<InventorySummaryCardsProps> = ({ items }) => {
  const totalProducts = items.length;
  const totalStockUnits = items.reduce((acc, curr) => acc + curr.available + curr.reserved, 0);
  const outOfStockCount = items.filter((i) => i.available === 0).length;
  const lowStockCount = items.filter((i) => i.available > 0 && i.available <= i.lowStockThreshold).length;
  const reservedStockUnits = items.reduce((acc, curr) => acc + curr.reserved, 0);

  const totalInventoryValueINR = items.reduce(
    (acc, curr) => acc + curr.available * (curr.unitCost || 0),
    0
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const cards = [
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      subtitle: "Unique catalog SKUs",
      icon: Package,
      color: "text-amber-700 bg-amber-50 border-amber-200/80",
    },
    {
      title: "Total Stock Units",
      value: totalStockUnits.toLocaleString(),
      subtitle: "Units across all hubs",
      icon: Boxes,
      color: "text-stone-800 bg-stone-100 border-stone-200",
    },
    {
      title: "Out of Stock",
      value: outOfStockCount.toString(),
      subtitle: `${((outOfStockCount / (totalProducts || 1)) * 100).toFixed(1)}% of total SKUs`,
      icon: XCircle,
      color: "text-rose-700 bg-rose-50 border-rose-200",
    },
    {
      title: "Low Stock Alert",
      value: lowStockCount.toString(),
      subtitle: "Requires restock",
      icon: AlertTriangle,
      color: "text-amber-800 bg-amber-50/80 border-amber-300",
    },
    {
      title: "Reserved Stock",
      value: reservedStockUnits.toLocaleString(),
      subtitle: "Held in active carts",
      icon: Clock,
      color: "text-purple-700 bg-purple-50 border-purple-200",
    },
    {
      title: "Inventory Valuation",
      value: formatCurrency(totalInventoryValueINR),
      subtitle: "Cost valuation (₹)",
      icon: IndianRupee,
      color: "text-emerald-800 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-2 hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 truncate">{card.title}</span>
              <div className={`p-1.5 rounded-lg border ${card.color}`}>
                <Icon size={14} />
              </div>
            </div>

            <div>
              <div className="text-lg md:text-xl font-bold text-stone-900 tracking-tight">{card.value}</div>
              <div className="text-[10px] text-stone-400 font-medium truncate mt-0.5">{card.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
