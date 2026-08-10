"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MoreHorizontal, Sliders, History, ArrowRightLeft, Edit, Package } from "lucide-react";
import { InventoryItem } from "@/types/inventory";
import { StatusBadge } from "./StatusBadge";

interface InventoryTableProps {
  items: InventoryItem[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  onAdjustStock: (item: InventoryItem) => void;
  onTransferStock: (item: InventoryItem) => void;
  onViewHistory: (item: InventoryItem) => void;
  onEditThreshold: (item: InventoryItem) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onAdjustStock,
  onTransferStock,
  onViewHistory,
  onEditThreshold,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
      <table className="w-full text-left border-collapse text-xs md:text-sm">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isSomeSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </th>
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Warehouse</th>
            <th className="py-3 px-4">Available</th>
            <th className="py-3 px-4">Reserved</th>
            <th className="py-3 px-4">Low Limit</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Updated</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 text-stone-800">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <tr key={item.id} className={`hover:bg-amber-50/30 transition-colors ${isSelected ? "bg-amber-50/50" : ""}`}>
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelectOne(item.id, e.target.checked)}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.productName} fill className="object-cover" sizes="40px" unoptimized />
                      ) : (
                        <Package size={20} className="text-amber-700/60 m-auto" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 line-clamp-1">{item.productName}</div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mt-0.5">
                        <span>SKU: {item.sku}</span>
                        {item.barcode && <span>• Barcode: {item.barcode}</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-stone-600 font-medium">{item.category}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200">
                    {item.warehouse}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-stone-900 text-sm">
                  {item.available} <span className="text-xs font-normal text-stone-500">units</span>
                </td>
                <td className="py-3 px-4 text-purple-700 font-semibold">{item.reserved} units</td>
                <td className="py-3 px-4 text-stone-500 font-mono">{item.lowStockThreshold} units</td>
                <td className="py-3 px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 px-4 text-stone-500 text-[11px] whitespace-nowrap">{formatDate(item.updatedAt)}</td>
                <td className="py-3 px-4 text-right relative">
                  <div className="relative inline-block text-left" ref={activeMenuId === item.id ? menuRef : null}>
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {activeMenuId === item.id && (
                      <div className="absolute right-0 bottom-full mb-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 text-xs">
                        <button
                          onClick={() => {
                            onAdjustStock(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          <Sliders size={14} className="text-amber-600" />
                          <span>Adjust Stock</span>
                        </button>
                        <button
                          onClick={() => {
                            onTransferStock(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                        >
                          <ArrowRightLeft size={14} />
                          <span>Transfer Stock</span>
                        </button>
                        <button
                          onClick={() => {
                            onViewHistory(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                        >
                          <History size={14} />
                          <span>Inventory History</span>
                        </button>
                        <button
                          onClick={() => {
                            onEditThreshold(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                        >
                          <Edit size={14} />
                          <span>Edit Threshold</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
