"use client";

import React, { useState } from "react";
import {
  Store,
  Building,
  CreditCard,
  Truck,
  Receipt,
  Mail,
  Bell,
  Users,
  Globe,
  Lock,
  Palette,
  Database,
  Key,
  Info,
  Send,
  Smartphone,
} from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsSidebar, SettingsSectionId } from "@/components/admin/settings/SettingsSidebar";
import { SettingsSection } from "@/components/admin/settings/SettingsSection";
import { ToggleCard } from "@/components/admin/settings/ToggleCard";
import { ApiKeyCard } from "@/components/admin/settings/ApiKeyCard";
import { ColorPicker } from "@/components/admin/settings/ColorPicker";
import { BackupCard } from "@/components/admin/settings/BackupCard";
import { UserRolesTable } from "@/components/admin/settings/UserRolesTable";
import { initialStoreSettings, StoreSettingsData } from "@/data/mockSettingsData";
import { AdminToast } from "@/components/admin/ui";

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>("general");
  const [settings, setSettings] = useState<StoreSettingsData>(initialStoreSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveSection = (sectionName: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(`${sectionName} settings saved successfully!`);
    }, 800);
  };

  const updateSetting = <K extends keyof StoreSettingsData>(key: K, val: StoreSettingsData[K]) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <AdminPageHeader
        title="Settings & System Preferences"
        subtitle="Manage store identity, payment gateways, shipping, security, and API integrations."
      />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SettingsSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
        </div>

        {/* Settings Panel Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* GENERAL */}
          {activeSection === "general" && (
            <SettingsSection
              title="General Store Information"
              subtitle="Basic store identity, contact info, currency, and localization."
              icon={Store}
              onSave={() => handleSaveSection("General")}
              isSaving={isSaving}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => updateSetting("storeName", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSetting("contactEmail", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Support Phone</label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => updateSetting("supportPhone", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Store Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => updateSetting("timezone", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  >
                    <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-600">Business Description</label>
                <textarea
                  rows={3}
                  value={settings.businessDescription}
                  onChange={(e) => updateSetting("businessDescription", e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                />
              </div>
            </SettingsSection>
          )}

          {/* STORE INFORMATION */}
          {activeSection === "store_info" && (
            <SettingsSection
              title="Legal Business & Invoice Details"
              subtitle="GSTIN, PAN number, registered office address, and invoice prefix."
              icon={Building}
              onSave={() => handleSaveSection("Store Information")}
              isSaving={isSaving}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Registered Business Name</label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => updateSetting("businessName", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">GSTIN Number</label>
                  <input
                    type="text"
                    value={settings.gstNumber}
                    onChange={(e) => updateSetting("gstNumber", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-bold font-mono text-stone-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">PAN Number</label>
                  <input
                    type="text"
                    value={settings.panNumber}
                    onChange={(e) => updateSetting("panNumber", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-bold font-mono text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Invoice Prefix</label>
                  <input
                    type="text"
                    value={settings.invoicePrefix}
                    onChange={(e) => updateSetting("invoicePrefix", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-600">Registered Office Address</label>
                <textarea
                  rows={2}
                  value={settings.businessAddress}
                  onChange={(e) => updateSetting("businessAddress", e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                />
              </div>
            </SettingsSection>
          )}

          {/* PAYMENTS */}
          {activeSection === "payments" && (
            <SettingsSection
              title="Payment Methods & Gateways"
              subtitle="Razorpay, Cash on Delivery, Direct UPI QR, and Bank Transfer."
              icon={CreditCard}
              onSave={() => handleSaveSection("Payments")}
              isSaving={isSaving}
            >
              <ToggleCard
                title="Razorpay Payment Gateway (UPI, Cards, NetBanking)"
                description="Accept online payments via Razorpay checkout integration."
                checked={settings.razorpayEnabled}
                onChange={(val) => updateSetting("razorpayEnabled", val)}
                badge={`Webhook: ${settings.razorpayWebhookStatus}`}
                icon={CreditCard}
              />

              <ToggleCard
                title="Razorpay Test Mode"
                description="Enable sandbox simulation mode for payment testing."
                checked={settings.razorpayTestMode}
                onChange={(val) => updateSetting("razorpayTestMode", val)}
                badge={settings.razorpayTestMode ? "TEST MODE" : "LIVE MODE"}
                badgeColor={settings.razorpayTestMode ? "#D97706" : "#16A34A"}
              />

              <ToggleCard
                title="Cash on Delivery (COD)"
                description="Allow devotees to pay cash upon order doorstep delivery."
                checked={settings.codEnabled}
                onChange={(val) => updateSetting("codEnabled", val)}
              />

              <ToggleCard
                title="Direct UPI / QR Code Payment"
                description="Display Instant UPI QR code for fast payment confirmation."
                checked={settings.upiEnabled}
                onChange={(val) => updateSetting("upiEnabled", val)}
              />
            </SettingsSection>
          )}

          {/* SHIPPING */}
          {activeSection === "shipping" && (
            <SettingsSection
              title="Shipping & Logistics Preferences"
              subtitle="Free shipping thresholds, default rates, and shipping zones."
              icon={Truck}
              onSave={() => handleSaveSection("Shipping")}
              isSaving={isSaving}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Free Shipping Limit (₹)</label>
                  <input
                    type="number"
                    value={settings.freeShippingLimit}
                    onChange={(e) => updateSetting("freeShippingLimit", Number(e.target.value))}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Default Shipping Charge (₹)</label>
                  <input
                    type="number"
                    value={settings.defaultShippingCharge}
                    onChange={(e) => updateSetting("defaultShippingCharge", Number(e.target.value))}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-stone-900">Shipping Delivery Zones</span>
                <div className="space-y-2">
                  {settings.shippingZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs"
                    >
                      <span className="font-semibold text-stone-900">{zone.name}</span>
                      <span className="text-amber-700 font-bold">₹{zone.charge} ({zone.deliveryTime})</span>
                    </div>
                  ))}
                </div>
              </div>
            </SettingsSection>
          )}

          {/* TAXES */}
          {activeSection === "taxes" && (
            <SettingsSection
              title="GST & Tax Rules"
              subtitle="GST rates, tax inclusive pricing, and invoice disclaimers."
              icon={Receipt}
              onSave={() => handleSaveSection("Taxes")}
              isSaving={isSaving}
            >
              <div className="flex flex-col gap-1.5 max-w-xs">
                <label className="text-xs font-semibold text-stone-600">Default GST Rate (%)</label>
                <input
                  type="number"
                  value={settings.gstPercentage}
                  onChange={(e) => updateSetting("gstPercentage", Number(e.target.value))}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                />
              </div>

              <ToggleCard
                title="Tax Inclusive Display Prices"
                description="All product store prices displayed include GST taxes automatically."
                checked={settings.taxInclusive}
                onChange={(val) => updateSetting("taxInclusive", val)}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-600">Invoice Disclaimer Footer</label>
                <textarea
                  rows={2}
                  value={settings.invoiceFooterText}
                  onChange={(e) => updateSetting("invoiceFooterText", e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                />
              </div>
            </SettingsSection>
          )}

          {/* EMAIL & SMTP */}
          {activeSection === "email" && (
            <SettingsSection
              title="Email Dispatch & SMTP Configuration"
              subtitle="Resend/SMTP credentials for transactional order emails."
              icon={Mail}
              onSave={() => handleSaveSection("Email")}
              isSaving={isSaving}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => updateSetting("smtpHost", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Sender Email</label>
                  <input
                    type="email"
                    value={settings.senderEmail}
                    onChange={(e) => updateSetting("senderEmail", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => showToast("Test email sent to " + settings.senderEmail)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-600" />
                  <span>Send Test Email</span>
                </button>
              </div>
            </SettingsSection>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <SettingsSection
              title="Admin & Customer Notifications"
              subtitle="Automated alerts for orders, stock changes, and customer reviews."
              icon={Bell}
              onSave={() => handleSaveSection("Notifications")}
              isSaving={isSaving}
            >
              <ToggleCard
                title="Order Confirmation Alerts"
                description="Send instant email & SMS when a devotee places an order."
                checked={settings.orderNotifications}
                onChange={(val) => updateSetting("orderNotifications", val)}
              />

              <ToggleCard
                title="Low Stock Inventory Alerts"
                description="Notify admin team when catalog items drop below low stock thresholds."
                checked={settings.lowStockAlerts}
                onChange={(val) => updateSetting("lowStockAlerts", val)}
              />

              <ToggleCard
                title="Customer Review Flag Alerts"
                description="Notify moderation queue when new customer reviews arrive."
                checked={settings.reviewAlerts}
                onChange={(val) => updateSetting("reviewAlerts", val)}
              />
            </SettingsSection>
          )}

          {/* USERS & ROLES */}
          {activeSection === "users_roles" && (
            <SettingsSection
              title="Admin Team & Access Controls"
              subtitle="Manage admin accounts, merchant permissions, and moderator roles."
              icon={Users}
            >
              <UserRolesTable
                users={settings.users}
                onInviteUser={(name, email, role) => {
                  const newUser = {
                    id: `u_${Date.now()}`,
                    name,
                    email,
                    role,
                    status: "ACTIVE" as const,
                    lastActive: "Just now",
                  };
                  updateSetting("users", [...settings.users, newUser]);
                  showToast(`Invitation sent to ${email}`);
                }}
              />
            </SettingsSection>
          )}

          {/* SEO & SOCIAL */}
          {activeSection === "seo" && (
            <SettingsSection
              title="Search Engine Optimization (SEO)"
              subtitle="Meta tags, site verification codes, and analytics tracking IDs."
              icon={Globe}
              onSave={() => handleSaveSection("SEO")}
              isSaving={isSaving}
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-600">Meta Title Tag</label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => updateSetting("metaTitle", e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-600">Meta Description Tag</label>
                <textarea
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => updateSetting("metaDescription", e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-medium text-stone-900 outline-hidden transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Google Analytics ID</label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-mono font-bold text-stone-900 outline-hidden transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-600">Facebook Pixel ID</label>
                  <input
                    type="text"
                    value={settings.facebookPixelId}
                    onChange={(e) => updateSetting("facebookPixelId", e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 text-xs font-mono font-bold text-stone-900 outline-hidden transition-all"
                  />
                </div>
              </div>
            </SettingsSection>
          )}

          {/* SECURITY & 2FA */}
          {activeSection === "security" && (
            <SettingsSection
              title="Security & Authentication"
              subtitle="Two-Factor Authentication (2FA), active admin sessions, and login logs."
              icon={Lock}
              onSave={() => handleSaveSection("Security")}
              isSaving={isSaving}
            >
              <ToggleCard
                title="Two-Factor Authentication (2FA)"
                description="Require authenticator app code for all admin logins."
                checked={settings.twoFactorEnabled}
                onChange={(val) => updateSetting("twoFactorEnabled", val)}
                badge={settings.twoFactorEnabled ? "2FA ENABLED" : "DISABLED"}
                icon={Smartphone}
              />

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-stone-900">Active Admin Sessions</span>
                <div className="space-y-2">
                  {settings.activeSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{session.device}</div>
                        <div className="text-xs text-stone-500">
                          IP: {session.ip} • Location: {session.location}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600">{session.lastActive}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SettingsSection>
          )}

          {/* APPEARANCE */}
          {activeSection === "appearance" && (
            <SettingsSection
              title="Appearance & Theme Customization"
              subtitle="Luxury Saffron & Maroon theme accents and store brand styling."
              icon={Palette}
              onSave={() => handleSaveSection("Appearance")}
              isSaving={isSaving}
            >
              <ColorPicker
                primaryColor={settings.primaryColor}
                accentColor={settings.accentColor}
                onChangePrimary={(col) => updateSetting("primaryColor", col)}
                onChangeAccent={(col) => updateSetting("accentColor", col)}
              />
            </SettingsSection>
          )}

          {/* BACKUP */}
          {activeSection === "backup" && (
            <SettingsSection
              title="Database Backup & Recovery"
              subtitle="Automated daily backups and manual system snapshot triggers."
              icon={Database}
            >
              <BackupCard
                lastBackupDate={settings.lastBackupDate}
                onBackupNow={() => showToast("Full database backup completed successfully!")}
                onRestore={() => showToast("Database restore simulation initiated.")}
              />
            </SettingsSection>
          )}

          {/* API KEYS */}
          {activeSection === "api_keys" && (
            <SettingsSection
              title="API Keys & Third-Party Credentials"
              subtitle="Secure credentials for Cloudinary, Razorpay, Google Maps, and Analytics."
              icon={Key}
            >
              <div className="space-y-3">
                {settings.apiKeys.map((keyItem) => (
                  <ApiKeyCard
                    key={keyItem.id}
                    serviceName={keyItem.serviceName}
                    maskedKey={keyItem.maskedKey}
                    fullKey={keyItem.fullKey}
                    status={keyItem.status}
                  />
                ))}
              </div>
            </SettingsSection>
          )}

          {/* ABOUT */}
          {activeSection === "about" && (
            <SettingsSection
              title="About Ramanayam System"
              subtitle="Platform version, build information, and technical support."
              icon={Info}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl">
                  <div className="text-xs text-stone-500 font-medium">System Version</div>
                  <div className="text-base font-extrabold text-amber-700 mt-1">
                    {settings.version}
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl">
                  <div className="text-xs text-stone-500 font-medium">Build Release</div>
                  <div className="text-sm font-bold text-stone-900 mt-1">
                    {settings.buildNumber}
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl">
                  <div className="text-xs text-stone-500 font-medium">License</div>
                  <div className="text-sm font-bold text-purple-700 mt-1">
                    {settings.licenseType}
                  </div>
                </div>
              </div>
            </SettingsSection>
          )}
        </div>
      </div>
    </div>
  );
}
