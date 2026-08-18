"use client";

import React from "react";
import { Bell, Mail, MessageSquare } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface NotificationSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function NotificationSettings({ formData, onChange }: NotificationSettingsProps) {
  const notifs = [
    { key: "orderConfirmation", label: "Order Confirmation", desc: "Sent when customer places an order" },
    { key: "paymentConfirmation", label: "Payment Confirmation", desc: "Sent when UPI or Card payment succeeds" },
    { key: "orderShipped", label: "Order Shipped", desc: "Sent when order tracking number is assigned" },
    { key: "orderDelivered", label: "Order Delivered", desc: "Sent upon successful doorstep delivery" },
    { key: "orderCancelled", label: "Order Cancelled", desc: "Sent when order cancellation is processed" },
    { key: "lowStockAlert", label: "Low Stock Alert", desc: "Admin alert when product inventory dips below reorder point" },
    { key: "newCustomerReg", label: "New Customer Registration", desc: "Admin notification when new devotee registers" },
    { key: "newReviewSubmitted", label: "New Product Review", desc: "Admin notification for moderation when customer submits review" },
  ];

  return (
    <SettingsSection
      title="Automated Customer & Admin Notifications"
      subtitle="Configure email and SMS alert triggers for orders, shipping updates, low stock, and reviews"
      icon={Bell}
    >
      <SettingsCard title="Notification Triggers">
        <div className="space-y-3">
          {notifs.map((n) => {
            const isChecked = formData[n.key] ?? true;
            return (
              <div key={n.key} className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200 text-xs">
                <div>
                  <div className="font-bold text-stone-900">{n.label}</div>
                  <div className="text-[10px] text-stone-400">{n.desc}</div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onChange(n.key, e.target.checked)}
                    className="w-4 h-4 accent-amber-600 cursor-pointer"
                  />
                  <span className="text-stone-600 font-semibold">{isChecked ? "Active" : "Off"}</span>
                </label>
              </div>
            );
          })}
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
