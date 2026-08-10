"use client";

import React, { useState } from "react";
import { CustomerAddress } from "@/types/customers";
import { MapPin, Copy, Check, Star } from "lucide-react";

interface AddressesCardProps {
  addresses: CustomerAddress[];
}

export function AddressesCard({ addresses }: AddressesCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (addr: CustomerAddress) => {
    const text = `${addr.name}\n${addr.street}\n${addr.landmark ? addr.landmark + "\n" : ""}${addr.city}, ${addr.state} - ${addr.pincode}\nPhone: ${addr.phone}`;
    navigator.clipboard.writeText(text);
    setCopiedId(addr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <MapPin className="w-5 h-5 text-[#F57C00]" />
        <h3 className="font-semibold text-gray-900 text-sm">Customer Addresses ({addresses.length})</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-3.5 bg-gray-50/70 border border-gray-100 rounded-xl space-y-1.5 relative group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{addr.type} Address</span>
                {addr.isDefault && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Default
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(addr)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded transition-colors"
                title="Copy Address"
              >
                {copiedId === addr.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="font-semibold text-gray-800">{addr.name}</p>
            <p className="text-gray-600">{addr.street}</p>
            {addr.landmark && <p className="text-gray-500">Landmark: {addr.landmark}</p>}
            <p className="text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
            <p className="font-mono text-gray-500 pt-1">Phone: {addr.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
