"use client";

import React from "react";
import { SlidersHorizontal, Image, Mail, Phone, Globe, Clock, Coins } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface GeneralSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function GeneralSettings({ formData, onChange }: GeneralSettingsProps) {
  return (
    <SettingsSection
      title="General Store Preferences"
      subtitle="Basic identity, support email, store logo, and regional localization"
      icon={SlidersHorizontal}
    >
      <SettingsCard title="Store Branding & Metadata">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Store Name</label>
            <input
              type="text"
              value={formData.storeName || "Ramanayam"}
              onChange={(e) => onChange("storeName", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Store Logo Image URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.storeLogo || ""}
                onChange={(e) => onChange("storeLogo", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              />
              {formData.storeLogo && (
                <img src={formData.storeLogo} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-stone-200 shrink-0" />
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Store Description</label>
          <textarea
            rows={3}
            value={formData.businessDescription || ""}
            onChange={(e) => onChange("businessDescription", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none resize-none"
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Support Contacts">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Store Email</label>
            <input
              type="email"
              value={formData.contactEmail || ""}
              onChange={(e) => onChange("contactEmail", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Support Email</label>
            <input
              type="email"
              value={formData.supportEmail || "support@ramanayam.com"}
              onChange={(e) => onChange("supportEmail", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Support Phone Number</label>
            <input
              type="text"
              value={formData.supportPhone || ""}
              onChange={(e) => onChange("supportPhone", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Regional Localization">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Currency</label>
            <select
              value={formData.currency || "INR (₹)"}
              onChange={(e) => onChange("currency", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none cursor-pointer"
            >
              <option value="INR (₹)">INR - Indian Rupee (₹)</option>
              <option value="USD ($)">USD - US Dollar ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Timezone</label>
            <select
              value={formData.timezone || "Asia/Kolkata (IST +5:30)"}
              onChange={(e) => onChange("timezone", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none cursor-pointer"
            >
              <option value="Asia/Kolkata (IST +5:30)">India / IST (+5:30)</option>
              <option value="UTC">UTC (Coordinated Universal Time)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Language</label>
            <select
              value={formData.language || "English"}
              onChange={(e) => onChange("language", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none cursor-pointer"
            >
              <option value="English">English (India)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
