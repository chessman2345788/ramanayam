"use client";

import React, { useState } from "react";
import { CustomerInfo, Address } from "@/types/orders";
import { User, MapPin, Phone, Mail, Award, Copy, Check } from "lucide-react";

interface CustomerCardProps {
  customer: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
}

export function CustomerCard({ customer, shippingAddress, billingAddress }: CustomerCardProps) {
  const [activeTab, setActiveTab] = useState<"shipping" | "billing">("shipping");
  const [copied, setCopied] = useState(false);

  const address = activeTab === "shipping" ? shippingAddress : billingAddress;

  const handleCopyAddress = () => {
    const text = `${address.name}\n${address.street}\n${address.landmark ? address.landmark + "\n" : ""}${address.city}, ${address.state} - ${address.pincode}\nPhone: ${address.phone}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      {/* Customer Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#F57C00] font-bold text-sm">
            {customer.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 text-sm">{customer.name}</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-50 text-[#F57C00] border border-amber-200">
                {customer.badge}
              </span>
            </div>
            <p className="text-xs text-gray-500">Member since {customer.joinedDate}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Orders / Spent</p>
          <p className="text-xs font-bold text-gray-900">
            {customer.totalOrders} / ₹{customer.totalSpent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-2 p-2 bg-gray-50/70 rounded-xl">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-50/70 rounded-xl">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{customer.phone}</span>
        </div>
      </div>

      {/* Address Section Tabs */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 bg-gray-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab("shipping")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeTab === "shipping" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Shipping Address
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeTab === "billing" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Billing Address
            </button>
          </div>
          <button
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-gray-800"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="p-3 bg-amber-50/30 border border-amber-100/60 rounded-xl text-xs text-gray-700 space-y-0.5">
          <p className="font-semibold text-gray-900">{address.name}</p>
          <p>{address.street}</p>
          {address.landmark && <p className="text-gray-500">Ref: {address.landmark}</p>}
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p className="font-mono text-gray-600 pt-1">Phone: {address.phone}</p>
        </div>
      </div>
    </div>
  );
}
