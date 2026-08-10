"use client";

import React from "react";
import { X, History, User, Calendar, FileText, ArrowUpRight, ArrowDownRight, ArrowRightLeft } from "lucide-react";
import { InventoryHistoryEntry, InventoryItem } from "@/types/inventory";

interface InventoryHistoryDrawerProps {
  isOpen: boolean;
  item: InventoryItem | null;
  historyEntries: InventoryHistoryEntry[];
  onClose: () => void;
}

export const InventoryHistoryDrawer: React.FC<InventoryHistoryDrawerProps> = ({
  isOpen,
  item,
  historyEntries,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  const itemHistory = historyEntries.filter((h) => h.inventoryId === item.id);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col justify-between animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-5 border-b border-stone-100 bg-stone-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <History size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Inventory Audit History</h3>
                <p className="text-xs text-stone-500 truncate max-w-60">{item.productName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg">
              <X size={18} />
            </button>
          </div>

          {/* Timeline Body */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500">Current Stock</span>
              <span className="font-bold text-stone-900 text-sm">{item.available} units</span>
            </div>

            {itemHistory.length === 0 ? (
              <div className="text-center py-12 text-stone-400 space-y-2">
                <History size={32} className="mx-auto text-stone-300" />
                <p>No recorded stock adjustment history yet.</p>
              </div>
            ) : (
              <div className="relative border-l-2 border-amber-200 ml-3 space-y-6 pl-4 py-2">
                {itemHistory.map((entry) => {
                  const isIncrease = entry.action === "INCREASE";
                  const isTransfer = entry.action === "TRANSFER";

                  return (
                    <div key={entry.id} className="relative group">
                      {/* Timeline Bullet Node */}
                      <div
                        className={`absolute -left-5.75 top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                          isIncrease
                            ? "bg-emerald-600"
                            : isTransfer
                            ? "bg-amber-600"
                            : "bg-rose-600"
                        }`}
                      />

                      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold flex items-center gap-1 text-xs ${
                              isIncrease ? "text-emerald-700" : isTransfer ? "text-amber-800" : "text-rose-700"
                            }`}
                          >
                            {isIncrease ? (
                              <ArrowUpRight size={14} />
                            ) : isTransfer ? (
                              <ArrowRightLeft size={14} />
                            ) : (
                              <ArrowDownRight size={14} />
                            )}
                            {isIncrease ? `+${entry.quantityChanged}` : `-${entry.quantityChanged}`} units
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-[10px] text-stone-700">
                            {entry.reason}
                          </span>
                        </div>

                        <div className="text-[11px] text-stone-500 flex items-center gap-1">
                          <User size={12} className="text-stone-400" />
                          <span>{entry.user}</span>
                        </div>

                        <div className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{formatDate(entry.date)}</span>
                        </div>

                        {entry.notes && (
                          <div className="mt-1 pt-1 border-t border-stone-100 text-[11px] text-stone-600 flex items-start gap-1 italic">
                            <FileText size={11} className="text-stone-400 shrink-0 mt-0.5" />
                            <span>{entry.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-100 bg-stone-50 text-right">
            <button onClick={onClose} className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl text-xs">
              Close Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
