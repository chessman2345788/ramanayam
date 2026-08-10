"use client";

import React, { useState } from "react";
import { NotificationsProvider, useNotifications } from "@/components/admin/notifications/NotificationsContext";
import { NotificationSummaryCards } from "@/components/admin/notifications/NotificationSummaryCards";
import { NotificationFilters, CategoryFilterItem } from "@/components/admin/notifications/NotificationFilters";
import { NotificationList } from "@/components/admin/notifications/NotificationList";
import { NotificationSettingsModal } from "@/components/admin/notifications/NotificationSettingsModal";
import { PageHeader } from "@/components/admin/PageHeader";
import { NotificationCategory } from "@/types/notifications";
import { Bell, CheckCheck, Settings, Trash2 } from "lucide-react";
import { AdminSearchBar, AdminToast } from "@/components/admin/ui";

function NotificationsContent() {
  const {
    notifications,
    unreadCount,
    criticalCount,
    todayCount,
    resolvedCount,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    clearRead,
    deleteNotification,
  } = useNotifications();

  const [activeCategory, setActiveCategory] = useState<NotificationCategory>("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const categories: CategoryFilterItem[] = [
    { id: "all", label: "All Notifications", count: notifications.length },
    { id: "orders", label: "Orders", count: notifications.filter((n) => n.category === "orders").length },
    { id: "inventory", label: "Inventory", count: notifications.filter((n) => n.category === "inventory").length },
    { id: "payments", label: "Payments", count: notifications.filter((n) => n.category === "payments").length },
    { id: "customers", label: "Customers", count: notifications.filter((n) => n.category === "customers").length },
    { id: "reviews", label: "Reviews", count: notifications.filter((n) => n.category === "reviews").length },
    { id: "coupons", label: "Coupons", count: notifications.filter((n) => n.category === "coupons").length },
    { id: "cms", label: "CMS", count: notifications.filter((n) => n.category === "cms").length },
    { id: "system", label: "System", count: notifications.filter((n) => n.category === "system").length },
    { id: "security", label: "Security", count: notifications.filter((n) => n.category === "security").length },
  ];

  const filteredNotifications = notifications.filter((n) => {
    const matchesCategory = activeCategory === "all" || n.category === activeCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "unread") matchesStatus = !n.isRead;
    if (statusFilter === "read") matchesStatus = n.isRead;
    if (statusFilter === "critical") matchesStatus = n.priority === "critical";
    if (statusFilter === "high") matchesStatus = n.priority === "high";
    if (statusFilter === "today") matchesStatus = n.timestamp.includes("mins") || n.timestamp.includes("hour") || n.timestamp.includes("Today");

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredNotifications.length / pageSize) || 1;
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <PageHeader
        title="Notification Center"
        subtitle="Stay updated with real-time store events, inventory alerts, and security updates."
        icon={Bell}
        badge={unreadCount > 0 ? `${unreadCount} New` : "All Caught Up"}
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                markAllAsRead();
                showToast("Marked all notifications as read.");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 transition-all shadow-2xs cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              Mark All Read
            </button>

            <button
              type="button"
              onClick={() => {
                clearRead();
                showToast("Cleared read notifications.");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 transition-all shadow-2xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-stone-500" />
              Clear Read
            </button>

            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 transition-all shadow-md cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </>
        }
      />

      <NotificationSummaryCards
        unreadCount={unreadCount}
        todayCount={todayCount}
        criticalCount={criticalCount}
        resolvedCount={resolvedCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Category & Filter Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <NotificationFilters
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            statusFilter={statusFilter}
            onSelectStatusFilter={(st) => {
              setStatusFilter(st);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Main Notification Feed */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-4">
            <AdminSearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setCurrentPage(1);
              }}
              placeholder="Search notifications by title or description..."
              maxWidth="max-w-full"
            />
          </div>

          <NotificationList
            notifications={paginatedNotifications}
            onMarkRead={markAsRead}
            onMarkUnread={markAsUnread}
            onDelete={deleteNotification}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredNotifications.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <NotificationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <NotificationsProvider>
      <NotificationsContent />
    </NotificationsProvider>
  );
}
