"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface AdminToastProps {
  message: string | null;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

export function AdminToast({ message, type = "success", onClose }: AdminToastProps) {
  if (!message) return null;

  const styles = {
    success: "bg-emerald-950/90 border-emerald-800 text-emerald-100",
    error: "bg-red-950/90 border-red-800 text-red-100",
    info: "bg-sky-950/90 border-sky-800 text-sky-100",
    warning: "bg-amber-950/90 border-amber-800 text-amber-100",
  }[type];

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 ${styles}`}>
      {icons}
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-stone-400 hover:text-white transition-colors p-0.5 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
