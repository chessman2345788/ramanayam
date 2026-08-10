"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, ShieldCheck, ExternalLink } from "lucide-react";
import { useAdminLayout } from "./hooks/useAdminLayout";
import { useAuthStore } from "@/store/auth";

export function UserMenu() {
  const { user: mockUser } = useAdminLayout();
  const { user: authUser, logout } = useAuthStore();
  const router = useRouter();

  const user = {
    name: authUser?.name || authUser?.email || mockUser.name,
    email: authUser?.email || mockUser.email,
    role: authUser?.role || mockUser.role,
    avatarUrl: authUser?.profileImage || authUser?.avatarUrl || mockUser.avatarUrl,
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/admin/login");
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-black/4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F57C00]"
        aria-label="User menu"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 bg-[#FAF8F3] shrink-0">
          {user.avatarUrl ? (
            // eslint-disable-next-next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#7A1F1F] font-bold text-xs">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          {/* Online Dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        <div className="hidden lg:flex flex-col text-left leading-tight pr-1">
          <span className="text-xs font-semibold text-[#171717] truncate max-w-27.5">
            {user.name}
          </span>
          <span className="text-[10px] text-[#7A1F1F] font-medium">
            {user.role}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-black/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Details Header */}
          <div className="p-4 border-b border-black/6 bg-[#FAF8F3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 bg-white shrink-0">
                {user.avatarUrl ? (
                  // eslint-disable-next-next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#7A1F1F] font-bold text-sm">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#171717] truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-[#666666] truncate">
                  {user.email}
                </p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[10px] font-semibold bg-[#7A1F1F]/10 text-[#7A1F1F] rounded-md">
                  <ShieldCheck className="w-3 h-3" />
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="py-1 text-xs text-[#555555]">
            <Link
              href="/admin/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-black/3 hover:text-[#171717] transition-colors"
            >
              <User className="w-4 h-4 text-[#999999]" />
              Admin Profile
            </Link>
            <Link
              href="/admin/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-black/3 hover:text-[#171717] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#999999]" />
              Store Settings
            </Link>
            <Link
              href="/"
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-black/3 hover:text-[#171717] transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#999999]" />
              View Live Storefront
            </Link>
          </div>

          {/* Logout Divider */}
          <div className="border-t border-black/6 py-1">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#C53030] hover:bg-[#C53030]/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-[#C53030]" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
