"use client";

import React, { useState, useEffect } from "react";
import { Image, X } from "lucide-react";
import { StorefrontBanner, BannerLocation, BannerStatus } from "@/types/banners";
import { useBanners } from "./BannersContext";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bannerToEdit?: StorefrontBanner | null;
}

export function BannerModal({ isOpen, onClose, bannerToEdit }: BannerModalProps) {
  const { addBanner, updateBanner } = useBanners();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [location, setLocation] = useState<BannerLocation>("HOME_HERO");
  const [position, setPosition] = useState(1);
  const [status, setStatus] = useState<BannerStatus>("ACTIVE");

  useEffect(() => {
    if (bannerToEdit) {
      setTitle(bannerToEdit.title);
      setSubtitle(bannerToEdit.subtitle);
      setImageUrl(bannerToEdit.imageUrl);
      setCtaText(bannerToEdit.ctaText);
      setCtaLink(bannerToEdit.ctaLink);
      setLocation(bannerToEdit.location);
      setPosition(bannerToEdit.position);
      setStatus(bannerToEdit.status);
    } else {
      setTitle("");
      setSubtitle("");
      setImageUrl("https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=800&auto=format&fit=crop&q=80");
      setCtaText("Shop Now");
      setCtaLink("/products");
      setLocation("HOME_HERO");
      setPosition(1);
      setStatus("ACTIVE");
    }
  }, [bannerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (bannerToEdit) {
      updateBanner(bannerToEdit.id, {
        title,
        subtitle,
        imageUrl,
        ctaText,
        ctaLink,
        location,
        position: Number(position),
        status,
      });
    } else {
      addBanner({
        title,
        subtitle,
        imageUrl,
        ctaText,
        ctaLink,
        location,
        position: Number(position),
        status,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                {bannerToEdit ? "Edit Storefront Banner" : "Add Storefront Banner"}
              </h3>
              <p className="text-xs text-stone-500">Configure promotional hero banner or announcement strip.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Banner Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Diwali Sacred Puja Sangrah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 font-display font-bold text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Subtitle / Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief promo text..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Banner Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as BannerLocation)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white"
              >
                <option value="HOME_HERO">HOME_HERO (Homepage Hero Carousel)</option>
                <option value="ANNOUNCEMENT_STRIP">ANNOUNCEMENT_STRIP (Top Bar Banner)</option>
                <option value="CATEGORY_HEADER">CATEGORY_HEADER (Category Page Header)</option>
                <option value="FESTIVAL_POPUP">FESTIVAL_POPUP (Popup Modal)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Display Order Position
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                placeholder="e.g. Shop Collection"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                CTA Button Link
              </label>
              <input
                type="text"
                placeholder="e.g. /products?category=diyas"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Banner Background Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-stone-600">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 rounded-lg shadow-sm"
            >
              {bannerToEdit ? "Save Changes" : "Create Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
