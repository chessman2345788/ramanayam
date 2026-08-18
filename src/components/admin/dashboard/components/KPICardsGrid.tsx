"use client";

import React from "react";
import { StatCard } from "./StatCard";
import { useAdminDashboardQuery } from "@/hooks/useAdminDashboard";
import { KPIMetric } from "../types/dashboard.types";

export function KPICardsGrid() {
  const { data, isLoading } = useAdminDashboardQuery();

  const activeProducts = data?.activeProducts ?? data?.totalProducts ?? 0;
  const totalUsers = data?.totalUsers ?? 0;
  const totalOrders = data?.totalOrders ?? 0;
  const pendingOrders = data?.pendingOrders ?? 0;
  const categoriesCount = data?.categoriesCount ?? 0;
  const lowStockCount = data?.lowStockCount ?? 0;
  const totalRevenue = data?.totalRevenue ?? 0;
  const todayRevenue = data?.todayRevenue ?? 0;

  const realKPIMetrics: KPIMetric[] = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      change: totalOrders > 0 ? "+100%" : "₹0",
      isPositive: true,
      timeframe: "from database orders",
      iconName: "IndianRupee",
    },
    {
      id: "today-revenue",
      title: "Today's Revenue",
      value: `₹${todayRevenue.toLocaleString("en-IN")}`,
      change: todayRevenue > 0 ? "+100%" : "₹0",
      isPositive: true,
      timeframe: "today's paid orders",
      iconName: "TrendingUp",
    },
    {
      id: "total-orders",
      title: "Total Orders",
      value: totalOrders.toLocaleString("en-IN"),
      change: totalOrders > 0 ? "Active" : "0 orders",
      isPositive: true,
      timeframe: "in database",
      iconName: "ShoppingBag",
    },
    {
      id: "total-products",
      title: "Active Products",
      value: String(activeProducts),
      change: "Live",
      isPositive: true,
      timeframe: "in catalog",
      iconName: "Package",
    },
    {
      id: "total-customers",
      title: "Total Customers",
      value: totalUsers.toLocaleString("en-IN"),
      change: "Registered",
      isPositive: true,
      timeframe: "in database",
      iconName: "Users",
    },
    {
      id: "categories",
      title: "Puja Categories",
      value: String(categoriesCount),
      change: "Active",
      isPositive: true,
      timeframe: "in catalog",
      iconName: "Layers",
    },
    {
      id: "pending-orders",
      title: "Pending Orders",
      value: String(pendingOrders),
      change: pendingOrders > 0 ? "Action req." : "0 pending",
      isPositive: pendingOrders === 0,
      timeframe: "needs fulfillment",
      iconName: "Clock",
    },
    {
      id: "low-stock",
      title: "Low Stock Alert",
      value: `${lowStockCount} Items`,
      change: lowStockCount > 0 ? "Action req." : "Stock OK",
      isPositive: lowStockCount === 0,
      timeframe: "stock <= 10",
      iconName: "AlertTriangle",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white border border-black/10 rounded-2xl h-32 p-5" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {realKPIMetrics.map((metric, idx) => (
        <StatCard key={metric.id} metric={metric} index={idx} />
      ))}
    </div>
  );
}
