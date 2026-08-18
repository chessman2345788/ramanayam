"use client";

import React from "react";
import { AlertTriangle, Trash2, ShieldAlert, X } from "lucide-react";

export type RoleConfirmActionType = "DELETE_ROLE" | "REMOVE_PERMISSIONS" | "MODIFY_HIGH_PRIVILEGE";

interface ConfirmDialogProps {
  isOpen: boolean;
  actionType: RoleConfirmActionType | null;
  roleName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  actionType,
  roleName,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen || !actionType) return null;

  const getConfig = () => {
    switch (actionType) {
      case "DELETE_ROLE":
        return {
          title: "Delete RBAC Role",
          desc: `Are you sure you want to permanently delete the role "${roleName}"? Assigned staff users will lose permissions associated with this role.`,
          icon: Trash2,
          iconBg: "bg-rose-50 text-rose-600 border-rose-200",
          confirmBtn: "bg-rose-600 hover:bg-rose-700 text-white",
          confirmText: "Delete Role",
        };
      case "REMOVE_PERMISSIONS":
        return {
          title: "Revoke Core Permissions",
          desc: `Warning: You are revoking key operational permissions from "${roleName}". Staff members with this role may be locked out of store modules.`,
          icon: AlertTriangle,
          iconBg: "bg-amber-50 text-amber-600 border-amber-200",
          confirmBtn: "bg-amber-600 hover:bg-amber-700 text-white",
          confirmText: "Revoke Permissions",
        };
      case "MODIFY_HIGH_PRIVILEGE":
        return {
          title: "Modify High-Privilege System Role",
          desc: `High-Privilege Notice: "${roleName}" is a core system security profile. Are you sure you want to proceed with this modification?`,
          icon: ShieldAlert,
          iconBg: "bg-purple-50 text-purple-600 border-purple-200",
          confirmBtn: "bg-purple-600 hover:bg-purple-700 text-white",
          confirmText: "Confirm Modification",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs" onClick={onCancel} />

      {/* Dialog Body */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-2xl border ${config.iconBg} shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">{config.title}</h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">{config.desc}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${config.confirmBtn}`}
          >
            {config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
