"use client";

import React from "react";
import { Bell, ShoppingBag, UserPlus, AlertTriangle, CheckCircle, XCircle, Package } from "lucide-react";
import { useAdminDashboardQuery } from "@/hooks/useAdminDashboard";
import { AdminActivity } from "../types/dashboard.types";

export function NotificationList() {
  const { data: apiData, isLoading } = useAdminDashboardQuery();

  const realActivities: AdminActivity[] = [];

  if (apiData) {
    if (apiData.lowStockCount > 0) {
      realActivities.push({
        id: "ACT-STOCK",
        type: "stock",
        title: "Low Inventory Alert",
        time: "Live Status",
        description: `${apiData.lowStockCount} inventory items have stock levels below threshold (<= 10 units)`,
      });
    }

    if (apiData.pendingOrders > 0) {
      realActivities.push({
        id: "ACT-PENDING",
        type: "order",
        title: "Pending Orders Action Needed",
        time: "Live Status",
        description: `${apiData.pendingOrders} order(s) awaiting fulfillment`,
      });
    }

    if (apiData.activeProducts > 0) {
      realActivities.push({
        id: "ACT-PROD",
        type: "user",
        title: "Active Catalog Products",
        time: "Database Live",
        description: `${apiData.activeProducts} active products in Ramanayam store catalog`,
      });
    }

    if (apiData.totalUsers > 0) {
      realActivities.push({
        id: "ACT-USERS",
        type: "user",
        title: "Platform Accounts Active",
        time: "Database Live",
        description: `${apiData.totalUsers} registered user accounts in system`,
      });
    }
  }

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
      default:
        return <Package className="w-4 h-4 text-[#F57C00]" />;
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
        {isLoading ? (
          <div className="py-6 text-center text-[#999999] text-xs">
            Checking system events...
          </div>
        ) : realActivities.length === 0 ? (
          <div className="py-6 text-center text-[#999999] text-xs">
            No urgent notifications. System operation normal.
          </div>
        ) : (
          realActivities.map((act) => (
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
          ))
        )}
      </div>
    </div>
  );
}
