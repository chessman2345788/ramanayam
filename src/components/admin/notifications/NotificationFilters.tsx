"use client";

import React from "react";
import { NotificationCategory } from "@/types/notifications";
import { Filter, Layers } from "lucide-react";

export interface CategoryFilterItem {
  id: NotificationCategory;
  label: string;
  count: number;
}

interface NotificationFiltersProps {
  categories: CategoryFilterItem[];
  activeCategory: NotificationCategory;
  onSelectCategory: (cat: NotificationCategory) => void;
  statusFilter: string;
  onSelectStatusFilter: (status: string) => void;
}

export function NotificationFilters({
  categories,
  activeCategory,
  onSelectCategory,
  statusFilter,
  onSelectStatusFilter,
}: NotificationFiltersProps) {
  const statusOptions = [
    { id: "all", label: "All Items" },
    { id: "unread", label: "Unread Only" },
    { id: "read", label: "Read Only" },
    { id: "critical", label: "Critical Priority" },
    { id: "high", label: "High Priority" },
    { id: "today", label: "Today" },
  ];

  return (
    <div className="space-y-4">
      {/* Category Sidebar Navigation */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 text-xs font-bold text-stone-800 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-amber-700" />
          <span>Categories</span>
        </div>

        <div className="space-y-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-100/70 text-amber-900 border border-amber-300 shadow-2xs"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <span className="capitalize">{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority & Status Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 text-xs font-bold text-stone-800 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-amber-700" />
          <span>Filter Status</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectStatusFilter(opt.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-stone-900 text-white font-semibold"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
