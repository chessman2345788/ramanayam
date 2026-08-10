"use client";

import React from "react";
import { Settings, X, Bell, Mail, Smartphone, Volume2, ShieldAlert } from "lucide-react";
import { useNotifications } from "./NotificationsContext";

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({ isOpen, onClose }: NotificationSettingsModalProps) {
  const { settings, updateSettings } = useNotifications();

  if (!isOpen) return null;

  const toggleItems = [
    { key: "emailNotifications", label: "Email Notifications", desc: "Receive summary digests & instant emails", icon: Mail },
    { key: "pushNotifications", label: "Browser Push Notifications", desc: "Show desktop popups for new events", icon: Smartphone },
    { key: "soundAlerts", label: "Audio Sound Alerts", desc: "Play chime sound for high priority alerts", icon: Volume2 },
    { key: "orderAlerts", label: "New Order Alerts", desc: "Notify when customer places an order", icon: Bell },
    { key: "paymentAlerts", label: "Payment Gateway Alerts", desc: "Notify on UPI/Card payment failures", icon: ShieldAlert },
    { key: "lowStockAlerts", label: "Low Inventory Alerts", desc: "Notify when stock drops below threshold", icon: Bell },
    { key: "reviewAlerts", label: "Review Moderation Alerts", desc: "Notify when new customer reviews land", icon: Bell },
    { key: "securityAlerts", label: "Security & Login Warnings", desc: "Notify on unusual IP or login attempts", icon: ShieldAlert },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">Notification Preferences</h3>
              <p className="text-xs text-stone-500">Customize alerts and delivery channels.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {toggleItems.map((item) => {
            const IconComp = item.icon;
            const isChecked = settings[item.key as keyof typeof settings];
            return (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{item.label}</h4>
                    <p className="text-[11px] text-stone-500">{item.desc}</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => updateSettings({ [item.key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600" />
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end px-6 py-4 border-t border-stone-100 bg-stone-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-lg shadow-sm transition-all"
          >
            Done & Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
