"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Folder, Layers, Package } from "lucide-react";
import { CategoryItem } from "@/types/category";
import { CategoryActions } from "./CategoryActions";

interface CategoryCardProps {
  category: CategoryItem;
  isSelected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
  onEdit: (category: CategoryItem) => void;
  onDelete: (category: CategoryItem) => void;
  onDuplicate: (category: CategoryItem) => void;
  onToggleHide: (category: CategoryItem) => void;
  onViewDetails?: (category: CategoryItem) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleHide,
  onViewDetails,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -3 }}
      className={`relative group bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between ${
        isSelected ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20" : "border-stone-200 hover:border-amber-300"
      }`}
    >
      {/* Top Banner & Thumbnail */}
      <div className="relative w-full h-36 bg-stone-100 overflow-hidden">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 300px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50/50">
            <Folder size={40} className="text-amber-700/40" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

        {/* Checkbox (Top Left) */}
        {onSelect && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(category.id, e.target.checked)}
              className="rounded border-white/80 text-amber-600 focus:ring-amber-500 shadow-sm cursor-pointer w-4 h-4"
            />
          </div>
        )}

        {/* Status Badge (Top Right) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-xs ${
              category.status === "ACTIVE"
                ? "bg-emerald-500 text-white"
                : category.status === "HIDDEN"
                ? "bg-amber-500 text-white"
                : "bg-stone-500 text-white"
            }`}
          >
            {category.status}
          </span>
        </div>

        {/* Title overlay on bottom of image */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <h3 className="text-base font-bold drop-shadow-sm truncate">{category.name}</h3>
          <p className="text-[11px] font-mono text-stone-200/90 truncate">/{category.slug}</p>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-stone-600 line-clamp-2 min-h-8">
          {category.description || "No description provided."}
        </p>

        {/* Category metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-1 text-stone-500">
            <Package size={13} className="text-amber-600" />
            <span className="font-semibold text-stone-700">{category.productCount}</span>
            <span>products</span>
          </div>

          {category.parentName ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium">
              <Layers size={10} className="text-amber-600" />
              {category.parentName}
            </span>
          ) : (
            <span className="text-[11px] text-stone-400 italic">Top Level</span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
        <button
          onClick={() => onEdit(category)}
          className="text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
        >
          Edit Details
        </button>

        <CategoryActions
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onToggleHide={onToggleHide}
          onViewDetails={onViewDetails}
        />
      </div>
    </motion.div>
  );
};
