"use client";

import { useAccount } from "@/features/account/hooks/useAccount";
import { AccountSidebar } from "@/features/account/components/AccountSidebar";
import { AccountOrdersTab } from "@/features/account/components/AccountOrdersTab";
import { AccountWishlistTab } from "@/features/account/components/AccountWishlistTab";
import { AccountAddressesTab } from "@/features/account/components/AccountAddressesTab";
import { AccountRemindersTab } from "@/features/account/components/AccountRemindersTab";
import { AccountSettingsTab } from "@/features/account/components/AccountSettingsTab";
import { PageTransition } from "@/components/animations/PageTransition";
import { AnimatePresence, motion } from "framer-motion";
import { Package, Heart, MapPin, Calendar, Settings } from "lucide-react";

const sidebarItems = [
  { key: "orders" as const, label: "Order History", icon: Package },
  { key: "wishlist" as const, label: "Wishlist", icon: Heart },
  { key: "addresses" as const, label: "Saved Addresses", icon: MapPin },
  { key: "reminders" as const, label: "Puja Reminders", icon: Calendar },
  { key: "settings" as const, label: "Settings", icon: Settings },
];

export function AccountContent() {
  const {
    activeTab,
    setActiveTab,
    wishlistItems,
    reminders,
    toggleReminder,
  } = useAccount();

  return (
    <>
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 64px)",
          paddingBottom: 160,
          background: "var(--bg-primary)",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 56 }}
            className="account-layout"
          >
            {/* Sidebar — Desktop */}
            <AccountSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarItems={sidebarItems}
              wishlistLength={wishlistItems.length}
            />

            {/* Main Area */}
            <div style={{ minWidth: 0 }}>
              {/* Mobile Navigation */}
              <div
                className="account-tabs-mobile"
                style={{
                  display: "none",
                  gap: 8,
                  overflowX: "auto",
                  paddingBottom: 16,
                  marginBottom: 32,
                  scrollbarWidth: "none",
                }}
              >
                {sidebarItems.map((item) => {
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: 100,
                        border: `1.5px solid ${isActive ? "var(--accent-saffron)" : "var(--border)"}`,
                        background: isActive ? "var(--accent-saffron)" : "var(--bg-card)",
                        color: isActive ? "white" : "var(--text-secondary)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <item.icon size={13} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content Panels */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === "orders" && <AccountOrdersTab />}
                  {activeTab === "wishlist" && <AccountWishlistTab wishlistItems={wishlistItems} />}
                  {activeTab === "addresses" && <AccountAddressesTab />}
                  {activeTab === "reminders" && (
                    <AccountRemindersTab
                      reminders={reminders}
                      toggleReminder={toggleReminder}
                    />
                  )}
                  {activeTab === "settings" && <AccountSettingsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .account-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .account-sidebar {
            display: none !important;
          }
          .account-tabs-mobile {
            display: flex !important;
          }
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .wishlist-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
