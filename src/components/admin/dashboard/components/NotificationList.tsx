"use client";

import React from "react";
import { Bell, ShoppingBag, UserPlus, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { mockActivities } from "../data/dashboard.mock";
import { AdminActivity } from "../types/dashboard.types";

export function NotificationList() {
  const getIcon = (type: AdminActivity["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4 text-[#F57C00]" />;
      case "user":
        return <UserPlus className="w-4 h-4 text-emerald-600" />;
      case "stock":
        return <AlertTriangle className="w-4 h-4 text-[#7A1F1F]" />;
      case "payment":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-[#F57C00]" />
        <div>
          <h2 className="text-base font-serif font-bold text-[#7A1F1F]">
            Platform Notifications
          </h2>
          <p className="text-xs text-[#666666]">Real-time system events & updates</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3">
        {mockActivities.map((act) => (
          <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F3] transition-colors border border-transparent hover:border-black/5">
            <div className="p-2 rounded-xl bg-black/3 shrink-0 mt-0.5">
              {getIcon(act.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold text-[#171717] truncate">{act.title}</h4>
                <span className="text-[10px] text-[#999999] shrink-0">{act.time}</span>
              </div>
              <p className="text-[11px] text-[#666666] mt-0.5 line-clamp-2">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
