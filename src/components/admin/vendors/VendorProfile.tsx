"use client";

import React from "react";
import { Store, Mail, Phone, MapPin, Building2, FileText, Calendar, ShieldCheck } from "lucide-react";
import { AdminVendorDetail } from "@/data/mockVendorsData";
import { VendorStatusBadge } from "./VendorStatusBadge";

interface VendorProfileProps {
  vendor: AdminVendorDetail;
}

export function VendorProfile({ vendor }: VendorProfileProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-6">
      {/* Header Profile Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 overflow-hidden shrink-0 flex items-center justify-center text-amber-700 font-extrabold text-2xl shadow-2xs">
            {vendor.logo ? (
              <img src={vendor.logo} alt={vendor.businessName} className="w-full h-full object-cover" />
            ) : (
              vendor.businessName.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-extrabold text-stone-900 font-display">
                {vendor.businessName}
              </h2>
              <VendorStatusBadge status={vendor.status} />
              {vendor.isPrimary && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Primary Seller
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Owner: <span className="font-bold text-stone-800">{vendor.name}</span> • {vendor.businessType}
            </p>
            <div className="text-[11px] text-stone-400 font-mono mt-1">
              Vendor ID: {vendor.id} • Member since {vendor.joinedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Business Information Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-amber-600" />
          <span>Business & Compliance Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200/80 text-xs">
          <div>
            <div className="text-stone-400 font-medium">Business Name</div>
            <div className="font-bold text-stone-900 mt-0.5">{vendor.businessName}</div>
          </div>

          <div>
            <div className="text-stone-400 font-medium">GST Identification Number</div>
            <div className="font-mono font-bold text-stone-900 mt-0.5">{vendor.gstNumber}</div>
          </div>

          <div>
            <div className="text-stone-400 font-medium">PAN Number</div>
            <div className="font-mono font-bold text-stone-900 mt-0.5">{vendor.pan}</div>
          </div>

          <div>
            <div className="text-stone-400 font-medium">Official Contact Email</div>
            <div className="font-semibold text-stone-900 mt-0.5 flex items-center gap-1">
              <Mail className="w-3 h-3 text-stone-400" /> {vendor.email}
            </div>
          </div>

          <div>
            <div className="text-stone-400 font-medium">Contact Phone</div>
            <div className="font-mono font-semibold text-stone-900 mt-0.5 flex items-center gap-1">
              <Phone className="w-3 h-3 text-stone-400" /> {vendor.phone}
            </div>
          </div>

          <div>
            <div className="text-stone-400 font-medium">Registered Address</div>
            <div className="font-medium text-stone-800 mt-0.5 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="truncate">{vendor.businessAddress}, {vendor.city}, {vendor.state} - {vendor.pincode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
