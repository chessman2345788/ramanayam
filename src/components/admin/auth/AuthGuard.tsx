"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { ShieldAlert, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, isLoading, user, checkAuth } = useAuthStore();

  // Exempt public auth pages like /admin/login
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/admin/login?returnUrl=${returnUrl}`);
    }
  }, [isLoading, isAuthenticated, isLoginPage, pathname, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-[#F57C00] animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#666666]">Verifying Admin Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  // Check Role Guard
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const isRoleAllowed = allowedRoles.includes(user.role);

    if (!isRoleAllowed) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-4 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-display mb-1">Access Denied (Role Guard)</h2>
          <p className="text-xs text-stone-600 max-w-md mb-6">
            Your role (<span className="font-semibold text-stone-900">{user.role}</span>) does not have sufficient permission to view this section of the Admin Portal.
          </p>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="px-5 py-2.5 bg-[#F57C00] text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-[#E06D00] transition-colors"
          >
            Return to Admin Dashboard
          </button>
        </div>
      );
    }
  }

  return <>{children}</>;
}
