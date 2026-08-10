"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { FestivalCampaign, FestivalStatus } from "@/types/festivals";
import { useFestivals } from "./FestivalsContext";

interface FestivalModalProps {
  isOpen: boolean;
  onClose: () => void;
  festivalToEdit?: FestivalCampaign | null;
}

export function FestivalModal({ isOpen, onClose, festivalToEdit }: FestivalModalProps) {
  const { addFestival, updateFestival } = useFestivals();
  const [name, setName] = useState("");
  const [sanskritName, setSanskritName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(20);
  const [featuredCategory, setFeaturedCategory] = useState("Brass Diyas & Puja Kits");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FestivalStatus>("SCHEDULED");

  useEffect(() => {
    if (festivalToEdit) {
      setName(festivalToEdit.name);
      setSanskritName(festivalToEdit.sanskritName);
      setStartDate(festivalToEdit.startDate);
      setEndDate(festivalToEdit.endDate);
      setDiscountPercentage(festivalToEdit.discountPercentage);
      setFeaturedCategory(festivalToEdit.featuredCategory);
      setDescription(festivalToEdit.description);
      setStatus(festivalToEdit.status);
    } else {
      setName("");
      setSanskritName("");
      setStartDate("2026-09-01");
      setEndDate("2026-09-10");
      setDiscountPercentage(20);
      setFeaturedCategory("Brass Diyas & Puja Kits");
      setDescription("");
      setStatus("SCHEDULED");
    }
  }, [festivalToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (festivalToEdit) {
      updateFestival(festivalToEdit.id, {
        name,
        sanskritName,
        startDate,
        endDate,
        discountPercentage: Number(discountPercentage),
        featuredCategory,
        description,
        status,
      });
    } else {
      addFestival({
        name,
        sanskritName,
        startDate,
        endDate,
        discountPercentage: Number(discountPercentage),
        featuredCategory,
        bannerImage: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=600&auto=format&fit=crop&q=80",
        description,
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
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                {festivalToEdit ? "Edit Festival Campaign" : "Schedule Festival Campaign"}
              </h3>
              <p className="text-xs text-stone-500">Configure festival promotional details & dates.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Festival Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Navratri Festival"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Sanskrit / Devnagari Title
              </label>
              <input
                type="text"
                placeholder="e.g. नवरात्रि पूजा"
                value={sanskritName}
                onChange={(e) => setSanskritName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Discount Offer (%)
              </label>
              <input
                type="number"
                min="0"
                max="90"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as FestivalStatus)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Featured Category / Collection
            </label>
            <input
              type="text"
              placeholder="e.g. Brass Diyas & Mandir Decor"
              value={featuredCategory}
              onChange={(e) => setFeaturedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Campaign Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief description of sacred items, prashad combos, and festival highlights..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              {festivalToEdit ? "Save Changes" : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
