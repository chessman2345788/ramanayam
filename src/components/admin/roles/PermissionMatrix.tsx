"use client";

import React from "react";
import { CheckSquare, Square, Shield, Sparkles } from "lucide-react";
import { PermissionCheckbox } from "./PermissionCheckbox";
import { permissionModulesList } from "@/data/mockRolesData";

interface PermissionMatrixProps {
  permissions: Record<string, string[]>;
  onChange: (newPermissions: Record<string, string[]>) => void;
  disabled?: boolean;
}

export function PermissionMatrix({ permissions, onChange, disabled = false }: PermissionMatrixProps) {
  const isModuleActionChecked = (moduleId: string, actionKey: string) => {
    return permissions[moduleId]?.includes(actionKey) ?? false;
  };

  const toggleAction = (moduleId: string, actionKey: string, checked: boolean) => {
    if (disabled) return;
    const currentActions = permissions[moduleId] || [];
    const nextActions = checked
      ? [...new Set([...currentActions, actionKey])]
      : currentActions.filter((k) => k !== actionKey);

    const nextPermissions = { ...permissions, [moduleId]: nextActions };
    if (nextActions.length === 0) {
      delete nextPermissions[moduleId];
    }
    onChange(nextPermissions);
  };

  const toggleModuleAll = (moduleId: string, checkAll: boolean) => {
    if (disabled) return;
    const module = permissionModulesList.find((m) => m.id === moduleId);
    if (!module) return;

    const nextPermissions = { ...permissions };
    if (checkAll) {
      nextPermissions[moduleId] = module.actions.map((a) => a.key);
    } else {
      delete nextPermissions[moduleId];
    }
    onChange(nextPermissions);
  };

  const applyPreset = (preset: "FULL" | "READ_ONLY" | "CLEAR") => {
    if (disabled) return;
    if (preset === "CLEAR") {
      onChange({});
      return;
    }

    const next: Record<string, string[]> = {};
    permissionModulesList.forEach((mod) => {
      if (preset === "FULL") {
        next[mod.id] = mod.actions.map((a) => a.key);
      } else if (preset === "READ_ONLY") {
        const viewAction = mod.actions.find((a) => a.key === "view");
        if (viewAction) next[mod.id] = ["view"];
      }
    });
    onChange(next);
  };

  const totalGranted = Object.values(permissions).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
      {/* Sticky Matrix Controls Header */}
      <div className="sticky top-0 z-10 bg-stone-50 border-b border-stone-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-amber-700" />
          <h2 className="text-sm font-bold text-stone-900">Permissions Matrix</h2>
          <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 rounded border border-amber-200">
            {totalGranted} Granted
          </span>
        </div>

        {!disabled && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Quick Presets:</span>
            <button
              type="button"
              onClick={() => applyPreset("FULL")}
              className="px-2.5 py-1 font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors"
            >
              Full Access
            </button>
            <button
              type="button"
              onClick={() => applyPreset("READ_ONLY")}
              className="px-2.5 py-1 font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded transition-colors"
            >
              Read Only
            </button>
            <button
              type="button"
              onClick={() => applyPreset("CLEAR")}
              className="px-2.5 py-1 font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors"
            >
              Deselect All
            </button>
          </div>
        )}
      </div>

      {/* Modules Table List */}
      <div className="divide-y divide-stone-100 p-5 space-y-4 max-h-150 overflow-y-auto">
        {permissionModulesList.map((module) => {
          const grantedActions = permissions[module.id] || [];
          const isAllModuleChecked = module.actions.every((a) => grantedActions.includes(a.key));

          return (
            <div key={module.id} className="pt-3 first:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{module.name}</span>
                  <span className="text-[11px] text-stone-400 font-medium">
                    ({grantedActions.length}/{module.actions.length})
                  </span>
                </div>

                {!disabled && (
                  <button
                    type="button"
                    onClick={() => toggleModuleAll(module.id, !isAllModuleChecked)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-950 transition-colors"
                  >
                    {isAllModuleChecked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                    {isAllModuleChecked ? "Deselect Module" : "Select Module All"}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {module.actions.map((act) => (
                  <PermissionCheckbox
                    key={act.key}
                    label={act.label}
                    actionKey={act.key}
                    isChecked={isModuleActionChecked(module.id, act.key)}
                    onChange={(checked) => toggleAction(module.id, act.key, checked)}
                    disabled={disabled}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
