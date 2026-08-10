"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavItem } from "./types/layout.types";

interface SidebarItemProps {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarItem({ item, collapsed, onNavigate }: SidebarItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;

  const isActive =
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href);

  return (
    <div className="relative group px-2 py-0.5">
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`relative flex items-center h-10 px-3 rounded-lg transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#F57C00] ${
          isActive
            ? "text-[#F57C00] font-semibold bg-[#F57C00]/10"
            : "text-[#555555] hover:text-[#171717] hover:bg-black/4"
        } ${collapsed ? "justify-center px-0" : "justify-start gap-3"}`}
        title={collapsed ? item.label : undefined}
      >
        {/* Active Pill Accent Line */}
        {isActive && (
          <motion.div
            layoutId="activeSidebarIndicator"
            className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#F57C00] rounded-r-full"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}

        {/* Icon with subtle hover animation */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center shrink-0"
        >
          <Icon
            className={`w-5 h-5 transition-colors duration-200 ${
              isActive ? "text-[#F57C00]" : "text-[#666666] group-hover:text-[#171717]"
            }`}
          />
        </motion.div>

        {/* Label (Hidden when collapsed) */}
        {!collapsed && (
          <span className="truncate text-sm tracking-tight flex-1">
            {item.label}
          </span>
        )}

        {/* Badge (e.g. Orders count) */}
        {item.badge !== undefined && (
          <span
            className={`inline-flex items-center justify-center text-xs font-bold rounded-full transition-all ${
              collapsed
                ? "absolute top-1 right-1 w-4 h-4 text-[10px]"
                : "px-2 py-0.5"
            } ${
              isActive
                ? "bg-[#F57C00] text-white"
                : "bg-[#7A1F1F]/10 text-[#7A1F1F]"
            }`}
          >
            {item.badge}
          </span>
        )}
      </Link>

      {/* Floating Tooltip when Collapsed */}
      {collapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-[#171717] text-white text-xs font-medium rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 whitespace-nowrap">
          {item.label}
        </div>
      )}
    </div>
  );
}
