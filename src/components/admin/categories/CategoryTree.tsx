"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronDown, Folder, Plus, Edit2, Trash2, EyeOff, Eye } from "lucide-react";
import { CategoryItem } from "@/types/category";

interface CategoryTreeProps {
  categories: CategoryItem[];
  onAddSubcategory: (parentId: string, parentName: string) => void;
  onEdit: (category: CategoryItem) => void;
  onDelete: (category: CategoryItem) => void;
  onToggleHide: (category: CategoryItem) => void;
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onAddSubcategory,
  onEdit,
  onDelete,
  onToggleHide,
}) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      if (!cat.parentId) initial[cat.id] = true;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const topLevel = categories.filter((c) => !c.parentId);
  const getChildren = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    categories.forEach((c) => (all[c.id] = true));
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const renderNode = (category: CategoryItem, depth: number = 0) => {
    const children = getChildren(category.id);
    const hasChildren = children.length > 0;
    const isExpanded = !!expandedIds[category.id];

    return (
      <div key={category.id} className="select-none">
        <div
          className={`flex items-center justify-between p-2.5 rounded-xl border border-stone-200/60 bg-white hover:bg-amber-50/30 transition-colors my-1 ${
            depth > 0 ? "ml-6 md:ml-8 bg-stone-50/40" : "font-medium shadow-xs"
          }`}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleExpand(category.id)}
                className="p-1 rounded text-stone-500 hover:bg-stone-200/60 transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <span className="w-6" />
            )}

            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center">
              {category.image ? (
                <Image src={category.image} alt={category.name} fill className="object-cover" sizes="32px" unoptimized />
              ) : (
                <Folder size={15} className="text-amber-700/60" />
              )}
            </div>

            <div className="truncate">
              <span className="text-xs md:text-sm font-semibold text-stone-900">{category.name}</span>
              <span className="ml-2 text-[11px] text-stone-400 font-mono hidden sm:inline">/{category.slug}</span>
            </div>

            <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
              {category.productCount} items
            </span>

            {category.status === "HIDDEN" && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                Hidden
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onAddSubcategory(category.id, category.name)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-100/50 transition-colors"
              title="Add Subcategory"
            >
              <Plus size={14} />
            </button>
            <button
              onClick={() => onEdit(category)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Edit"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onToggleHide(category)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title={category.status === "HIDDEN" ? "Show" : "Hide"}
            >
              {category.status === "HIDDEN" ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button
              onClick={() => onDelete(category)}
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l-2 border-amber-200/60 ml-3">
            {children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs">
        <span className="font-semibold text-stone-700">Taxonomy Hierarchy Tree</span>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-1">{topLevel.map((cat) => renderNode(cat, 0))}</div>
    </div>
  );
};
