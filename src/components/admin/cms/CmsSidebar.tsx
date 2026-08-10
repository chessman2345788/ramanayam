"use client";

import React from "react";
import {
  Megaphone,
  Layout,
  Image as ImageIcon,
  Grid,
  Layers,
  Package,
  Sparkles,
  MessageSquare,
  Mail,
  Columns,
  BookOpen,
  Phone,
  HelpCircle,
  FileText,
  Globe,
} from "lucide-react";

export type CmsSectionId =
  | "announcement"
  | "header"
  | "hero_slides"
  | "categories"
  | "collections"
  | "featured_products"
  | "festival_section"
  | "testimonials"
  | "newsletter"
  | "footer"
  | "about_us"
  | "contact"
  | "faq"
  | "policies"
  | "seo";

interface CmsSidebarProps {
  activeSection: CmsSectionId;
  onSelectSection: (section: CmsSectionId) => void;
}

const cmsItems: { id: CmsSectionId; label: string; icon: React.ElementType }[] = [
  { id: "announcement", label: "Announcement Bar", icon: Megaphone },
  { id: "header", label: "Header & Navigation", icon: Layout },
  { id: "hero_slides", label: "Hero Banner Slider", icon: ImageIcon },
  { id: "categories", label: "Categories Section", icon: Grid },
  { id: "collections", label: "Featured Collections", icon: Layers },
  { id: "featured_products", label: "Featured Products", icon: Package },
  { id: "festival_section", label: "Festival Specials Bar", icon: Sparkles },
  { id: "testimonials", label: "Devotee Reviews", icon: MessageSquare },
  { id: "newsletter", label: "Newsletter Signup", icon: Mail },
  { id: "footer", label: "Footer & Social", icon: Columns },
  { id: "about_us", label: "About Us Page", icon: BookOpen },
  { id: "contact", label: "Contact Us Page", icon: Phone },
  { id: "faq", label: "FAQ Accordions", icon: HelpCircle },
  { id: "policies", label: "Legal Policies", icon: FileText },
  { id: "seo", label: "SEO & Social Tags", icon: Globe },
];

export function CmsSidebar({ activeSection, onSelectSection }: CmsSidebarProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 220,
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: "#999999", padding: "8px 12px 4px", textTransform: "uppercase" }}>
        CMS Sections
      </div>

      {cmsItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectSection(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 8,
              border: "none",
              background: isActive ? "rgba(245,124,0,0.08)" : "transparent",
              color: isActive ? "#F57C00" : "#171717",
              fontSize: 12,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#FAF8F3";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            <IconComponent size={15} style={{ color: isActive ? "#F57C00" : "#666666" }} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
