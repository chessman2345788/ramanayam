"use client";

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { CategoryItem } from "@/types/category";

interface CategoryDeleteDialogProps {
  isOpen: boolean;
  category: CategoryItem | null;
  subcategoriesCount?: number;
  onClose: () => void;
  onConfirm: (category: CategoryItem) => void;
}

export const CategoryDeleteDialog: React.FC<CategoryDeleteDialogProps> = ({
  isOpen,
  category,
  subcategoriesCount = 0,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-md overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-stone-900">Delete Category &quot;{category.name}&quot;?</h3>
          <p className="text-xs text-stone-600 mt-1">
            Are you sure you want to permanently delete this category? This action cannot be undone.
          </p>
        </div>

        {(subcategoriesCount > 0 || category.productCount > 0) && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span>Warning: Active dependencies</span>
            </div>
            {subcategoriesCount > 0 && (
              <p>• {subcategoriesCount} subcategories will be unassigned to top-level.</p>
            )}
            {category.productCount > 0 && (
              <p>• {category.productCount} products currently assigned to this category.</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(category);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={14} />
            <span>Delete Category</span>
          </button>
        </div>
      </div>
    </div>
  );
};
