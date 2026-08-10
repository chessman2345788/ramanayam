"use client";

import React from "react";
import { Activity, ShieldAlert, LogIn, AlertOctagon, Package, ShoppingBag } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { ActivityLogItem } from "@/types/activity";

interface ActivitySummaryCardsProps {
  logs: ActivityLogItem[];
}

export function ActivitySummaryCards({ logs }: ActivitySummaryCardsProps) {
  const todayCount = logs.length;
  const criticalCount = logs.filter((l) => l.severity === "critical").length;
  const adminLogins = logs.filter((l) => l.action === "Login" && l.status === "SUCCESS").length;
  const failedLogins = logs.filter((l) => l.action === "Login" && l.status === "FAILED").length;
  const productChanges = logs.filter((l) => l.module === "Products" || l.module === "Inventory").length;
  const orderUpdates = logs.filter((l) => l.module === "Orders").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      <StatCard title="Today's Activities" value={todayCount} icon={Activity} iconBg="bg-amber-50 border-amber-200" iconColor="text-amber-800" />
      <StatCard title="Critical Actions" value={criticalCount} icon={ShieldAlert} iconBg="bg-rose-50 border-rose-200" iconColor="text-rose-700" />
      <StatCard title="Admin Logins" value={adminLogins} icon={LogIn} iconBg="bg-emerald-50 border-emerald-200" iconColor="text-emerald-700" />
      <StatCard title="Failed Logins" value={failedLogins} icon={AlertOctagon} iconBg="bg-rose-100/70 border-rose-300" iconColor="text-rose-800" />
      <StatCard title="Product Changes" value={productChanges} icon={Package} iconBg="bg-sky-50 border-sky-200" iconColor="text-sky-700" />
      <StatCard title="Order Updates" value={orderUpdates} icon={ShoppingBag} iconBg="bg-orange-50 border-orange-200" iconColor="text-orange-800" />
    </div>
  );
}
