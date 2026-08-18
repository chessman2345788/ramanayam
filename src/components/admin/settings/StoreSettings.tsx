"use client";

import React from "react";
import { Store, AlertTriangle, ShieldCheck, ShoppingBag } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface StoreSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function StoreSettings({ formData, onChange }: StoreSettingsProps) {
  return (
    <SettingsSection
      title="Store Operations & Operational Controls"
      subtitle="Store status, maintenance mode, store banner announcements, and order limits"
      icon={Store}
    >
      <SettingsCard title="Store Operating Mode">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 bg-white rounded-xl border border-stone-200">
          <div>
            <div className="text-xs font-bold text-stone-900">Store Operational Status</div>
            <div className="text-[11px] text-stone-500">
              {formData.maintenanceMode
                ? "Store is currently in MAINTENANCE MODE. Customers cannot checkout."
                : "Store is OPEN and fully accepting customer orders online."}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange("maintenanceMode", false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !formData.maintenanceMode
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Store Open
            </button>
            <button
              type="button"
              onClick={() => onChange("maintenanceMode", true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                formData.maintenanceMode
                  ? "bg-rose-600 text-white shadow-2xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Maintenance Mode
            </button>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Store Messaging & Customer Announcements">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Store Announcement Banner (Header Bar)
            </label>
            <input
              type="text"
              value={formData.storeAnnouncement || "Free Express Shipping across India on orders over ₹799 | Festival Special Discounts Live"}
              onChange={(e) => onChange("storeAnnouncement", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Order Processing Customer Message (Checkout Confirmation Page)
            </label>
            <input
              type="text"
              value={formData.orderProcessingMessage || "Your sacred items are being carefully hand-packed with organic sandalwood dhoop & blessed before dispatch."}
              onChange={(e) => onChange("orderProcessingMessage", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Order Thresholds & COD Rules">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Minimum Order Value (₹)</label>
            <input
              type="number"
              value={formData.codMinOrder || 499}
              onChange={(e) => onChange("codMinOrder", Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</div>
              <div className="text-[10px] text-stone-400">Allow customers to pay via COD at doorstep</div>
            </div>
            <input
              type="checkbox"
              checked={formData.codEnabled ?? true}
              onChange={(e) => onChange("codEnabled", e.target.checked)}
              className="w-4 h-4 accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
