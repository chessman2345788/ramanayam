"use client";

import React from "react";
import { motion } from "framer-motion";
import { WelcomeHeader } from "@/components/admin/dashboard/components/WelcomeHeader";
import { KPICardsGrid } from "@/components/admin/dashboard/components/KPICardsGrid";
import { RevenueChart } from "@/components/admin/dashboard/components/RevenueChart";
import { OrdersTable } from "@/components/admin/dashboard/components/OrdersTable";
import { LowStockTable } from "@/components/admin/dashboard/components/LowStockTable";
import { BestSellerGrid } from "@/components/admin/dashboard/components/BestSellerGrid";
import { RecentCustomers } from "@/components/admin/dashboard/components/RecentCustomers";
import { NotificationList } from "@/components/admin/dashboard/components/NotificationList";
import { SystemHealth } from "@/components/admin/dashboard/components/SystemHealth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
} as const;

export default function AdminDashboardOverviewPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-12"
    >
      {/* SECTION 1 — Welcome Header */}
      <motion.div variants={itemVariants}>
        <WelcomeHeader />
      </motion.div>

      {/* SECTION 2 — KPI Cards */}
      <motion.div variants={itemVariants}>
        <KPICardsGrid />
      </motion.div>

      {/* SECTION 3 & SECTION 8 — Revenue Chart + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RevenueChart />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <NotificationList />
        </motion.div>
      </div>

      {/* SECTION 4 & SECTION 5 — Recent Orders + Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <OrdersTable />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <LowStockTable />
        </motion.div>
      </div>

      {/* SECTION 6 — Best Selling Products */}
      <motion.div variants={itemVariants}>
        <BestSellerGrid />
      </motion.div>

      {/* SECTION 7 & SECTION 9 — Recent Customers + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <RecentCustomers />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SystemHealth />
        </motion.div>
      </div>
    </motion.div>
  );
}
