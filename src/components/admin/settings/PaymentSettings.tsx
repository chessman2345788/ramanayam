"use client";

import React from "react";
import { CreditCard, ShieldCheck, Key, Lock, CheckCircle2 } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface PaymentSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function PaymentSettings({ formData, onChange }: PaymentSettingsProps) {
  return (
    <SettingsSection
      title="Payment Gateways & Checkout Channels"
      subtitle="Configure payment methods, Razorpay gateway settings, and COD rules (Keys are securely masked)"
      icon={CreditCard}
    >
      {/* Razorpay Card */}
      <SettingsCard title="Razorpay Gateway (UPI, Cards, NetBanking)">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900">Razorpay Integration</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Gateway
                </span>
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">Supports UPI, RuPay, Credit/Debit Cards, NetBanking</div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.razorpayEnabled ?? true}
                  onChange={(e) => onChange("razorpayEnabled", e.target.checked)}
                  className="w-4 h-4 accent-amber-600 cursor-pointer"
                />
                <span>Enable Razorpay</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.razorpayTestMode ?? false}
                  onChange={(e) => onChange("razorpayTestMode", e.target.checked)}
                  className="w-4 h-4 accent-amber-600 cursor-pointer"
                />
                <span>Test Mode</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-stone-400" /> Razorpay Key ID (Public)
              </label>
              <input
                type="text"
                readOnly
                value="rzp_live_849201••••••••••••"
                className="w-full px-3 py-2 text-xs font-mono bg-stone-100 border border-stone-200 rounded-xl text-stone-600 cursor-not-allowed select-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-stone-400" /> Razorpay Key Secret (Server Only)
              </label>
              <input
                type="password"
                readOnly
                value="••••••••••••••••••••••••••••••••"
                className="w-full px-3 py-2 text-xs font-mono bg-stone-100 border border-stone-200 rounded-xl text-stone-600 cursor-not-allowed select-none"
              />
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Cash on Delivery Card */}
      <SettingsCard title="Cash on Delivery (COD)">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-stone-200">
          <div>
            <div className="text-xs font-bold text-stone-900">COD Doorstep Payment</div>
            <div className="text-[10px] text-stone-400">Collect cash or QR payment upon delivery</div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.codEnabled ?? true}
                onChange={(e) => onChange("codEnabled", e.target.checked)}
                className="w-4 h-4 accent-amber-600 cursor-pointer"
              />
              <span>Enable COD</span>
            </label>
          </div>
        </div>
      </SettingsCard>

      {/* Other Payment Methods */}
      <SettingsCard title="Additional Payment Channels">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">Direct Bank Transfer</div>
              <div className="text-[10px] text-stone-400">NEFT / RTGS / IMPS for high-value orders</div>
            </div>
            <input
              type="checkbox"
              checked={formData.bankTransferEnabled ?? true}
              onChange={(e) => onChange("bankTransferEnabled", e.target.checked)}
              className="w-4 h-4 accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">UPI Instant QR Code</div>
              <div className="text-[10px] text-stone-400">Google Pay, PhonePe, Paytm, BHIM</div>
            </div>
            <input
              type="checkbox"
              checked={formData.upiEnabled ?? true}
              onChange={(e) => onChange("upiEnabled", e.target.checked)}
              className="w-4 h-4 accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
