"use client";

import React, { useState } from "react";
import { X, ArrowRightLeft } from "lucide-react";
import { InventoryItem } from "@/types/inventory";

interface InventoryTransferDialogProps {
  isOpen: boolean;
  item: InventoryItem | null;
  warehouses: string[];
  onClose: () => void;
  onConfirmTransfer: (item: InventoryItem, targetWarehouse: string, qty: number) => void;
}

export const InventoryTransferDialog: React.FC<InventoryTransferDialogProps> = ({
  isOpen,
  item,
  warehouses,
  onClose,
  onConfirmTransfer,
}) => {
  const [targetWarehouse, setTargetWarehouse] = useState(warehouses[0] || "");
  const [quantity, setQuantity] = useState(5);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0 || quantity > item.available) return;
    onConfirmTransfer(item, targetWarehouse, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-md overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs md:text-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <ArrowRightLeft size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Transfer Stock</h3>
              <p className="text-xs text-stone-500">{item.productName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div className="text-stone-500 text-xs">Source Warehouse</div>
            <div className="font-bold text-stone-900">{item.warehouse}</div>
            <div className="text-stone-500 text-[11px] mt-1">Available: {item.available} units</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Destination Warehouse</label>
            <select
              value={targetWarehouse}
              onChange={(e) => setTargetWarehouse(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              {warehouses
                .filter((w) => w !== item.warehouse)
                .map((wh) => (
                  <option key={wh} value={wh}>
                    {wh}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Transfer Quantity</label>
            <input
              type="number"
              min={1}
              max={item.available}
              required
              value={quantity}
              onChange={(e) => setQuantity(Math.min(item.available, Math.max(1, parseInt(e.target.value) || 0)))}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 font-bold"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs">
              Confirm Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
