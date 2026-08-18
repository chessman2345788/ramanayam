"use client";

import React from "react";

interface SettingsCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className="bg-stone-50/60 rounded-xl border border-stone-200/80 p-4 space-y-4">
      {(title || description) && (
        <div className="space-y-0.5 pb-2 border-b border-stone-200/60">
          {title && <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">{title}</h3>}
          {description && <p className="text-[11px] text-stone-500">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
