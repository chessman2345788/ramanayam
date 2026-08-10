import { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: "default" | "saffron" | "maroon";
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "order" | "inventory" | "review" | "system";
  link?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  status: "online" | "away" | "offline";
}

export interface AdminLayoutState {
  collapsed: boolean;
  hoverExpanded: boolean;
  mobileOpen: boolean;
  theme: "light" | "dark";
  searchQuery: string;
  unreadCount: number;
}
