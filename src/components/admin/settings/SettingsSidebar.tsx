"use client";

import React from "react";
import {
  Store,
  Building,
  CreditCard,
  Truck,
  Receipt,
  Mail,
  Bell,
  Users,
  Globe,
  Lock,
  Palette,
  Database,
  Key,
  Info,
} from "lucide-react";

export type SettingsSectionId =
  | "general"
  | "store_info"
  | "payments"
  | "shipping"
  | "taxes"
  | "email"
  | "notifications"
  | "users_roles"
  | "seo"
  | "security"
  | "appearance"
  | "backup"
  | "api_keys"
  | "about";

interface SettingsSidebarProps {
  activeSection: SettingsSectionId;
  onSelectSection: (section: SettingsSectionId) => void;
}

const navItems: { id: SettingsSectionId; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Store },
  { id: "store_info", label: "Store Information", icon: Building },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "taxes", label: "Taxes", icon: Receipt },
  { id: "email", label: "Email & SMTP", icon: Mail },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "users_roles", label: "Users & Roles", icon: Users },
  { id: "seo", label: "SEO & Social", icon: Globe },
  { id: "security", label: "Security & 2FA", icon: Lock },
  { id: "appearance", label: "Appearance & Branding", icon: Palette },
  { id: "backup", label: "Backup & Data", icon: Database },
  { id: "api_keys", label: "API Keys", icon: Key },
  { id: "about", label: "About System", icon: Info },
];

export function SettingsSidebar({ activeSection, onSelectSection }: SettingsSidebarProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 240,
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: "#999999", padding: "8px 12px 4px", textTransform: "uppercase" }}>
        Settings Categories
      </div>

      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectSection(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 10,
              border: "none",
              background: isActive ? "rgba(245,124,0,0.08)" : "transparent",
              color: isActive ? "#F57C00" : "#171717",
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#FAF8F3";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            <IconComponent size={16} style={{ color: isActive ? "#F57C00" : "#666666" }} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
