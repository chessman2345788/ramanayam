"use client";

import React from "react";
import { Check } from "lucide-react";

interface PermissionCheckboxProps {
  label: string;
  actionKey: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function PermissionCheckbox({
  label,
  actionKey,
  isChecked,
  onChange,
  disabled = false,
}: PermissionCheckboxProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-150 select-none ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-stone-50 border-stone-200 text-stone-400"
          : isChecked
          ? "bg-amber-50/90 border-amber-300 text-amber-950 font-semibold shadow-2xs"
          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      <div
        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
          isChecked
            ? "bg-amber-600 border-amber-600 text-white"
            : "bg-white border-stone-300 group-hover:border-stone-400"
        }`}
      >
        {isChecked && <Check className="w-3 h-3 stroke-3" />}
      </div>

      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      <span className="capitalize">{label}</span>
    </label>
  );
}
