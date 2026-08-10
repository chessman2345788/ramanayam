"use client";

import React from "react";
import { Customer } from "@/types/customers";
import { CustomerStatusBadge } from "./CustomerStatusBadge";
import { Mail, Phone, Calendar, ShoppingBag, IndianRupee, KeyRound, UserCog, Ban } from "lucide-react";

interface CustomerProfileCardProps {
  customer: Customer;
  onEditClick: () => void;
  onBlockToggle: () => void;
}

export function CustomerProfileCard({ customer, onEditClick, onBlockToggle }: CustomerProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      {/* Top Banner & Avatar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-[#F57C00] font-bold text-xl flex items-center justify-center border-2 border-amber-300 shadow-xs shrink-0">
            {customer.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">{customer.name}</h2>
              <CustomerStatusBadge status={customer.status} size="sm" />
              <CustomerStatusBadge status={customer.customerType} size="sm" />
              {customer.isVerified && <CustomerStatusBadge status="Verified" size="sm" />}
            </div>
            <p className="text-xs font-mono text-gray-500 mt-0.5">ID: {customer.id}</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEditClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold shadow-xs"
          >
            <UserCog className="w-4 h-4 text-[#F57C00]" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => alert(`Password reset link sent to ${customer.email}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold shadow-xs"
          >
            <KeyRound className="w-4 h-4 text-gray-500" />
            <span>Reset Password</span>
          </button>
          <button
            onClick={onBlockToggle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold shadow-xs"
          >
            <Ban className="w-4 h-4" />
            <span>{customer.status === "Blocked" ? "Unblock" : "Block"}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/60">
          <span className="text-gray-500 block text-[11px]">Lifetime Spent</span>
          <span className="text-base font-bold text-[#800000] font-mono">
            ₹{customer.totalSpent.toLocaleString()}
          </span>
        </div>
        <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100">
          <span className="text-gray-500 block text-[11px]">Total Orders</span>
          <span className="text-base font-bold text-gray-900">{customer.ordersCount}</span>
        </div>
        <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100">
          <span className="text-gray-500 block text-[11px]">Avg Order Value</span>
          <span className="text-base font-bold text-gray-900 font-mono">
            ₹{customer.avgOrderValue.toLocaleString()}
          </span>
        </div>
        <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100">
          <span className="text-gray-500 block text-[11px]">Joined Date</span>
          <span className="text-sm font-semibold text-gray-800">{customer.joinedDate}</span>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2.5 bg-gray-50/60 rounded-xl">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-medium">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 bg-gray-50/60 rounded-xl">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-mono">{customer.phone}</span>
        </div>
      </div>
    </div>
  );
}
