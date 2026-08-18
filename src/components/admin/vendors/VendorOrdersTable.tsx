"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { VendorOrderItem } from "@/data/mockVendorsData";

interface VendorOrdersTableProps {
  orders: VendorOrderItem[];
}

export function VendorOrdersTable({ orders }: VendorOrdersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
      <div className="p-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-stone-900 font-display">Seller Orders History</h3>
        </div>
        <span className="text-xs font-medium text-stone-400">{orders.length} Orders Found</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3.5">Order ID</th>
              <th className="p-3.5">Customer Name</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Payment Status</th>
              <th className="p-3.5">Order Status</th>
              <th className="p-3.5">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-stone-400 text-xs">
                  No orders recorded for this seller yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-stone-900">{o.orderNumber}</td>
                  <td className="p-3.5 font-semibold text-stone-800">{o.customerName}</td>
                  <td className="p-3.5 font-extrabold text-amber-700">₹{o.amount.toLocaleString("en-IN")}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        o.paymentStatus === "PAID"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : o.paymentStatus === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        o.orderStatus === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : o.orderStatus === "SHIPPED"
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : o.orderStatus === "PROCESSING"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-500 text-[11px]">{o.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
