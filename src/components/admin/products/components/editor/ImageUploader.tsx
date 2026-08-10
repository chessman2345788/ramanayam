"use client";

import React, { useState } from "react";
import { UploadCloud, Star, Trash2, Image as ImageIcon } from "lucide-react";
import { ProductImage } from "../../types/product.types";

interface ImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleAddSampleImage = () => {
    if (imageUrlInput.trim()) {
      const newImg: ProductImage = {
        id: `img-${Date.now()}`,
        url: imageUrlInput.trim(),
        altText: "Product media thumbnail",
        isPrimary: images.length === 0,
      };
      onChange([...images, newImg]);
      setImageUrlInput("");
    }
  };

  const handleSetPrimary = (id: string) => {
    onChange(
      images.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    const remaining = images.filter((img) => img.id !== id);
    if (remaining.length > 0 && !remaining.some((img) => img.isPrimary)) {
      remaining[0].isPrimary = true;
    }
    onChange(remaining);
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs space-y-4">
      <h3 className="font-serif font-bold text-base text-[#7A1F1F] border-b border-black/6 pb-2">
        Product Media Gallery
      </h3>

      {/* Drag & Drop Zone UI */}
      <div className="border-2 border-dashed border-black/15 hover:border-[#F57C00] bg-[#FAF8F3]/60 rounded-2xl p-6 text-center transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-black/10 flex items-center justify-center text-[#F57C00] mx-auto mb-2">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-xs font-semibold text-[#171717]">
          Drag and drop product images here, or browse files
        </p>
        <p className="text-[11px] text-[#999999] mt-0.5">
          Supports PNG, JPG, WEBP up to 10MB (1:1 aspect ratio recommended)
        </p>

        {/* Quick URL Input for Mock demonstration */}
        <div className="mt-4 flex items-center max-w-md mx-auto">
          <input
            type="text"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Paste image URL (Unsplash/CDN)..."
            className="flex-1 h-9 px-3 text-xs bg-white border border-r-0 border-black/10 rounded-l-xl focus:outline-none focus:border-[#F57C00]"
          />
          <button
            type="button"
            onClick={handleAddSampleImage}
            className="h-9 px-3 bg-[#F57C00] text-white text-xs font-semibold rounded-r-xl hover:bg-[#E06D00] transition-colors"
          >
            Add Image
          </button>
        </div>
      </div>

      {/* Image Thumbnails Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative group rounded-xl overflow-hidden border ${
                img.isPrimary
                  ? "border-2 border-[#F57C00] shadow-sm"
                  : "border-black/10 bg-[#FAF8F3]"
              }`}
            >
              <div className="w-full h-28 relative">
                {/* eslint-disable-next-next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.altText || "Product media"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Primary Badge */}
              {img.isPrimary && (
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 text-[10px] font-bold bg-[#F57C00] text-white rounded-md shadow-xs">
                  Primary
                </span>
              )}

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    className="p-1.5 bg-white text-[#F57C00] rounded-lg hover:scale-105 transition-transform"
                    title="Set as Primary Thumbnail"
                  >
                    <Star className="w-4 h-4 fill-[#F57C00]" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  className="p-1.5 bg-white text-red-600 rounded-lg hover:scale-105 transition-transform"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
