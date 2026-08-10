"use client";

import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  User,
  ShieldCheck,
} from "lucide-react";

interface AdminHeaderProps {
  collapsed: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function AdminHeader({ collapsed, setMobileOpen }: AdminHeaderProps) {
  const pathname = usePathname();

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, label };
  });

  return (
    <header
      style={{
        height: 64,
        background: "#FFFFFF",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left section: Mobile menu + Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            padding: 4,
          }}
          className="lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumbs */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div
                key={crumb.href}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                {idx > 0 && <ChevronRight size={14} color="var(--text-muted)" />}
                <span
                  style={{
                    fontWeight: isLast ? 600 : 400,
                    color: isLast ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                >
                  {crumb.label}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right section: Search bar + Notifications + Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Quick Search */}
        <div
          style={{
            position: "relative",
            width: 240,
            display: "flex",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 12,
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search products, orders..."
            style={{
              width: "100%",
              height: 36,
              paddingLeft: 36,
              paddingRight: 12,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-primary)",
              fontSize: 13,
              color: "var(--text-primary)",
              outline: "none",
            }}
          />
        </div>

        {/* Notifications Button */}
        <button
          aria-label="Notifications"
          style={{
            position: "relative",
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent-saffron)",
            }}
          />
        </button>

        {/* Admin Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingLeft: 8,
            borderLeft: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--accent-saffron-light)",
              border: "1px solid var(--accent-saffron)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-saffron)",
            }}
          >
            <ShieldCheck size={18} />
          </div>
          <div className="hidden sm:block" style={{ textAlign: "left" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              System Admin
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              admin@ramanayam.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
