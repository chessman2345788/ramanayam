"use client";

import React from "react";
import { Order } from "@/types/orders";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  PackageCheck,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw,
  IndianRupee,
} from "lucide-react";

interface OrderSummaryCardsProps {
  orders: Order[];
  activeFilter?: string;
  onFilterClick?: (status: string) => void;
}

export function OrderSummaryCards({ orders, activeFilter, onFilterClick }: OrderSummaryCardsProps) {
  const todayOrders = orders.filter((o) => o.date.includes("01 Aug"));
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending");
  const processingOrders = orders.filter((o) => ["Confirmed", "Packed"].includes(o.orderStatus));
  const shippedOrders = orders.filter((o) => o.orderStatus === "Shipped");
  const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered");
  const cancelledOrders = orders.filter((o) => o.orderStatus === "Cancelled");
  const returnedOrders = orders.filter((o) => o.orderStatus === "Returned");
  const todayRevenue = todayOrders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const cards = [
    { key: "today", label: "Today's Orders", count: todayOrders.length, icon: ShoppingBag, color: "border-l-amber-500 text-amber-600 bg-amber-50/40" },
    { key: "Pending", label: "Pending Orders", count: pendingOrders.length, icon: Clock, color: "border-l-yellow-500 text-yellow-600 bg-yellow-50/40" },
    { key: "processing", label: "Processing Orders", count: processingOrders.length, icon: PackageCheck, color: "border-l-blue-500 text-blue-600 bg-blue-50/40" },
    { key: "Shipped", label: "Shipped Orders", count: shippedOrders.length, icon: Truck, color: "border-l-purple-500 text-purple-600 bg-purple-50/40" },
    { key: "Delivered", label: "Delivered Orders", count: deliveredOrders.length, icon: CheckCircle, color: "border-l-emerald-500 text-emerald-600 bg-emerald-50/40" },
    { key: "Cancelled", label: "Cancelled Orders", count: cancelledOrders.length, icon: XCircle, color: "border-l-rose-500 text-rose-600 bg-rose-50/40" },
    { key: "Returned", label: "Returned Orders", count: returnedOrders.length, icon: RotateCcw, color: "border-l-orange-500 text-orange-600 bg-orange-50/40" },
    { key: "revenue", label: "Today's Revenue", count: `₹${todayRevenue.toLocaleString()}`, icon: IndianRupee, color: "border-l-[#F57C00] text-[#F57C00] bg-orange-50/50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3.5 my-2">
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
