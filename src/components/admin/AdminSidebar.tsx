"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ExternalLink,
  Shield,
  Bell,
  Sparkles,
  Image as ImageIcon,
  Layout as LayoutIcon,
  PackageCheck,
  History,
} from "lucide-react";

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Festival Manager", href: "/admin/festivals", icon: Sparkles, badge: "New" },
  { label: "Puja Kit Builder", href: "/admin/puja-kits", icon: PackageCheck },
  { label: "Banner Manager", href: "/admin/banners", icon: ImageIcon },
  { label: "Homepage Layout", href: "/admin/homepage-sections", icon: LayoutIcon },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Media Library", href: "/admin/media", icon: Store },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "5" },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Notifications", href: "/admin/notifications", icon: Bell, badge: "3" },
  { label: "Roles & Access", href: "/admin/roles", icon: Shield },
  { label: "Activity Logs", href: "/admin/activity", icon: History },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40,
            backdropFilter: "blur(2px)",
          }}
          className="lg:hidden"
        />
      )}

      <aside
        style={{
          width: collapsed ? 72 : 240,
          background: "#FFFFFF",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`admin-sidebar ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div
          style={{
            height: 64,
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {!collapsed && (
            <Link
              href="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "var(--accent-saffron)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                R
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "0.04em",
                  color: "var(--text-primary)",
                }}
              >
                RAMANAYAM
              </span>
            </Link>
          )}

          {collapsed && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--accent-saffron)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              R
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Sidebar"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
            className="hidden lg:flex"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: collapsed ? "10px" : "10px 14px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: active ? 600 : 500,
                  fontSize: 13,
                  color: active ? "var(--accent-saffron)" : "var(--text-secondary)",
                  background: active ? "var(--accent-saffron-light)" : "transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <span style={{ flex: 1, whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "white",
                      background: "var(--accent-saffron)",
                      padding: "2px 6px",
                      borderRadius: 10,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "10px" : "10px 14px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-muted)",
              transition: "all 0.15s ease",
            }}
          >
            <ExternalLink size={18} />
            {!collapsed && <span>View Storefront</span>}
          </Link>

          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "10px" : "10px 14px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              color: "#DC2626",
              transition: "all 0.15s ease",
            }}
          >
            <LogOut size={18} />
            {!collapsed && <span>Exit Admin</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
