"use client";

import React, { useState } from "react";
import { Customer } from "@/types/customers";
import { CustomerStatusBadge } from "./CustomerStatusBadge";
import Link from "next/link";
import {
  User,
  Eye,
  UserCog,
  ShoppingBag,
  KeyRound,
  Ban,
  Trash2,
  MoreVertical,
} from "lucide-react";

interface CustomersTableProps {
  customers: Customer[];
  selectedIds: string[];
  onSelectToggle: (id: string) => void;
  onSelectAllToggle: () => void;
  onEditClick: (customer: Customer) => void;
  onBlockClick: (customer: Customer) => void;
  onDeleteClick: (id: string) => void;
}

export function CustomersTable({
  customers,
  selectedIds,
  onSelectToggle,
  onSelectAllToggle,
  onEditClick,
  onBlockClick,
  onDeleteClick,
}: CustomersTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected = customers.length > 0 && selectedIds.length === customers.length;

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
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5 text-center">Orders</th>
              <th className="p-3.5 text-right font-mono">Total Spent</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 font-mono">Joined Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-gray-400">
                  No customers found matching your search or filters.
                </td>
              </tr>
            ) : (
              customers.map((cust) => {
                const isSelected = selectedIds.includes(cust.id);
                const isMenuOpen = activeMenuId === cust.id;

                return (
                  <tr
                    key={cust.id}
                    className={`hover:bg-amber-50/20 transition-colors ${
                      isSelected ? "bg-amber-50/40" : ""
                    }`}
                  >
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectToggle(cust.id)}
                        className="rounded border-gray-300 text-[#F57C00] focus:ring-[#F57C00]"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-[#F57C00] font-bold flex items-center justify-center text-xs shrink-0">
                          {cust.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/admin/customers/${cust.id}`}
                            className="font-semibold text-gray-900 hover:text-[#F57C00] transition-colors"
                          >
                            {cust.name}
                          </Link>
                          <p className="text-[11px] font-mono text-gray-400">{cust.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-gray-600">{cust.email}</td>
                    <td className="p-3.5 font-mono text-gray-600">{cust.phone}</td>
                    <td className="p-3.5 text-center font-semibold text-gray-800">
                      {cust.ordersCount}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-[#800000]">
                      ₹{cust.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        <CustomerStatusBadge status={cust.status} size="sm" />
                        <CustomerStatusBadge status={cust.customerType} size="sm" />
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-gray-500 text-[11px]">{cust.joinedDate}</td>
                    <td className="p-3.5 text-right relative">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/customers/${cust.id}`}
                          className="p-1.5 text-gray-500 hover:text-[#F57C00] hover:bg-amber-50 rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onEditClick(cust)}
                          className="p-1.5 text-gray-500 hover:text-[#F57C00] hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Customer"
                        >
                          <UserCog className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveMenuId(isMenuOpen ? null : cust.id)}
                          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          onMouseLeave={() => setActiveMenuId(null)}
                          className="absolute right-3 top-10 z-30 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1 text-left animate-in fade-in-50 zoom-in-95"
                        >
                          <Link
                            href={`/admin/customers/${cust.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <User className="w-3.5 h-3.5" />
                            <span>View Profile</span>
                          </Link>
                          <button
                            onClick={() => {
                              onEditClick(cust);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <UserCog className="w-3.5 h-3.5" />
                            <span>Edit Customer</span>
                          </button>
                          <Link
                            href={`/admin/orders?search=${cust.email}`}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>View Orders</span>
                          </Link>
                          <button
                            onClick={() => {
                              alert(`Password reset link sent to ${cust.email}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-amber-50 hover:text-[#F57C00]"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Reset Password</span>
                          </button>
                          <button
                            onClick={() => {
                              onBlockClick(cust);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>{cust.status === "Blocked" ? "Unblock" : "Block Customer"}</span>
                          </button>
                          <button
                            onClick={() => {
                              onDeleteClick(cust.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 border-t border-gray-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Customer</span>
                          </button>
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
