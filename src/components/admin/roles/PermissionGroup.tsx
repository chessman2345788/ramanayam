"use client";

import React from "react";
import { CheckSquare, Square } from "lucide-react";
import { PermissionGroupData } from "@/data/mockRolesData";
import { PermissionToggle } from "./PermissionToggle";

interface PermissionGroupProps {
  group: PermissionGroupData;
  selectedPermissionIds: string[];
  onTogglePermission: (id: string, value: boolean) => void;
  onSelectAllGroup: (groupId: string) => void;
  onClearAllGroup: (groupId: string) => void;
  disabled?: boolean;
}

export function PermissionGroup({
  group,
  selectedPermissionIds,
  onTogglePermission,
  onSelectAllGroup,
  onClearAllGroup,
  disabled,
}: PermissionGroupProps) {
  const groupPermIds = group.permissions.map((p) => p.id);
  const selectedInGroupCount = groupPermIds.filter((id) => selectedPermissionIds.includes(id)).length;
  const isAllSelected = selectedInGroupCount === groupPermIds.length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
      {/* Group Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-extrabold text-stone-900 font-display uppercase tracking-wider">
              {group.name}
            </h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
              {selectedInGroupCount} / {group.permissions.length} selected
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">{group.description}</p>
        </div>

        {!disabled && (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => onSelectAllGroup(group.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3 h-3 text-amber-600" />
              <span>Select All</span>
            </button>

            <button
              type="button"
              onClick={() => onClearAllGroup(group.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-rose-50 text-stone-700 hover:text-rose-800 border border-stone-200 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Square className="w-3 h-3 text-stone-400" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {group.permissions.map((p) => (
          <PermissionToggle
            key={p.id}
            permission={p}
            isChecked={selectedPermissionIds.includes(p.id)}
            onToggle={onTogglePermission}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
