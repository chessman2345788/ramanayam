"use client";

import React, { useState } from "react";
import { Order, OrderStatus } from "@/types/orders";
import { StatusBadge } from "./StatusBadge";
import Link from "next/link";
import {
  Eye,
  Printer,
  Download,
  Truck,
  RefreshCw,
  XCircle,
  MoreVertical,
  ChevronRight,
} from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
  selectedIds: string[];
  onSelectToggle: (id: string) => void;
  onSelectAllToggle: () => void;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
  onOpenInvoice: (order: Order) => void;
  onAssignCourier: (order: Order) => void;
  onOpenRefund: (order: Order) => void;
}

export function OrdersTable({
  orders,
  selectedIds,
  onSelectToggle,
  onSelectAllToggle,
  onStatusUpdate,
  onOpenInvoice,
  onAssignCourier,
  onOpenRefund,
}: OrdersTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected = orders.length > 0 && selectedIds.length === orders.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/70">
              <th className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAllToggle}
                  className="rounded border-gray-300 text-[#F57C00] focus:ring-[#F57C00]"
                />
              </th>
              <th className="p-3.5 font-mono">Order ID</th>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5 text-center">Items</th>
              <th className="p-3.5 text-right font-mono">Amount</th>
              <th className="p-3.5">Payment Method</th>
              <th className="p-3.5">Payment Status</th>
              <th className="p-3.5">Order Status</th>
              <th className="p-3.5 font-mono">Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400">
                  No orders found matching your search or filters.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isSelected = selectedIds.includes(order.id);
                const isMenuOpen = activeMenuId === order.id;

                return (
                  <tr
                    key={order.id}
                    className={`hover:bg-amber-50/20 transition-colors ${
                      isSelected ? "bg-amber-50/40" : ""
                    }`}
                  >
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectToggle(order.id)}
                        className="rounded border-gray-300 text-[#F57C00] focus:ring-[#F57C00]"
                      />
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-gray-900">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="hover:text-[#F57C00] transition-colors"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="p-3.5">
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer.name}</p>
                        <p className="text-[11px] text-gray-400">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="p-3.5 text-center font-semibold text-gray-700">
                      {order.itemsCount}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-gray-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-gray-600 font-medium">{order.paymentMethod}</td>
                    <td className="p-3.5">
                      <StatusBadge status={order.paymentStatus} type="payment" size="sm" />
                    </td>
                    <td className="p-3.5">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => onStatusUpdate(order.id, e.target.value as OrderStatus)}
                        className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F57C00]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="p-3.5 font-mono text-gray-500 text-[11px]">
                      <div>{order.date}</div>
                      <div className="text-gray-400">{order.time}</div>
                    </td>
                    <td className="p-3.5 text-right relative">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="p-1.5 text-gray-500 hover:text-[#F57C00] hover:bg-amber-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onOpenInvoice(order)}
                          className="p-1.5 text-gray-500 hover:text-[#F57C00] hover:bg-amber-50 rounded-lg transition-colors"
                          title="Print / View Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveMenuId(isMenuOpen ? null : order.id)}
                          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Action Menu */}
                      {isMenuOpen && (
                        <div
                          onMouseLeave={() => setActiveMenuId(null)}
                          className="absolute right-3 top-10 z-30 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 text-left animate-in fade-in-50 zoom-in-95"
                        >
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Details</span>
                          </Link>
                          <button
                            onClick={() => {
                              onOpenInvoice(order);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print / Download Invoice</span>
                          </button>
                          <button
                            onClick={() => {
                              onAssignCourier(order);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Assign Courier</span>
                          </button>
                          {order.paymentStatus === "Paid" && (
                            <button
                              onClick={() => {
                                onOpenRefund(order);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Issue Refund</span>
                            </button>
                          )}
                          {order.orderStatus !== "Cancelled" && (
                            <button
                              onClick={() => {
                                onStatusUpdate(order.id, "Cancelled");
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Cancel Order</span>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
