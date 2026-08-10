"use client";

import React from "react";
import { CustomerOrderSummary } from "@/types/customers";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";

interface OrderHistoryTableProps {
  orders: CustomerOrderSummary[];
}

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#F57C00]" />
          <h3 className="font-semibold text-gray-900 text-sm">Order History ({orders.length})</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/50">
              <th className="py-2.5 px-3">Order ID</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
              <th className="py-2.5 px-3">Payment Status</th>
              <th className="py-2.5 px-3">Order Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-400">
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/40">
                  <td className="py-2.5 px-3 font-mono font-semibold text-gray-900">
                    <Link href={`/admin/orders/${ord.id}`} className="hover:text-[#F57C00]">
                      {ord.id}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-gray-600 font-mono">{ord.date}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-gray-900">
                    ₹{ord.amount.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#F57C00] hover:underline"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
