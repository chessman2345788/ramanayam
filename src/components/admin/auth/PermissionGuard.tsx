"use client";

import React from "react";
import { useAuthStore } from "@/store/auth";
import { Lock } from "lucide-react";

interface PermissionGuardProps {
  module: string;
  action?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ module, action, fallback, children }: PermissionGuardProps) {
  const { hasPermission } = useAuthStore();

  const isAllowed = hasPermission(module, action);

  if (!isAllowed) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    return (
      <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-center text-amber-900 text-xs flex items-center justify-center gap-2">
        <Lock className="w-4 h-4 text-amber-700 shrink-0" />
        <span>You lack permission (<strong className="font-mono">{module}{action ? `:${action}` : ""}</strong>) to view or perform this action.</span>
      </div>
    );
  }

  return <>{children}</>;
}
