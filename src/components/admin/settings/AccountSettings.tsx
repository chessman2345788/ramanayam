"use client";

import React from "react";
import { User, Mail, Shield, LogOut, Key } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface AccountSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
  onLogout?: () => void;
}

export function AccountSettings({ formData, onChange, onLogout }: AccountSettingsProps) {
  return (
    <SettingsSection
      title="Admin Profile & Account Preferences"
      subtitle="Personal administrator details, avatar image, role assignment, and session logout"
      icon={User}
    >
      <SettingsCard title="Administrator Profile">
        <div className="flex items-center gap-4 pb-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-extrabold text-xl overflow-hidden shrink-0 shadow-2xs">
            {formData.adminAvatar ? (
              <img src={formData.adminAvatar} alt="Admin Avatar" className="w-full h-full object-cover" />
            ) : (
              "A"
            )}
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-stone-900">
              {formData.adminName || "Pandit Rajesh Sharma"}
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Super Administrator</span>
            </div>
            <div className="text-[10px] text-stone-400 font-mono">ID: adm_108420</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.adminName || "Pandit Rajesh Sharma"}
              onChange={(e) => onChange("adminName", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
            <input
              type="email"
              value={formData.adminEmail || "rajesh.admin@ramanayam.com"}
              onChange={(e) => onChange("adminEmail", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Account Security & Session Management">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-stone-200">
          <div>
            <div className="text-xs font-bold text-stone-900">Sign Out of Admin Dashboard</div>
            <div className="text-[10px] text-stone-400">End your current administrator session securely</div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Account</span>
          </button>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
