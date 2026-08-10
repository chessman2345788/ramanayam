"use client";

import React from "react";
import { Menu, Sun, Moon, PanelLeftClose, PanelLeft } from "lucide-react";
import { useAdminLayout } from "./hooks/useAdminLayout";
import { Breadcrumb } from "./Breadcrumb";
import { SearchBar } from "./SearchBar";
import { NotificationMenu } from "./NotificationMenu";
import { UserMenu } from "./UserMenu";

export function TopNavbar() {
  const {
    collapsed,
    toggleCollapsed,
    toggleMobileOpen,
    theme,
    toggleTheme,
  } = useAdminLayout();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-black/8 px-4 lg:px-6 flex items-center justify-between gap-4 transition-all duration-250">
      {/* Left Section: Mobile Menu Trigger + Sidebar Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMobileOpen}
          className="lg:hidden p-2 rounded-lg text-[#555555] hover:text-[#171717] hover:bg-black/4 transition-colors focus:outline-none"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Collapse Button in Header */}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden lg:flex p-2 rounded-lg text-[#666666] hover:text-[#171717] hover:bg-black/4 transition-colors focus:outline-none"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5 text-[#F57C00]" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>

        {/* Breadcrumb Navigation */}
        <Breadcrumb />
      </div>

      {/* Center Section: Global Search Bar */}
      <div className="flex-1 max-w-md mx-2">
        <SearchBar />
      </div>

      {/* Right Section: Actions (Theme Toggle, Notifications, User Menu) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Theme Toggle (UI only) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-[#666666] hover:text-[#171717] hover:bg-black/4 transition-colors focus:outline-none"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode (UI)`}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-[#555555]" />
          ) : (
            <Sun className="w-4 h-4 text-[#F57C00]" />
          )}
        </button>

        {/* Notifications Icon Dropdown */}
        <NotificationMenu />

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-black/8 mx-1" />

        {/* Admin Avatar User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
