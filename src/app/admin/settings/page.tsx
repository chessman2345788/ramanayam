"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import {
  SettingsSidebar,
  SettingsTabId,
  GeneralSettings,
  StoreSettings,
  BusinessSettings,
  PaymentSettings,
  ShippingSettings,
  TaxSettings,
  NotificationSettings,
  SeoSettings,
  SecuritySettings,
  AccountSettings,
  SaveBar,
} from "@/components/admin/settings";
import { initialStoreSettings } from "@/data/mockSettingsData";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("general");
  const [formData, setFormData] = useState<any>({ ...initialStoreSettings });
  const [originalData, setOriginalData] = useState<any>({ ...initialStoreSettings });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const rawSettings = await AdminService.fetchSettingsFromApi();
      if (Array.isArray(rawSettings) && rawSettings.length > 0) {
        const dbMapped: Record<string, any> = {};
        for (const item of rawSettings) {
          try {
            // Attempt JSON parse for boolean/number/object strings
            dbMapped[item.key] = JSON.parse(item.value);
          } catch {
            dbMapped[item.key] = item.value;
          }
        }

        const merged = { ...initialStoreSettings, ...dbMapped };
        setFormData(merged);
        setOriginalData(merged);
      }
    } catch (err: any) {
      console.error("Failed to load store settings from API:", err);
      showToast("Notice: Using default settings (backend store configuration unpopulated).");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleFieldChange = (field: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: val }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // List of keys to exclude from database persistence (secrets & transient states)
    const SECRET_AND_COMPLEX_KEYS = new Set([
      "DATABASE_URL",
      "JWT_SECRET",
      "JWT_REFRESH_SECRET",
      "RAZORPAY_KEY_SECRET",
      "CLOUDINARY_API_SECRET",
      "activeSessions",
      "loginHistory",
      "apiKeys",
      "users",
    ]);

    try {
      const settingsList: Array<{ key: string; value: string; category: string }> = [];

      for (const [key, value] of Object.entries(formData)) {
        if (SECRET_AND_COMPLEX_KEYS.has(key)) continue;

        let strValue = "";
        if (typeof value === "object" && value !== null) {
          strValue = JSON.stringify(value);
        } else {
          strValue = String(value ?? "");
        }

        let category = "GENERAL";
        if (["businessName", "gstNumber", "panNumber", "businessAddress", "invoicePrefix", "orderPrefix"].includes(key)) {
          category = "BUSINESS";
        } else if (["razorpayEnabled", "razorpayTestMode", "codEnabled", "codMinOrder", "bankTransferEnabled", "upiEnabled"].includes(key)) {
          category = "PAYMENTS";
        } else if (["freeShippingLimit", "defaultShippingCharge", "deliveryTime"].includes(key)) {
          category = "SHIPPING";
        } else if (["gstPercentage", "taxInclusive", "taxExclusive", "invoiceFooterText"].includes(key)) {
          category = "TAX";
        } else if (["orderNotifications", "lowStockAlerts", "paymentAlerts", "reviewAlerts"].includes(key)) {
          category = "NOTIFICATIONS";
        } else if (["metaTitle", "metaDescription", "googleVerification", "facebookPixelId", "googleAnalyticsId"].includes(key)) {
          category = "SEO";
        }

        settingsList.push({ key, value: strValue, category });
      }

      await AdminService.updateSettingsBulkInApi(settingsList);

      setOriginalData({ ...formData });
      setHasUnsavedChanges(false);
      showToast("Store settings saved to database successfully!");
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to save settings.";
      showToast(`Error: ${errMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...originalData });
    setHasUnsavedChanges(false);
    showToast("Settings reset to original values.");
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Notification */}
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900 font-display">
                Settings & Configuration
              </h1>
              {hasUnsavedChanges && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                  Unsaved Changes
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage store branding, operations, payment channels, shipping, taxes, and security.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-stone-700">Loading store configuration from database...</p>
        </div>
      ) : (
        /* Main Settings Grid (Sidebar + Content Panel) */
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Navigation Sidebar */}
          <SettingsSidebar
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            hasUnsavedChanges={hasUnsavedChanges}
          />

          {/* Right Active Content Panel */}
          <div className="flex-1 w-full space-y-6">
            {activeTab === "general" && (
              <GeneralSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "store" && (
              <StoreSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "business" && (
              <BusinessSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "payments" && (
              <PaymentSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "shipping" && (
              <ShippingSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "taxes" && (
              <TaxSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "notifications" && (
              <NotificationSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "seo" && (
              <SeoSettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "security" && (
              <SecuritySettings formData={formData} onChange={handleFieldChange} />
            )}

            {activeTab === "account" && (
              <AccountSettings
                formData={formData}
                onChange={handleFieldChange}
                onLogout={() => showToast("Admin session logout triggered.")}
              />
            )}
          </div>
        </div>
      )}

      {/* Floating Save Bar */}
      <SaveBar
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onCancel={handleCancel}
        onReset={handleReset}
        isSaving={isSaving}
      />
    </div>
  );
}
