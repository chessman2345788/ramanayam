"use client";

import React, { createContext, useContext, useState } from "react";
import { NotificationItem, NotificationSettings } from "@/types/notifications";
import { mockNotificationsList, initialNotificationSettings } from "@/data/mockNotificationsData";

interface NotificationsContextType {
  notifications: NotificationItem[];
  settings: NotificationSettings;
  unreadCount: number;
  criticalCount: number;
  todayCount: number;
  resolvedCount: number;
  addNotification: (item: Omit<NotificationItem, "id" | "timestamp" | "isRead" | "isArchived"> & { isArchived?: boolean }) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  clearRead: () => void;
  deleteNotification: (id: string) => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotificationsList);
  const [settings, setSettings] = useState<NotificationSettings>(initialNotificationSettings);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const criticalCount = notifications.filter((n) => n.priority === "critical" && !n.isRead).length;
  const todayCount = notifications.filter((n) => n.timestamp.includes("mins") || n.timestamp.includes("hour") || n.timestamp.includes("Today")).length;
  const resolvedCount = notifications.filter((n) => n.isRead).length;

  const addNotification = (item: Omit<NotificationItem, "id" | "timestamp" | "isRead" | "isArchived"> & { isArchived?: boolean }) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: "Just now",
      isRead: false,
      isArchived: item.isArchived ?? false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.isRead));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        settings,
        unreadCount,
        criticalCount,
        todayCount,
        resolvedCount,
        addNotification,
        markAsRead,
        markAsUnread,
        markAllAsRead,
        clearRead,
        deleteNotification,
        updateSettings,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationsProvider");
  return context;
}
