"use client";

import React, { useState } from "react";
import { Order } from "@/types/orders";
import { X, RefreshCw, AlertTriangle, Check } from "lucide-react";

interface RefundModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onConfirmRefund: (amount: number, reason: string) => void;
}

export function RefundModal({ isOpen, order, onClose, onConfirmRefund }: RefundModalProps) {
  const [refundType, setRefundType] = useState<"full" | "partial">("full");
  const [customAmount, setCustomAmount] = useState<number>(order ? order.totalAmount : 0);
  const [reason, setReason] = useState<string>("Customer Cancellation / Order Rejected");

  if (!isOpen || !order) return null;

  const refundAmount = refundType === "full" ? order.totalAmount : customAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmRefund(refundAmount, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-rose-600" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Process Refund</h3>
              <p className="text-[11px] text-gray-500">Order #{order.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>
              Original Payment Method: <strong>{order.paymentMethod}</strong> (Ref: {order.transactionId})
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Refund Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setRefundType("full");
                  setCustomAmount(order.totalAmount);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  refundType === "full"
                    ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Full Refund (₹{order.totalAmount.toLocaleString()})
              </button>
              <button
                type="button"
                onClick={() => setRefundType("partial")}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  refundType === "partial"
                    ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Partial Refund
              </button>
            </div>
          </div>

          {refundType === "partial" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Partial Amount (₹)</label>
              <input
                type="number"
                max={order.totalAmount}
                min={1}
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Reason for Refund</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value="Customer Cancellation">Customer Cancellation</option>
              <option value="Item Out of Stock">Item Out of Stock</option>
              <option value="Damaged / Defective Item Received">Damaged / Defective Item Received</option>
              <option value="Late Delivery Return">Late Delivery Return</option>
              <option value="Other Operational Reason">Other Operational Reason</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Refund ₹{refundAmount.toLocaleString()}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
