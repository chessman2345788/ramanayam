"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Copy, EyeOff, Eye, Trash2, ExternalLink } from "lucide-react";
import { CategoryItem } from "@/types/category";

interface CategoryActionsProps {
  category: CategoryItem;
  onEdit: (category: CategoryItem) => void;
  onDelete: (category: CategoryItem) => void;
  onDuplicate: (category: CategoryItem) => void;
  onToggleHide: (category: CategoryItem) => void;
  onViewDetails?: (category: CategoryItem) => void;
}

export const CategoryActions: React.FC<CategoryActionsProps> = ({
  category,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleHide,
  onViewDetails,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
        title="Category actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 text-xs">
          {onViewDetails && (
            <button
              onClick={() => {
                onViewDetails(category);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left flex items-center gap-2 text-stone-700 hover:bg-stone-50 hover:text-amber-700 transition-colors"
            >
              <ExternalLink size={14} />
              <span>View Details</span>
            </button>
          )}

          <button
            onClick={() => {
              onEdit(category);
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-stone-700 hover:bg-stone-50 hover:text-amber-700 transition-colors"
          >
            <Edit size={14} />
            <span>Edit Category</span>
          </button>

          <button
            onClick={() => {
              onDuplicate(category);
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-stone-700 hover:bg-stone-50 hover:text-amber-700 transition-colors"
          >
            <Copy size={14} />
            <span>Duplicate</span>
          </button>

          <button
            onClick={() => {
              onToggleHide(category);
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-stone-700 hover:bg-stone-50 hover:text-amber-700 transition-colors"
          >
            {category.status === "HIDDEN" ? (
              <>
                <Eye size={14} />
                <span>Publish / Show</span>
              </>
            ) : (
              <>
                <EyeOff size={14} />
                <span>Hide Category</span>
              </>
            )}
          </button>

          <div className="my-1 border-t border-stone-100" />

          <button
            onClick={() => {
              onDelete(category);
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};
