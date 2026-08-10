"use client";

import React from "react";
import { CustomerTimelineEvent } from "@/types/customers";
import { Clock, UserPlus, ShoppingBag, Star, KeyRound, MapPin } from "lucide-react";

interface CustomerTimelineProps {
  timeline: CustomerTimelineEvent[];
}

export function CustomerTimeline({ timeline }: CustomerTimelineProps) {
  const getIcon = (type: CustomerTimelineEvent["type"]) => {
    switch (type) {
      case "account_created":
        return UserPlus;
      case "order_placed":
        return ShoppingBag;
      case "review_submitted":
        return Star;
      case "password_changed":
        return KeyRound;
      case "address_updated":
        return MapPin;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Clock className="w-5 h-5 text-[#F57C00]" />
        <h3 className="font-semibold text-gray-900 text-sm">Customer Activity Timeline</h3>
      </div>

      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
        {timeline.map((event) => {
          const Icon = getIcon(event.type);

          return (
            <div key={event.id} className="relative group">
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
                <p className="text-[11px] text-gray-500">By {event.actor}</p>
                {event.details && <p className="text-xs text-gray-700 pt-0.5">{event.details}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
