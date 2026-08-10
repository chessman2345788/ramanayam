"use client";

import React from "react";
import { Customer } from "@/types/customers";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  UserCheck,
  RotateCcw,
  UserX,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

interface CustomerSummaryCardsProps {
  customers: Customer[];
  activeFilter?: string;
  onFilterClick?: (status: string) => void;
}

export function CustomerSummaryCards({ customers, activeFilter, onFilterClick }: CustomerSummaryCardsProps) {
  const totalCustomers = customers.length;
  const newToday = customers.filter((c) => c.joinedDate.includes("01 Aug") || c.joinedDate.includes("Jul")).length;
  const activeCount = customers.filter((c) => c.status === "Active" || c.status === "VIP").length;
  const returningCount = customers.filter((c) => c.ordersCount > 1).length;
  const blockedCount = customers.filter((c) => c.status === "Blocked").length;
  
  const lifetimeRevenue = customers.reduce((acc, curr) => acc + curr.totalSpent, 0);
  const avgOrderValue = Math.round(
    lifetimeRevenue / (customers.reduce((acc, curr) => acc + curr.ordersCount, 0) || 1)
  );

  const cards = [
    { key: "ALL", label: "Total Customers", count: totalCustomers.toLocaleString(), icon: Users, color: "border-l-[#F57C00] text-[#F57C00] bg-orange-50/40" },
    { key: "new", label: "New Customers Today", count: newToday, icon: UserPlus, color: "border-l-blue-500 text-blue-600 bg-blue-50/40" },
    { key: "Active", label: "Active Customers", count: activeCount, icon: UserCheck, color: "border-l-emerald-500 text-emerald-600 bg-emerald-50/40" },
    { key: "returning", label: "Returning Customers", count: returningCount, icon: RotateCcw, color: "border-l-purple-500 text-purple-600 bg-purple-50/40" },
    { key: "Blocked", label: "Blocked Customers", count: blockedCount, icon: UserX, color: "border-l-rose-500 text-rose-600 bg-rose-50/40" },
    { key: "aov", label: "Average Order Value", count: `₹${avgOrderValue.toLocaleString()}`, icon: TrendingUp, color: "border-l-amber-500 text-amber-600 bg-amber-50/40" },
    { key: "revenue", label: "Lifetime Revenue", count: `₹${(lifetimeRevenue / 100000).toFixed(1)}L`, icon: IndianRupee, color: "border-l-[#800000] text-[#800000] bg-rose-50/30" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 my-2">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.key;

        return (
          <motion.div
            key={card.key}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterClick && onFilterClick(card.key)}
            className={`p-3.5 bg-white border border-gray-100 rounded-xl shadow-xs transition-all cursor-pointer border-l-4 ${card.color} ${
              isActive ? "ring-2 ring-[#F57C00] ring-offset-1 bg-amber-50/30" : "hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between gap-1 text-xs text-gray-500 mb-1">
              <span className="font-medium truncate">{card.label}</span>
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
            </div>
            <div className="text-lg font-bold text-gray-900 tracking-tight">
              {card.count}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
