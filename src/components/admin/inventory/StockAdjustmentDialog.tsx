"use client";

import React, { useState, useEffect } from "react";
import { X, Sliders, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { InventoryItem, StockAdjustmentReason } from "@/types/inventory";

interface StockAdjustmentDialogProps {
  isOpen: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (
    item: InventoryItem,
    type: "INCREASE" | "DECREASE",
    qty: number,
    reason: StockAdjustmentReason,
    notes: string
  ) => void;
}

export const StockAdjustmentDialog: React.FC<StockAdjustmentDialogProps> = ({
  isOpen,
  item,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<"INCREASE" | "DECREASE">("INCREASE");
  const [quantity, setQuantity] = useState<number>(10);
  const [reason, setReason] = useState<StockAdjustmentReason>("Supplier Restock");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setType("INCREASE");
      setQuantity(10);
      setReason("Supplier Restock");
      setNotes("");
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const currentStock = item.available;
  const newStock = type === "INCREASE" ? currentStock + (quantity || 0) : Math.max(0, currentStock - (quantity || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;
    onSave(item, type, quantity, reason, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs md:text-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Stock Adjustment</h3>
              <p className="text-xs text-stone-500">{item.productName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current vs New stock summary bar */}
          <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div>
              <span className="text-stone-500 text-xs block">Current Available Stock</span>
              <span className="text-lg font-bold text-stone-900">{currentStock} units</span>
            </div>
            <div>
              <span className="text-stone-500 text-xs block">New Stock Level</span>
              <span className={`text-lg font-bold ${newStock < item.lowStockThreshold ? "text-amber-600" : "text-emerald-700"}`}>
                {newStock} units
              </span>
            </div>
          </div>

          {/* Adjustment Type Switcher */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">Adjustment Action</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("INCREASE")}
                className={`py-2 px-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  type === "INCREASE"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <ArrowUpRight size={16} />
                <span>Increase (+ Stock)</span>
              </button>
              <button
                type="button"
                onClick={() => setType("DECREASE")}
                className={`py-2 px-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  type === "DECREASE"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <ArrowDownRight size={16} />
                <span>Decrease (- Stock)</span>
              </button>
            </div>
          </div>

          {/* Quantity & Reason */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                required
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Adjustment Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as StockAdjustmentReason)}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Supplier Restock">Supplier Restock</option>
                <option value="Purchase">Purchase Audit</option>
                <option value="Return">Customer Return</option>
                <option value="Damage">Damage / Expired</option>
                <option value="Manual Correction">Manual Correction</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Reference Notes / PO #</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. PO-8942 received from Varanasi Artisan Guild..."
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs">
              Confirm Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
