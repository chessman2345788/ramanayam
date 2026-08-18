"use client";

import React from "react";
import { Store, CheckCircle2, Clock, Ban, Package, IndianRupee } from "lucide-react";
import { AdminVendorDetail } from "@/data/mockVendorsData";

interface VendorSummaryCardsProps {
  vendors: AdminVendorDetail[];
}

export function VendorSummaryCards({ vendors }: VendorSummaryCardsProps) {
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === "ACTIVE").length;
  const pendingVendors = vendors.filter((v) => v.status === "PENDING").length;
  const suspendedVendors = vendors.filter((v) => v.status === "SUSPENDED").length;
  const totalProducts = vendors.reduce((acc, v) => acc + v.productsCount, 0);
  const totalSales = vendors.reduce((acc, v) => acc + v.totalRevenue, 0);

  const cards = [
    {
      title: "Total Vendors",
      value: totalVendors,
      subtitle: "Registered sellers & co-ops",
      icon: Store,
      iconBg: "bg-stone-100 text-stone-800 border-stone-200",
      valueColor: "text-stone-900",
    },
    {
      title: "Active Vendors",
      value: activeVendors,
      subtitle: "Verified & selling",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      valueColor: "text-emerald-600",
    },
    {
      title: "Pending Vendors",
      value: pendingVendors,
      subtitle: "Awaiting approval",
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      valueColor: "text-amber-600",
    },
    {
      title: "Suspended Vendors",
      value: suspendedVendors,
      subtitle: "Temporarily blocked",
      icon: Ban,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
      valueColor: "text-rose-600",
    },
    {
      title: "Total Vendor Products",
      value: totalProducts.toLocaleString("en-IN"),
      subtitle: "Listed catalog items",
      icon: Package,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      valueColor: "text-purple-600",
    },
    {
      title: "Vendor Sales",
      value: `₹${(totalSales / 100000).toFixed(2)} L`,
      subtitle: "Gross vendor revenue",
      icon: IndianRupee,
      iconBg: "bg-amber-50 text-amber-700 border-amber-200",
      valueColor: "text-amber-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{card.title}</span>
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${card.iconBg}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className={`text-2xl font-extrabold font-display ${card.valueColor}`}>
                {card.value}
              </div>
              <p className="text-[11px] font-medium text-stone-400 mt-0.5">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
