"use client";

import React from "react";
import Image from "next/image";
import { Folder, Layers } from "lucide-react";
import { CategoryItem } from "@/types/category";
import { CategoryActions } from "./CategoryActions";

interface CategoryTableProps {
  categories: CategoryItem[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  onEdit: (category: CategoryItem) => void;
  onDelete: (category: CategoryItem) => void;
  onDuplicate: (category: CategoryItem) => void;
  onToggleHide: (category: CategoryItem) => void;
  onViewDetails?: (category: CategoryItem) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleHide,
  onViewDetails,
}) => {
  const isAllSelected = categories.length > 0 && selectedIds.length === categories.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: CategoryItem["status"]) => {
    switch (status) {
      case "ACTIVE":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">Active</span>;
      case "HIDDEN":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">Hidden</span>;
      case "DRAFT":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-200 text-stone-700">Draft</span>;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
      <table className="w-full text-left border-collapse text-xs md:text-sm">
        <thead>
          <tr className="bg-stone-50/90 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isSomeSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Parent Category</th>
            <th className="py-3 px-4">Products</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Updated</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 text-stone-800">
          {categories.map((category) => {
            const isSelected = selectedIds.includes(category.id);
            return (
              <tr
                key={category.id}
                className={`hover:bg-amber-50/30 transition-colors ${isSelected ? "bg-amber-50/50" : ""}`}
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelectOne(category.id, e.target.checked)}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                          unoptimized
                        />
                      ) : (
                        <Folder size={18} className="text-amber-700/60" />
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-900 hover:text-amber-700 cursor-pointer" onClick={() => onEdit(category)}>
                        {category.name}
                      </span>
                      <p className="text-[11px] font-mono text-stone-400">/{category.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {category.parentName ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/60">
                      <Layers size={11} className="text-amber-600" />
                      {category.parentName}
                    </span>
                  ) : (
                    <span className="text-xs text-stone-400 italic">Top Level</span>
                  )}
                </td>
                <td className="py-3 px-4 font-semibold text-stone-700">
                  {category.productCount} {category.productCount === 1 ? "item" : "items"}
                </td>
                <td className="py-3 px-4">{getStatusBadge(category.status)}</td>
                <td className="py-3 px-4 text-stone-500 text-xs whitespace-nowrap">
                  {formatDate(category.updatedAt)}
                </td>
                <td className="py-3 px-4 text-right">
                  <CategoryActions
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
                    onToggleHide={onToggleHide}
                    onViewDetails={onViewDetails}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
