"use client";

import React from "react";
import { TrackingInfo } from "@/types/orders";
import { Truck, ExternalLink, Calendar, MapPin, CheckCircle2, Clock } from "lucide-react";

interface TrackingCardProps {
  trackingInfo?: TrackingInfo;
  onAssignCourier?: () => void;
}

export function TrackingCard({ trackingInfo, onAssignCourier }: TrackingCardProps) {
  if (!trackingInfo) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4 text-center">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900 text-sm">Fulfillment & Tracking</h3>
          </div>
        </div>
        <div className="py-4 space-y-2">
          <p className="text-xs text-gray-500">No courier assigned to this shipment yet.</p>
          {onAssignCourier && (
            <button
              onClick={onAssignCourier}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] hover:bg-[#E06D00] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Assign Courier & Dispatch</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const steps = ["Manifested", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];
  const currentStepIdx = steps.indexOf(trackingInfo.status) !== -1 ? steps.indexOf(trackingInfo.status) : 2;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#F57C00]" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{trackingInfo.courierName}</h3>
            <p className="text-[11px] font-mono text-gray-500">AWB: {trackingInfo.trackingId}</p>
          </div>
        </div>
        {trackingInfo.trackingUrl && (
          <a
            href={trackingInfo.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#F57C00] hover:underline"
          >
            <span>Track</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Progress Stepper */}
      <div className="py-2">
        <div className="flex items-center justify-between mb-2">
          {steps.map((st, idx) => {
            const isCompleted = idx <= currentStepIdx;
            return (
              <div key={st} className="flex flex-col items-center flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCompleted ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <span className={`text-[10px] mt-1 text-center font-medium ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                  {st}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50/80 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#F57C00]" />
          <div>
            <span className="text-gray-500 block text-[10px]">Expected Delivery</span>
            <span className="font-semibold text-gray-900">{trackingInfo.expectedDelivery}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-500 block text-[10px]">Last Updated</span>
            <span className="font-semibold text-gray-900">{trackingInfo.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
