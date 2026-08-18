"use client";

import React from "react";
import { Truck, MapPin, PackageCheck } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface ShippingSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function ShippingSettings({ formData, onChange }: ShippingSettingsProps) {
  return (
    <SettingsSection
      title="Shipping & Fulfillment Rules"
      subtitle="Delivery options, free shipping thresholds, default shipping charges, and delivery timeframes"
      icon={Truck}
    >
      <SettingsCard title="Shipping Charges & Thresholds">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Free Shipping Order Threshold (₹)</label>
            <input
              type="number"
              value={formData.freeShippingLimit || 799}
              onChange={(e) => onChange("freeShippingLimit", Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Default Standard Shipping Charge (₹)</label>
            <input
              type="number"
              value={formData.defaultShippingCharge || 99}
              onChange={(e) => onChange("defaultShippingCharge", Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Estimated Standard Delivery Time</label>
            <input
              type="text"
              value={formData.deliveryTime || "3-5 Business Days"}
              onChange={(e) => onChange("deliveryTime", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Shipping Methods & Regional Zones">
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">Standard Surface Delivery</div>
              <div className="text-[10px] text-stone-400">Rest of India standard shipping via BlueDart / Delhivery</div>
            </div>
            <div className="font-extrabold text-amber-700">₹99</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">Express Air Delivery</div>
              <div className="text-[10px] text-stone-400">Priority 1-2 day express air shipping for temple rituals</div>
            </div>
            <div className="font-extrabold text-amber-700">₹199</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">Metro Cities Priority Zone</div>
              <div className="text-[10px] text-stone-400">Delhi NCR, Mumbai, Bengaluru, Pune, Kolkata, Chennai</div>
            </div>
            <div className="font-extrabold text-amber-700">₹49</div>
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
