"use client";

import React from "react";
import { Search, Globe, CheckCircle2 } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import { SettingsCard } from "./SettingsCard";

interface SeoSettingsProps {
  formData: any;
  onChange: (field: string, val: any) => void;
}

export function SeoSettings({ formData, onChange }: SeoSettingsProps) {
  return (
    <SettingsSection
      title="Search Engine Optimization (SEO) & Social Meta"
      subtitle="Meta titles, descriptions, canonical domain, OpenGraph preview cards, and sitemap settings"
      icon={Search}
    >
      <SettingsCard title="Store SEO Metadata">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Site Meta Title</label>
            <input
              type="text"
              value={formData.metaTitle || "Ramanayam | Pure Sacred Temple Products & Puja Essentials"}
              onChange={(e) => onChange("metaTitle", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={formData.metaDescription || "Shop authentic brass diyas, 5 mukhi rudraksha malas, puja thalis, Mysore sandalwood dhoop, and carved mandirs online with fast express delivery."}
              onChange={(e) => onChange("metaDescription", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Default Keywords (Comma Separated)</label>
            <input
              type="text"
              value={formData.seoKeywords || "temple items, brass diya, rudraksha mala, puja thali, dhoop cones, mandir decor"}
              onChange={(e) => onChange("seoKeywords", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Social Cards & Search Indexing">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Canonical Domain URL</label>
            <input
              type="text"
              value={formData.canonicalDomain || "https://ramanayam.com"}
              onChange={(e) => onChange("canonicalDomain", e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Open Graph Image (Social Card Preview)</label>
            <input
              type="text"
              value={formData.ogImage || "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=800"}
              onChange={(e) => onChange("ogImage", e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">XML Sitemap Status</div>
              <div className="text-[10px] text-stone-400">Auto-generated sitemap.xml for Googlebot</div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
            <div>
              <div className="font-bold text-stone-900">Robots.txt Indexing</div>
              <div className="text-[10px] text-stone-400">Allow search engine crawlers</div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Allow Indexing
            </span>
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
