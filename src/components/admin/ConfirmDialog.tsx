"use client";

import React from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this operation? This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = true,
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-lg border ${
                isDanger
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-display">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{description}</p>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-xs transition-all active:scale-95 ${
                isDanger
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
