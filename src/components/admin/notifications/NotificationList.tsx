"use client";

import React from "react";
import { NotificationItem } from "@/types/notifications";
import { NotificationCard } from "./NotificationCard";
import { EmptyState } from "@/components/admin/EmptyState";
import { Pagination } from "@/components/admin/roles/Pagination";
import { BellOff } from "lucide-react";

interface NotificationListProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function NotificationList({
  notifications,
  onMarkRead,
  onMarkUnread,
  onDelete,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={BellOff}
        title="No Notifications Found"
        description="You're all caught up! No active notifications match your current category or search criteria."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {notifications.map((notif) => (
          <NotificationCard
            key={notif.id}
            notification={notif}
            onMarkRead={onMarkRead}
            onMarkUnread={onMarkUnread}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
