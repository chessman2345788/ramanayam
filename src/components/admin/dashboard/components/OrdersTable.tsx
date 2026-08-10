"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Eye, MoreHorizontal, ArrowRight } from "lucide-react";
import { mockRecentOrders } from "../data/dashboard.mock";
import { RecentOrder } from "../types/dashboard.types";

export function OrdersTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const filteredOrders = mockRecentOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusBadge = (status: RecentOrder["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#7A1F1F]">
            Recent Orders
          </h2>
          <p className="text-xs text-[#666666] mt-0.5">
            Latest customer orders and puja bookings requiring fulfillment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search order ID or name..."
              className="h-8 pl-8 pr-3 text-xs bg-[#FAF8F3] border border-black/10 rounded-lg text-[#171717] placeholder-[#999999] focus:outline-none focus:border-[#F57C00]"
            />
          </div>

          <Link
            href="/admin/orders"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#F57C00] hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#555555]">
          <thead className="bg-[#FAF8F3] text-[#7A1F1F] font-semibold border-y border-black/6">
            <tr>
              <th className="py-2.5 px-3">Order ID</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Payment</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/4">
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-[#999999]">
                  No orders found matching search.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-black/2 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#171717]">
                    {order.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-[#FAF8F3] shrink-0 border border-black/10">
                        {order.avatarUrl ? (
                          // eslint-disable-next-next/no-img-element
                          <img
                            src={order.avatarUrl}
                            alt={order.customerName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-[#7A1F1F]">
                            {order.customerName.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="truncate max-w-32">
                        <p className="font-medium text-[#171717] truncate">{order.customerName}</p>
                        <p className="text-[10px] text-[#999999] truncate">{order.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#171717]">
                    {order.amount}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#666666]">
                    {order.paymentMode}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#999999] text-[11px]">
                    {order.date}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`View details for ${order.id}`)}
                      className="p-1 text-[#666666] hover:text-[#F57C00] rounded-md transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/6 text-xs text-[#666666]">
        <span>
          Showing {paginatedOrders.length} of {filteredOrders.length} orders
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-2.5 py-1 rounded-md border border-black/10 bg-white hover:bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed font-medium"
          >
            Prev
          </button>
          <span className="px-2 font-semibold text-[#171717]">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-2.5 py-1 rounded-md border border-black/10 bg-white hover:bg-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
