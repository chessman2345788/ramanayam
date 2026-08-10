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

import { CmsStorefrontState } from "@/data/mockCmsData";
import { CmsSectionId } from "./CmsSidebar";
import { SectionEditor } from "./SectionEditor";
import { ToggleCard } from "./ToggleCard";
import { ColorPicker } from "./ColorPicker";
import { MediaSelector } from "./MediaSelector";
import { BannerEditor } from "./BannerEditor";
import { RichTextEditor } from "./RichTextEditor";
import { FaqAccordionEditor } from "./FaqAccordionEditor";

interface CmsEditorProps {
  activeSection: CmsSectionId;
  state: CmsStorefrontState;
  onChange: (newState: CmsStorefrontState) => void;
  onSaveSection: (sectionName: string) => void;
}

export function CmsEditor({ activeSection, state, onChange, onSaveSection }: CmsEditorProps) {
  // Helpers to update state
  const updateAnnouncement = (key: keyof CmsStorefrontState["announcement"], val: any) => {
    onChange({ ...state, announcement: { ...state.announcement, [key]: val } });
  };

  const updateHeader = (key: keyof CmsStorefrontState["header"], val: any) => {
    onChange({ ...state, header: { ...state.header, [key]: val } });
  };

  const updateFestival = (key: keyof CmsStorefrontState["festivalSection"], val: any) => {
    onChange({ ...state, festivalSection: { ...state.festivalSection, [key]: val } });
  };

  const updateFooter = (key: keyof CmsStorefrontState["footer"], val: any) => {
    onChange({ ...state, footer: { ...state.footer, [key]: val } });
  };

  const updateAbout = (key: keyof CmsStorefrontState["aboutUs"], val: any) => {
    onChange({ ...state, aboutUs: { ...state.aboutUs, [key]: val } });
  };

  const updateSeo = (key: keyof CmsStorefrontState["seo"], val: any) => {
    onChange({ ...state, seo: { ...state.seo, [key]: val } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ANNOUNCEMENT BAR */}
      {activeSection === "announcement" && (
        <SectionEditor
          title="Announcement Bar Settings"
          subtitle="Top banner bar for festival announcements and promo codes."
          icon={Megaphone}
          onSave={() => onSaveSection("Announcement Bar")}
        >
          <ToggleCard
            title="Enable Announcement Bar"
            description="Display promo banner bar at the top of every storefront page."
            checked={state.announcement.enabled}
            onChange={(val) => updateAnnouncement("enabled", val)}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <ColorPicker
              label="Background Color"
              value={state.announcement.bgColor}
              onChange={(col) => updateAnnouncement("bgColor", col)}
            />
            <ColorPicker
              label="Text Color"
              value={state.announcement.textColor}
              onChange={(col) => updateAnnouncement("textColor", col)}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Announcement Message Text</label>
            <input
              type="text"
              value={state.announcement.message}
              onChange={(e) => updateAnnouncement("message", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Button Text</label>
              <input
                type="text"
                value={state.announcement.buttonText}
                onChange={(e) => updateAnnouncement("buttonText", e.target.value)}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Button Target Link</label>
              <input
                type="text"
                value={state.announcement.buttonLink}
                onChange={(e) => updateAnnouncement("buttonLink", e.target.value)}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
              />
            </div>
          </div>
        </SectionEditor>
      )}

      {/* HEADER & NAVIGATION */}
      {activeSection === "header" && (
        <SectionEditor
          title="Header & Navigation Settings"
          subtitle="Logo upload, navigation links, search, wishlist, and sticky header."
          icon={Layout}
          onSave={() => onSaveSection("Header & Navigation")}
        >
          <MediaSelector
            label="Header Logo Image URL"
            value={state.header.logoUrl}
            onChange={(url) => updateHeader("logoUrl", url)}
          />

          <ToggleCard
            title="Sticky Navigation Header"
            description="Keep header navigation visible on scroll down."
            checked={state.header.stickyHeader}
            onChange={(val) => updateHeader("stickyHeader", val)}
          />

          <ToggleCard
            title="Search Bar Input"
            description="Enable instant product search modal icon."
            checked={state.header.searchToggle}
            onChange={(val) => updateHeader("searchToggle", val)}
          />

          <ToggleCard
            title="Wishlist Favorite Drawer"
            description="Display saved wishlist heart icon in header."
            checked={state.header.wishlistToggle}
            onChange={(val) => updateHeader("wishlistToggle", val)}
          />

          <ToggleCard
            title="Cart Drawer Icon"
            description="Display shopping cart drawer icon with item count badge."
            checked={state.header.cartToggle}
            onChange={(val) => updateHeader("cartToggle", val)}
          />
        </SectionEditor>
      )}

      {/* HERO BANNER SLIDER */}
      {activeSection === "hero_slides" && (
        <SectionEditor
          title="Hero Banner Slider"
          subtitle="Multiple slideshow banners, titles, subtitles, and CTA buttons."
          icon={ImageIcon}
          onSave={() => onSaveSection("Hero Banner Slider")}
        >
          <BannerEditor
            slides={state.heroSlides}
            onChange={(slides) => onChange({ ...state, heroSlides: slides })}
          />
        </SectionEditor>
      )}

      {/* FESTIVAL SPECIALS BAR */}
      {activeSection === "festival_section" && (
        <SectionEditor
          title="Festival Specials Bar"
          subtitle="Seasonal festival banner, titles, and target collection links."
          icon={Sparkles}
          onSave={() => onSaveSection("Festival Specials Bar")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Active Festival Campaign</label>
            <input
              type="text"
              value={state.festivalSection.activeFestival}
              onChange={(e) => updateFestival("activeFestival", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Section Title</label>
            <input
              type="text"
              value={state.festivalSection.title}
              onChange={(e) => updateFestival("title", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Subtitle Description</label>
            <input
              type="text"
              value={state.festivalSection.subtitle}
              onChange={(e) => updateFestival("subtitle", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <MediaSelector
            label="Festival Banner Image URL"
            value={state.festivalSection.bannerUrl}
            onChange={(url) => updateFestival("bannerUrl", url)}
          />
        </SectionEditor>
      )}

      {/* FOOTER & SOCIAL */}
      {activeSection === "footer" && (
        <SectionEditor
          title="Footer & Social Links"
          subtitle="Company name, contact details, social media handles, and copyright notice."
          icon={Columns}
          onSave={() => onSaveSection("Footer")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Company Name</label>
            <input
              type="text"
              value={state.footer.companyName}
              onChange={(e) => updateFooter("companyName", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Registered Office Address</label>
            <textarea
              rows={2}
              value={state.footer.address}
              onChange={(e) => updateFooter("address", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Copyright Notice</label>
            <input
              type="text"
              value={state.footer.copyrightText}
              onChange={(e) => updateFooter("copyrightText", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>
        </SectionEditor>
      )}

      {/* ABOUT US PAGE */}
      {activeSection === "about_us" && (
        <SectionEditor
          title="About Us Page Content"
          subtitle="Store story, mission statement, vision, and heritage images."
          icon={BookOpen}
          onSave={() => onSaveSection("About Us")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Page Title</label>
            <input
              type="text"
              value={state.aboutUs.title}
              onChange={(e) => updateAbout("title", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <RichTextEditor
            label="Story & Heritage Content"
            value={state.aboutUs.content}
            onChange={(val) => updateAbout("content", val)}
            rows={5}
          />
        </SectionEditor>
      )}

      {/* FAQ ACCORDIONS */}
      {activeSection === "faq" && (
        <SectionEditor
          title="FAQ Accordions Builder"
          subtitle="Frequently asked questions and answers for store devotees."
          icon={HelpCircle}
          onSave={() => onSaveSection("FAQ Accordions")}
        >
          <FaqAccordionEditor
            faqs={state.faqs}
            onChange={(faqs) => onChange({ ...state, faqs })}
          />
        </SectionEditor>
      )}

      {/* SEO TAGS */}
      {activeSection === "seo" && (
        <SectionEditor
          title="SEO & Social Sharing Tags"
          subtitle="Homepage meta title, description, keywords, and Open Graph image."
          icon={Globe}
          onSave={() => onSaveSection("SEO Tags")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Homepage Meta Title Tag</label>
            <input
              type="text"
              value={state.seo.homepageTitle}
              onChange={(e) => updateSeo("homepageTitle", e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
            />
          </div>

          <RichTextEditor
            label="Meta Description Tag"
            value={state.seo.metaDescription}
            onChange={(val) => updateSeo("metaDescription", val)}
            rows={3}
          />
        </SectionEditor>
      )}
    </div>
  );
}
