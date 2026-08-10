"use client";

import React, { useState } from "react";
import { TrackingInfo } from "@/types/orders";
import { X, Truck, Sparkles, Check } from "lucide-react";

interface AssignCourierModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  onAssign: (tracking: TrackingInfo) => void;
}

export function AssignCourierModal({ isOpen, orderId, onClose, onAssign }: AssignCourierModalProps) {
  const [courierName, setCourierName] = useState<TrackingInfo["courierName"]>("BlueDart");
  const [trackingId, setTrackingId] = useState(`AWB${Math.floor(10000000 + Math.random() * 90000000)}`);
  const [expectedDelivery, setExpectedDelivery] = useState("05 Aug 2026");

  if (!isOpen) return null;

  const handleGenerateTracking = () => {
    setTrackingId(`AWB${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign({
      courierName,
      trackingId,
      status: "Manifested",
      expectedDelivery,
      trackingUrl: `https://${courierName.toLowerCase().replace(/\s+/g, "")}.com/track/${trackingId}`,
      lastUpdated: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#F57C00]" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Assign Courier</h3>
              <p className="text-[11px] text-gray-500">Order #{orderId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Courier Partner</label>
            <select
              value={courierName}
              onChange={(e) => setCourierName(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            >
              <option value="BlueDart">BlueDart Express</option>
              <option value="Delhivery">Delhivery Surface/Air</option>
              <option value="DTDC">DTDC Premium</option>
              <option value="India Post">India Post Speed Post</option>
              <option value="Shadowfax">Shadowfax Logistics</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700">Tracking / AWB Number</label>
              <button
                type="button"
                onClick={handleGenerateTracking}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F57C00] hover:text-[#E06D00]"
              >
                <Sparkles className="w-3 h-3" /> Auto-generate
              </button>
            </div>
            <input
              type="text"
              required
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expected Delivery Date</label>
            <input
              type="text"
              required
              value={expectedDelivery}
              onChange={(e) => setExpectedDelivery(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            />
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
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] hover:bg-[#E06D00] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Assign & Dispatch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
