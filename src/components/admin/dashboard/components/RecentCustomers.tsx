"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { useAdminDashboardQuery } from "@/hooks/useAdminDashboard";

export function RecentCustomers() {
  const { data: apiData, isLoading } = useAdminDashboardQuery();

  const recentCustomers = apiData?.recentCustomers || [];

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#F57C00]" />
          <div>
            <h2 className="text-base font-serif font-bold text-[#7A1F1F]">
              Recent Devotees & Customers
            </h2>
            <p className="text-xs text-[#666666]">Newly registered platform accounts</p>
          </div>
        </div>
        <Link
          href="/admin/users"
          className="text-xs font-semibold text-[#F57C00] hover:underline flex items-center gap-1"
        >
          <span>All Customers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Customer List */}
      <div className="divide-y divide-black/4">
        {isLoading ? (
          <div className="py-6 text-center text-[#999999] text-xs">
            Loading registered accounts...
          </div>
        ) : recentCustomers.length === 0 ? (
          <div className="py-6 text-center text-[#999999] text-xs">
            No customer accounts found in database.
          </div>
        ) : (
          recentCustomers.map((cust) => (
            <div key={cust.id} className="py-3 flex items-center justify-between gap-3 hover:bg-black/2 px-2 rounded-xl transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#FAF8F3] border border-black/10 shrink-0">
                  {cust.avatarUrl ? (
                    // eslint-disable-next-next/no-img-element
                    <img
                      src={cust.avatarUrl}
                      alt={cust.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#7A1F1F]">
                      {cust.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-[#171717] truncate">{cust.name}</p>
                  <p className="text-[11px] text-[#666666] truncate">{cust.email}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-[#F57C00]/10 text-[#F57C00] rounded-full">
                  {cust.ordersCount} orders
                </span>
                <p className="text-[10px] text-[#999999] mt-0.5">{cust.joinedDate}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
