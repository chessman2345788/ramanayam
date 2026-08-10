import { motion } from "framer-motion";
import { LogOut, LucideIcon } from "lucide-react";
import type { Tab } from "../hooks/useAccount";

interface SidebarItem {
  key: Tab;
  label: string;
  icon: LucideIcon;
}

interface AccountSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  sidebarItems: SidebarItem[];
  wishlistLength: number;
}

export function AccountSidebar({
  activeTab,
  setActiveTab,
  sidebarItems,
  wishlistLength,
}: AccountSidebarProps) {
  return (
    <aside
      className="account-sidebar"
      style={{
        position: "sticky",
        top: 110,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 28,
        padding: 28,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Profile Card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingBottom: 24,
          borderBottom: "1px solid var(--border)",
          marginBottom: 24,
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, var(--accent-gold), var(--accent-saffron))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(245,124,0,0.15)",
          }}
        >
          G
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Guest Devotee
          </h3>
          <p
            className="text-eyebrow"
            style={{ fontSize: 9, color: "var(--accent-gold)", margin: "2px 0 0" }}
          >
            Auspicious Altar
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {sidebarItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: isActive ? "1px solid var(--accent-saffron-hover)" : "1px solid transparent",
                background: isActive ? "var(--accent-saffron-light)" : "transparent",
                color: isActive ? "var(--accent-saffron)" : "var(--text-secondary)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textAlign: "left",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="activeSideIndicator"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 14,
                    bottom: 14,
                    width: 3,
                    borderRadius: 100,
                    background: "var(--accent-saffron)",
                  }}
                />
              )}
              <item.icon size={16} />
              <span style={{ fontFamily: "var(--font-body)", flex: 1 }}>{item.label}</span>
              {item.key === "wishlist" && wishlistLength > 0 && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "white",
                    background: "var(--accent-saffron)",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {wishlistLength}
                </span>
              )}
            </button>
          );
        })}

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid transparent",
            background: "transparent",
            color: "var(--error)",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textAlign: "left",
            marginTop: 24,
          }}
        >
          <LogOut size={16} />
          <span style={{ fontFamily: "var(--font-body)" }}>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
export default AccountSidebar;
