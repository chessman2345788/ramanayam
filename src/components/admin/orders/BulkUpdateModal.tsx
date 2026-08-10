"use client";

import React, { useState } from "react";
import { OrderStatus } from "@/types/orders";
import { X, Check, PackageCheck, AlertCircle } from "lucide-react";

interface BulkUpdateModalProps {
  isOpen: boolean;
  selectedCount: number;
  onClose: () => void;
  onConfirm: (status: OrderStatus) => void;
}

export function BulkUpdateModal({ isOpen, selectedCount, onClose, onConfirm }: BulkUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("Confirmed");

  if (!isOpen) return null;

  const handleUpdate = () => {
    onConfirm(selectedStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#F57C00]" />
            <h3 className="text-base font-semibold text-gray-900">Bulk Update Status</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              You are about to update the status for <strong>{selectedCount} selected orders</strong>. This change will trigger timeline updates.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select New Order Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] hover:bg-[#E06D00] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Update {selectedCount} Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
}
