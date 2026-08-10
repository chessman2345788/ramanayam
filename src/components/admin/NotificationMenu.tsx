"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Check, ShoppingBag, AlertTriangle, Star, ShieldAlert } from "lucide-react";
import { useAdminLayout } from "./hooks/useAdminLayout";
import { AdminNotification } from "./types/layout.types";

export function NotificationMenu() {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useAdminLayout();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: AdminNotification["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4 text-[#F57C00]" />;
      case "inventory":
        return <AlertTriangle className="w-4 h-4 text-[#7A1F1F]" />;
      case "review":
        return <Star className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-9 h-9 rounded-lg text-[#666666] hover:text-[#171717] hover:bg-black/4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F57C00]"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F57C00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F57C00]"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-black/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/6 bg-[#FAF8F3]">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-[#171717]">Notifications</h3>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F57C00]/10 text-[#F57C00] rounded-full">
                  {unreadNotificationsCount} unread
                </span>
              )}
            </div>
            {unreadNotificationsCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-xs text-[#F57C00] hover:text-[#E06D00] font-medium flex items-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-black/4">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#999999]">
                No notifications right now
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                    !n.read ? "bg-[#F57C00]/3" : "hover:bg-black/2"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-black/3 shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs ${!n.read ? "font-semibold text-[#171717]" : "text-[#555555]"}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] text-[#999999] shrink-0">
                        {n.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] line-clamp-2 mt-0.5">
                      {n.message}
                    </p>
                    {n.link && (
                      <Link
                        href={n.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-block mt-1.5 text-[11px] font-medium text-[#F57C00] hover:underline"
                      >
                        View details →
                      </Link>
                    )}
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-[#F57C00] shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 text-center border-t border-black/6 bg-[#FAF8F3]">
            <Link
              href="/admin/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#666666] hover:text-[#171717] font-medium transition-colors"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
