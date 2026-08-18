"use client";

import React from "react";
import { ShieldCheck, Lock, Smartphone, Laptop, AlertTriangle, Key } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface SecuritySettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function SecuritySettings({ formData, onChange }: SecuritySettingsProps) {
  const sessions = [
    { device: "Chrome on macOS (Current)", ip: "103.21.124.8", location: "New Delhi, IN", lastActive: "Active now" },
    { device: "Safari on iPhone 15 Pro", ip: "49.36.88.12", location: "Ayodhya, IN", lastActive: "3 hours ago" },
  ];

  const history = [
    { timestamp: "12 Aug 2026, 10:15 AM", ip: "103.21.124.8", device: "Chrome / macOS", status: "SUCCESS" },
    { timestamp: "11 Aug 2026, 06:40 PM", ip: "49.36.88.12", device: "Safari / iOS", status: "SUCCESS" },
    { timestamp: "10 Aug 2026, 11:20 AM", ip: "182.74.90.1", device: "Firefox / Windows", status: "FAILED" },
  ];

  return (
    <SettingsSection
      title="Admin Security & Access Controls"
      subtitle="Password updates, 2FA authentication, active sessions, and security logs"
      icon={ShieldCheck}
    >
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Backend Integration Notice:</strong> Security authentication actions require backend API connection. UI controls are provided for testing.
        </span>
      </div>

      <SettingsCard title="Password & Two-Factor Authentication">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200 text-xs">
            <div>
              <div className="font-bold text-stone-900">Two-Factor Authentication (2FA)</div>
              <div className="text-[10px] text-stone-400">Require authenticator app TOTP code on login</div>
            </div>
            <input
              type="checkbox"
              checked={formData.twoFactorEnabled ?? true}
              onChange={(e) => onChange("twoFactorEnabled", e.target.checked)}
              className="w-4 h-4 accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Change Admin Password</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Active Logged-In Sessions">
        <div className="space-y-2">
          {sessions.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-xs">
              <div className="flex items-center gap-2.5">
                <Laptop className="w-4 h-4 text-stone-500" />
                <div>
                  <div className="font-bold text-stone-900">{s.device}</div>
                  <div className="text-[10px] text-stone-400">IP: {s.ip} • {s.location}</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {s.lastActive}
              </span>
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Recent Login History Log">
        <div className="space-y-2">
          {history.map((h, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg text-xs font-mono">
              <div className="text-stone-700">{h.timestamp}</div>
              <div className="text-stone-500">{h.device} ({h.ip})</div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${h.status === "SUCCESS" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                {h.status}
              </span>
            </div>
          ))}
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
