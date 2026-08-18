"use client";

import React from "react";
import { Building2, FileText, MapPin, Mail, Phone } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface BusinessSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function BusinessSettings({ formData, onChange }: BusinessSettingsProps) {
  return (
    <SettingsSection
      title="Business & Legal Information"
      subtitle="Corporate entity, registered tax GSTIN, PAN, and official physical address"
      icon={Building2}
    >
      <SettingsCard title="Legal Identity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Display Business Name</label>
            <input
              type="text"
              value={formData.businessName || "Ramanayam Temple E-Commerce"}
              onChange={(e) => onChange("businessName", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Legal Registered Entity Name</label>
            <input
              type="text"
              value={formData.legalBusinessName || "Ramanayam Temple E-Commerce Pvt. Ltd."}
              onChange={(e) => onChange("legalBusinessName", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Tax Registrations">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">GSTIN Number</label>
            <input
              type="text"
              value={formData.gstNumber || "07AAAAA0000A1Z5"}
              onChange={(e) => onChange("gstNumber", e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">PAN Number</label>
            <input
              type="text"
              value={formData.panNumber || "ABCDE1234F"}
              onChange={(e) => onChange("panNumber", e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Registered Business Address & Contact">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address</label>
            <input
              type="text"
              value={formData.businessAddress || "108 Sacred Veda Marg, Heritage District"}
              onChange={(e) => onChange("businessAddress", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city || "Ayodhya"}
                onChange={(e) => onChange("city", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state || "Uttar Pradesh"}
                onChange={(e) => onChange("state", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">PIN Code</label>
              <input
                type="text"
                value={formData.pincode || "224123"}
                onChange={(e) => onChange("pincode", e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Official Business Email</label>
              <input
                type="email"
                value={formData.businessEmail || "corporate@ramanayam.in"}
                onChange={(e) => onChange("businessEmail", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Official Business Phone</label>
              <input
                type="text"
                value={formData.businessPhone || "+91 98765 00108"}
                onChange={(e) => onChange("businessPhone", e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
              />
            </div>
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
