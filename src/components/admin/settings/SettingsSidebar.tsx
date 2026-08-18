"use client";

import React from "react";
import {
  SlidersHorizontal,
  Store,
  Building2,
  CreditCard,
  Truck,
  Receipt,
  Bell,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";

export type SettingsTabId =
  | "general"
  | "store"
  | "business"
  | "payments"
  | "shipping"
  | "taxes"
  | "notifications"
  | "seo"
  | "security"
  | "account";

interface SettingsSidebarProps {
  activeTab: SettingsTabId;
  onTabChange: (tab: SettingsTabId) => void;
  hasUnsavedChanges?: boolean;
}

const navItems: { id: SettingsTabId; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General Settings", icon: SlidersHorizontal },
  { id: "store", label: "Store Settings", icon: Store },
  { id: "business", label: "Business & Legal", icon: Building2 },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "shipping", label: "Shipping & Delivery", icon: Truck },
  { id: "taxes", label: "Taxes & GST", icon: Receipt },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "seo", label: "SEO & Meta", icon: Search },
  { id: "security", label: "Security & 2FA", icon: ShieldCheck },
  { id: "account", label: "Account Profile", icon: User },
];

export function SettingsSidebar({
  activeTab,
  onTabChange,
  hasUnsavedChanges,
}: SettingsSidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl border border-stone-200 p-2.5 shadow-2xs shrink-0 space-y-1">
      <div className="flex items-center justify-between px-3 py-2 text-[10px] font-extrabold text-stone-400 uppercase tracking-wider border-b border-stone-100">
        <span>Settings Sections</span>
        {hasUnsavedChanges && (
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Unsaved changes pending" />
        )}
      </div>

      <nav className="space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-50 text-amber-700 font-bold border border-amber-200/80 shadow-2xs"
                  : "text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-600" : "text-stone-400"}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
