"use client";

import React from "react";
import { PermissionItem } from "@/data/mockRolesData";

interface PermissionToggleProps {
  permission: PermissionItem;
  isChecked: boolean;
  onToggle: (id: string, value: boolean) => void;
  disabled?: boolean;
}

export function PermissionToggle({
  permission,
  isChecked,
  onToggle,
  disabled,
}: PermissionToggleProps) {
  return (
    <div
      className={`flex items-start justify-between p-3 rounded-xl border transition-all ${
        isChecked
          ? "bg-amber-50/50 border-amber-200"
          : "bg-white border-stone-200/80 hover:border-stone-300"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => {
        if (!disabled) onToggle(permission.id, !isChecked);
      }}
    >
      <div className="space-y-0.5 pr-2">
        <div className="text-xs font-bold text-stone-900">{permission.name}</div>
        <div className="text-[11px] text-stone-500 font-normal leading-relaxed">
          {permission.description}
        </div>
      </div>

      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={(e) => {
          if (!disabled) onToggle(permission.id, e.target.checked);
        }}
        className="w-4 h-4 accent-amber-600 rounded cursor-pointer mt-0.5 shrink-0"
      />
    </div>
  );
}
