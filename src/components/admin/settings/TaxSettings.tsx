"use client";

import React from "react";
import { Receipt, FileText, Percent } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface TaxSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function TaxSettings({ formData, onChange }: TaxSettingsProps) {
  return (
    <SettingsSection
      title="Taxes & GST Compliance Rules"
      subtitle="Goods and Services Tax (GST) configuration, default tax percentage, and invoice calculation rules"
      icon={Receipt}
    >
      <SettingsCard title="GST Calculation Rules">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Default GST Rate (%)</label>
            <input
              type="number"
              value={formData.gstPercentage || 18}
              onChange={(e) => onChange("gstPercentage", Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-900">Tax Inclusive Pricing</div>
              <div className="text-[10px] text-stone-400">All listed catalog prices include GST</div>
            </div>
            <input
              type="checkbox"
              checked={formData.taxInclusive ?? true}
              onChange={(e) => onChange("taxInclusive", e.target.checked)}
              className="w-4 h-4 accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Invoice Registration Footer Text">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Tax Invoice Footer Note (Appears on GSTR PDFs)
          </label>
          <textarea
            rows={2}
            value={formData.invoiceFooterText || "Thank you for worshipping with Ramanayam. All brassware and sacred prasadam items certified authentic."}
            onChange={(e) => onChange("invoiceFooterText", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none resize-none"
          />
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
