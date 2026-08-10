"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { AdminNotification, UserProfile } from "../types/layout.types";

interface AdminLayoutContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapsed: () => void;
  hoverExpanded: boolean;
  setHoverExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMobileOpen: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  user: UserProfile;
}

const initialNotifications: AdminNotification[] = [
  {
    id: "1",
    title: "New Puja Order #RM-8492",
    message: "Special Annakut Puja booked by Rajesh Sharma",
    timestamp: "5 min ago",
    read: false,
    type: "order",
    link: "/admin/orders",
  },
  {
    id: "2",
    title: "Low Inventory Alert",
    message: "Brass Oil Lamp stock dropped below 5 units",
    timestamp: "25 min ago",
    read: false,
    type: "inventory",
    link: "/admin/inventory",
  },
  {
    id: "3",
    title: "New 5-Star Review",
    message: "Received verified review on Premium Sandalwood Incense",
    timestamp: "2 hours ago",
    read: false,
    type: "review",
    link: "/admin/reviews",
  },
  {
    id: "4",
    title: "System Update",
    message: "Payment gateway synchronization completed",
    timestamp: "1 day ago",
    read: true,
    type: "system",
  },
];

const initialUser: UserProfile = {
  name: "Acharya Raman",
  email: "admin@ramanayam.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Super Admin",
  status: "online",
};

export const AdminLayoutContext = createContext<AdminLayoutContextType | null>(null);

export function useAdminLayout() {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error("useAdminLayout must be used within an AdminLayoutProvider");
  }
  return context;
}

export function useAdminLayoutState() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [hoverExpanded, setHoverExpanded] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Handle window resize to auto-close mobile drawer when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const toggleMobileOpen = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return {
    collapsed,
    setCollapsed,
    toggleCollapsed,
    hoverExpanded,
    setHoverExpanded,
    mobileOpen,
    setMobileOpen,
    toggleMobileOpen,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    user: initialUser,
  };
}
