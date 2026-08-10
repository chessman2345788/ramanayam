"use client";

import React from "react";
import { Bell, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";

interface NotificationSummaryCardsProps {
  unreadCount: number;
  todayCount: number;
  criticalCount: number;
  resolvedCount: number;
}

export function NotificationSummaryCards({
  unreadCount,
  todayCount,
  criticalCount,
  resolvedCount,
}: NotificationSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Unread Notifications"
        value={unreadCount}
        icon={Bell}
        subtext="Requires Attention"
        iconBg="bg-amber-50 border-amber-200"
        iconColor="text-amber-800"
      />
      <StatCard
        title="Today's Notifications"
        value={todayCount}
        icon={Clock}
        subtext="Received Last 24 Hours"
        iconBg="bg-sky-50 border-sky-200"
        iconColor="text-sky-700"
      />
      <StatCard
        title="Critical Alerts"
        value={criticalCount}
        icon={AlertTriangle}
        subtext="High Severity Spikes"
        iconBg="bg-rose-50 border-rose-200"
        iconColor="text-rose-700"
      />
      <StatCard
        title="Resolved Alerts"
        value={resolvedCount}
        icon={CheckCircle2}
        subtext="Marked as Processed"
        iconBg="bg-emerald-50 border-emerald-200"
        iconColor="text-emerald-700"
      />
    </div>
  );
}
