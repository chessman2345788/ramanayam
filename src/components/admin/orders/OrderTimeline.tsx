"use client";

import React from "react";
import { TimelineEvent } from "@/types/orders";
import { Clock, User, CheckCircle2, Package, Truck, CheckCheck, XCircle, RotateCcw } from "lucide-react";

interface OrderTimelineProps {
  events: TimelineEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  const getIcon = (st: string) => {
    switch (st) {
      case "Order Placed":
        return Clock;
      case "Payment Received":
        return CheckCircle2;
      case "Confirmed":
        return CheckCircle2;
      case "Packed":
        return Package;
      case "Shipped":
        return Truck;
      case "Delivered":
        return CheckCheck;
      case "Cancelled":
        return XCircle;
      case "Returned":
        return RotateCcw;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Clock className="w-5 h-5 text-[#F57C00]" />
        <h3 className="font-semibold text-gray-900 text-sm">Order Event Timeline</h3>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
        {events.map((event) => {
          const Icon = getIcon(event.status);

          return (
            <div key={event.id} className="relative group">
              {/* Dot Icon */}
              <div className="absolute -left-5.75 top-0 w-6 h-6 rounded-full bg-white border-2 border-[#F57C00] flex items-center justify-center text-[#F57C00] shadow-xs">
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-xs">{event.title}</span>
                  <span className="text-[11px] font-mono text-gray-500">
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-600">
                  <User className="w-3 h-3 text-gray-400" />
                  <span>{event.actor}</span>
                </div>
                {event.note && <p className="text-xs text-gray-600 pt-1 italic">{event.note}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
