"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Users,
  MessageSquare,
  Ticket,
  BarChart3,
  Store,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  X,
} from "lucide-react";
import { useAdminLayout } from "./hooks/useAdminLayout";
import { SidebarItem } from "./SidebarItem";
import { NavItem } from "./types/layout.types";
import { useAuthStore } from "@/store/auth";

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "5" },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const {
    collapsed,
    toggleCollapsed,
    hoverExpanded,
    setHoverExpanded,
    mobileOpen,
    setMobileOpen,
  } = useAdminLayout();

  const isCurrentlyCollapsed = collapsed && !hoverExpanded;

  return (
    <>
      {/* Mobile Backdrop Blur Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Fixed Sidebar */}
      <motion.aside
        onMouseEnter={() => collapsed && setHoverExpanded(true)}
        onMouseLeave={() => collapsed && setHoverExpanded(false)}
        animate={{
          width: isCurrentlyCollapsed ? 72 : 240,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden lg:flex flex-col fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-black/10 shadow-xs select-none`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-black/6 bg-[#FAF8F3] shrink-0">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#F57C00] to-[#7A1F1F] flex items-center justify-center text-white shadow-sm shrink-0">
              <Flame className="w-5 h-5 fill-white/20" />
            </div>
            {!isCurrentlyCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base font-bold tracking-wide text-[#7A1F1F]">
                  RAMANAYAM
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-[#F57C00] uppercase mt-0.5">
                  Admin Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          {!hoverExpanded && (
            <button
              type="button"
              onClick={toggleCollapsed}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#666666] hover:text-[#171717] hover:bg-black/5 transition-colors cursor-pointer"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Nav Items List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-1 scrollbar-thin">
          {adminNavItems.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              collapsed={isCurrentlyCollapsed}
            />
          ))}
        </div>

        {/* Bottom Logout Button */}
        <div className="p-3 border-t border-black/6 bg-[#FAF8F3] shrink-0">
          <button
            type="button"
            onClick={async () => {
              try {
                await useAuthStore.getState().logout();
              } catch {}
              window.location.href = "/admin/login";
            }}
            className={`w-full flex items-center h-10 px-3 rounded-lg text-[#C53030] hover:bg-[#C53030]/10 transition-colors font-medium text-xs select-none cursor-pointer ${
              isCurrentlyCollapsed ? "justify-center" : "gap-3"
            }`}
            title={isCurrentlyCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCurrentlyCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 bottom-0 left-0 w-72 bg-white z-50 flex flex-col border-r border-black/10 shadow-2xl lg:hidden"
          >
            {/* Mobile Header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-black/6 bg-[#FAF8F3]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#F57C00] to-[#7A1F1F] flex items-center justify-center text-white shadow-sm">
                  <Flame className="w-5 h-5 fill-white/20" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-base font-bold tracking-wide text-[#7A1F1F]">
                    RAMANAYAM
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-[#F57C00] uppercase mt-0.5">
                    Admin Portal
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#666666] hover:bg-black/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <div className="flex-1 overflow-y-auto py-3 space-y-1">
              {adminNavItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  item={item}
                  collapsed={false}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </div>

            {/* Mobile Footer Logout */}
            <div className="p-3 border-t border-black/6 bg-[#FAF8F3]">
              <button
                type="button"
                onClick={async () => {
                  setMobileOpen(false);
                  try {
                    await useAuthStore.getState().logout();
                  } catch {}
                  window.location.href = "/admin/login";
                }}
                className="w-full flex items-center h-10 px-3 gap-3 rounded-lg text-[#C53030] hover:bg-[#C53030]/10 transition-colors font-medium text-xs cursor-pointer"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
