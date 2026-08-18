"use client";

import React from "react";
import Link from "next/link";
import { Plus, ShoppingBag, Tag, Layers, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import { useAuthStore } from "@/store/auth";

export function WelcomeHeader() {
  const { user } = useAuthStore();
  const adminName = user?.firstName || user?.name?.split(" ")[0] || "Admin";

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Left Greeting & Date */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#F57C00] uppercase tracking-wider mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{currentDate}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A1F1F] tracking-tight">
          Good Morning, {adminName} 👋
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-xl">
          Here is what is happening across Ramanayam temple puja bookings and spiritual e-commerce storefront today.
        </p>
      </div>

      {/* Right Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-3.5 py-2 bg-[#F57C00] text-white text-xs font-semibold rounded-xl hover:bg-[#E06D00] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/admin/categories"
            className="flex items-center gap-2 px-3.5 py-2 bg-[#7A1F1F]/10 text-[#7A1F1F] text-xs font-semibold rounded-xl hover:bg-[#7A1F1F]/20 transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Add Category</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/admin/coupons"
            className="flex items-center gap-2 px-3.5 py-2 bg-black/5 text-[#171717] text-xs font-semibold rounded-xl hover:bg-black/10 transition-colors"
          >
            <Tag className="w-4 h-4 text-[#F57C00]" />
            <span>Create Coupon</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-3.5 py-2 border border-black/10 bg-white text-[#171717] text-xs font-semibold rounded-xl hover:bg-[#FAF8F3] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#999999]" />
            <span>View Orders</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
