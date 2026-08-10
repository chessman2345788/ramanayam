"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Package,
  CreditCard,
  Users,
  Star,
  Ticket,
  Layout,
  Server,
  ShieldAlert,
  Check,
  CheckCheck,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { NotificationItem, NotificationCategory } from "@/types/notifications";
import { PriorityBadge } from "./PriorityBadge";

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryIcons: Record<NotificationCategory, React.ComponentType<{ className?: string }>> = {
  all: Server,
  orders: ShoppingBag,
  inventory: Package,
  payments: CreditCard,
  customers: Users,
  reviews: Star,
  coupons: Ticket,
  cms: Layout,
  system: Server,
  security: ShieldAlert,
};

const categoryColors: Record<NotificationCategory, string> = {
  all: "bg-stone-50 text-stone-700 border-stone-200",
  orders: "bg-amber-50 text-amber-800 border-amber-200",
  inventory: "bg-sky-50 text-sky-700 border-sky-200",
  payments: "bg-emerald-50 text-emerald-700 border-emerald-200",
  customers: "bg-orange-50 text-orange-800 border-orange-200",
  reviews: "bg-purple-50 text-purple-700 border-purple-200",
  coupons: "bg-pink-50 text-pink-700 border-pink-200",
  cms: "bg-indigo-50 text-indigo-700 border-indigo-200",
  system: "bg-stone-100 text-stone-700 border-stone-200",
  security: "bg-rose-50 text-rose-700 border-rose-200",
};

export function NotificationCard({
  notification,
  onMarkRead,
  onMarkUnread,
  onDelete,
}: NotificationCardProps) {
  const IconComp = categoryIcons[notification.category] || Server;
  const colorClass = categoryColors[notification.category] || categoryColors.all;
  const isUnread = !notification.isRead;

  return (
    <div
      className={`bg-white rounded-xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-md ${
        isUnread
          ? "border-amber-300 shadow-2xs bg-linear-to-r from-amber-50/40 via-white to-white"
          : "border-stone-200/80"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 flex-1">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${colorClass}`}>
            <IconComp className="w-5 h-5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-sm font-bold text-stone-900 font-display ${isUnread ? "text-amber-950" : ""}`}>
                {notification.title}
              </h3>
              <PriorityBadge priority={notification.priority} size="sm" />
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-stone-100 text-stone-600 border border-stone-200">
                {notification.category}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">{notification.description}</p>

            <div className="flex items-center gap-4 pt-1 flex-wrap">
              <span className="text-[11px] font-medium text-stone-400">{notification.timestamp}</span>

              {notification.relatedResource && (
                <Link
                  href={notification.relatedResource.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline transition-colors"
                >
                  <span>{notification.relatedResource.label}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Card Quick Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {isUnread ? (
            <button
              type="button"
              onClick={() => onMarkRead(notification.id)}
              title="Mark as Read"
              className="p-1.5 text-amber-700 hover:bg-amber-100/70 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onMarkUnread(notification.id)}
              title="Mark as Unread"
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(notification.id)}
            title="Delete Notification"
            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
