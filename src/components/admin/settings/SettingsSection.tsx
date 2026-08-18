"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function SettingsSection({
  title,
  subtitle,
  icon: Icon,
  children,
}: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-base font-extrabold text-stone-900 font-display">{title}</h2>
          {subtitle && <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  );
}
