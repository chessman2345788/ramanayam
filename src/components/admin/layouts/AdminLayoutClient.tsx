"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAdminLayoutState, AdminLayoutContext } from "../hooks/useAdminLayout";
import { Sidebar } from "../Sidebar";
import { TopNavbar } from "../TopNavbar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const layoutState = useAdminLayoutState();
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const { collapsed, hoverExpanded } = layoutState;
  const isCurrentlyCollapsed = collapsed && !hoverExpanded;

  return (
    <AdminLayoutContext.Provider value={layoutState}>
      <div className="min-h-screen bg-[#FAF8F3] text-[#171717] font-sans flex flex-col antialiased selection:bg-[#F57C00]/15 selection:text-[#171717]">
        {/* Desktop & Mobile Fixed Sidebar */}
        <Sidebar />

        {/* Main Wrapper with Dynamic Left Margin */}
        <div
          style={{ marginLeft: isCurrentlyCollapsed ? 72 : 240 }}
          className="flex-1 flex flex-col min-h-screen transition-all duration-250 ease-in-out"
        >
          {/* Fixed Header Navbar */}
          <TopNavbar />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </AdminLayoutContext.Provider>
  );
}
