"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Wand2, Image as ImageIcon, Sparkles } from "lucide-react";
import { CategoryItem, CategoryStatus } from "@/types/category";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: Partial<CategoryItem>) => void;
  initialCategory?: CategoryItem | null;
  parentOptions: CategoryItem[];
  defaultParentId?: string | null;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCategory,
  parentOptions,
  defaultParentId = null,
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<CategoryStatus>("ACTIVE");
  const [activeTab, setActiveTab] = useState<"general" | "seo">("general");

  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name || "");
      setSlug(initialCategory.slug || "");
      setParentId(initialCategory.parentId || "");
      setDescription(initialCategory.description || "");
      setImage(initialCategory.image || "");
      setSeoTitle(initialCategory.seoTitle || "");
      setSeoDescription(initialCategory.seoDescription || "");
      setStatus(initialCategory.status || "ACTIVE");
    } else {
      setName("");
      setSlug("");
      setParentId(defaultParentId || "");
      setDescription("");
      setImage("");
      setSeoTitle("");
      setSeoDescription("");
      setStatus("ACTIVE");
    }
    setActiveTab("general");
  }, [initialCategory, defaultParentId, isOpen]);

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialCategory) {
      const newSlug = generateSlug(val);
      setSlug(newSlug);
      if (!seoTitle) setSeoTitle(`${val} | Ramanayam Admin`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parentObj = parentOptions.find((p) => p.id === parentId);

    onSave({
      id: initialCategory?.id,
      name,
      slug: slug || generateSlug(name),
      parentId: parentId || null,
      parentName: parentObj ? parentObj.name : null,
      description,
      image: image || "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80",
      status,
      seoTitle: seoTitle || `${name} - Sacred Ritual Collection`,
      seoDescription: seoDescription || description,
      productCount: initialCategory ? initialCategory.productCount : 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {initialCategory ? `Edit Category: ${initialCategory.name}` : "Create New Category"}
            </h2>
            <p className="text-xs text-stone-500">Configure catalogue category details, parent hierarchy, and SEO.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-stone-200 bg-stone-50/40 text-xs font-semibold px-6">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-amber-600 text-amber-700 font-bold"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            General & Hierarchy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "seo"
                ? "border-amber-600 text-amber-700 font-bold"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            SEO & Search Engine
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm">
          {activeTab === "general" ? (
            <>
              {/* Category Name & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Pooja Samagri"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                    <span>URL Slug</span>
                    <button
                      type="button"
                      onClick={() => setSlug(generateSlug(name))}
                      className="text-[11px] text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <Wand2 size={11} /> Auto-generate
                    </button>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. pooja-samagri"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                  />
                </div>
              </div>

              {/* Parent Category & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Parent Category</label>
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                  >
                    <option value="">None (Top-Level Category)</option>
                    {parentOptions
                      .filter((p) => p.id !== initialCategory?.id)
                      .map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Publish Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CategoryStatus)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 font-semibold"
                  >
                    <option value="ACTIVE">Active (Visible in storefront)</option>
                    <option value="HIDDEN">Hidden (Direct link only)</option>
                    <option value="DRAFT">Draft (Unpublished)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this category's products and ritual significance..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                />
              </div>

              {/* Image URL & Thumbnail Preview */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Category Image Banner URL</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                  />
                  {image && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                      <Image src={image} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* SEO Title */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Page Title (Meta Title)</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="e.g. Buy Authentic Pooja Samagri Online | Ramanayam"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                />
                <p className="text-[11px] text-stone-400 mt-1">{seoTitle.length} / 70 characters</p>
              </div>

              {/* SEO Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Meta Description</label>
                <textarea
                  rows={4}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Summarize category for Google search results..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                />
                <p className="text-[11px] text-stone-400 mt-1">{seoDescription.length} / 160 characters</p>
              </div>

              {/* Search Engine Listing Preview */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium mb-1">
                  <Sparkles size={13} className="text-amber-600" />
                  <span>Google Search Preview</span>
                </div>
                <div className="text-blue-700 font-semibold text-sm hover:underline cursor-pointer">
                  {seoTitle || name || "Category Title"}
                </div>
                <div className="text-emerald-700 text-xs font-mono">
                  https://ramanayam.com/categories/{slug || "category-slug"}
                </div>
                <div className="text-stone-600 text-xs line-clamp-2">
                  {seoDescription || description || "Category description will appear here in search engine snippet."}
                </div>
              </div>
            </>
          )}

          {/* Footer actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              {initialCategory ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
