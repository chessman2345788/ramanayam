"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, Ban, Power, X } from "lucide-react";

export type ConfirmActionType = "APPROVE" | "SUSPEND" | "ACTIVATE" | "REJECT";

interface ConfirmDialogProps {
  isOpen: boolean;
  actionType: ConfirmActionType | null;
  vendorName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  actionType,
  vendorName,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen || !actionType) return null;

  const getActionConfig = () => {
    switch (actionType) {
      case "APPROVE":
        return {
          title: "Approve Seller Registration",
          desc: `Are you sure you want to approve "${vendorName}"? This will allow them to list products and fulfill orders on Ramanayam.`,
          icon: CheckCircle2,
          iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
          confirmBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
          confirmText: "Approve Seller",
        };
      case "SUSPEND":
        return {
          title: "Suspend Seller Account",
          desc: `Are you sure you want to suspend "${vendorName}"? Their active products will be hidden from the storefront until reactivated.`,
          icon: Ban,
          iconBg: "bg-rose-50 text-rose-600 border-rose-200",
          confirmBtn: "bg-rose-600 hover:bg-rose-700 text-white",
          confirmText: "Suspend Seller",
        };
      case "ACTIVATE":
        return {
          title: "Activate Seller Account",
          desc: `Are you sure you want to reactivate "${vendorName}"? Their catalog products will be restored to active selling status.`,
          icon: Power,
          iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
          confirmBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
          confirmText: "Activate Seller",
        };
      case "REJECT":
        return {
          title: "Reject Seller Application",
          desc: `Are you sure you want to reject the application for "${vendorName}"?`,
          icon: AlertTriangle,
          iconBg: "bg-red-50 text-red-600 border-red-200",
          confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
          confirmText: "Reject Seller",
        };
    }
  };

  const config = getActionConfig();
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
