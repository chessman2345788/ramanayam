"use client";

import React from "react";
import { Filter, Eye, Layers, ArrowUpDown } from "lucide-react";
import { CollectionStatus, CollectionVisibility, CollectionType } from "@/data/mockCollectionsData";

export type CollectionSortOption = "newest" | "oldest" | "most_products";

interface CollectionFiltersProps {
  statusFilter: CollectionStatus | "ALL";
  onStatusChange: (status: CollectionStatus | "ALL") => void;
  visibilityFilter: CollectionVisibility | "ALL";
  onVisibilityChange: (vis: CollectionVisibility | "ALL") => void;
  typeFilter: CollectionType | "ALL";
  onTypeChange: (type: CollectionType | "ALL") => void;
  sortOption: CollectionSortOption;
  onSortChange: (sort: CollectionSortOption) => void;
}

export function CollectionFilters({
  statusFilter,
  onStatusChange,
  visibilityFilter,
  onVisibilityChange,
  typeFilter,
  onTypeChange,
  sortOption,
  onSortChange,
}: CollectionFiltersProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
      {/* Status Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Filter size={14} style={{ color: "#F57C00" }} />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as CollectionStatus | "ALL")}
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            fontSize: 13,
            color: "#171717",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Visibility Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Eye size={14} style={{ color: "#0284C7" }} />
        <select
          value={visibilityFilter}
          onChange={(e) => onVisibilityChange(e.target.value as CollectionVisibility | "ALL")}
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            fontSize: 13,
            color: "#171717",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="ALL">All Visibility</option>
          <option value="PUBLIC">Public Storefront</option>
          <option value="FESTIVAL">Festival Landing Page</option>
          <option value="HIDDEN">Hidden / Private</option>
        </select>
      </div>

      {/* Type Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Layers size={14} style={{ color: "#701A75" }} />
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value as CollectionType | "ALL")}
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            fontSize: 13,
            color: "#171717",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="ALL">All Collection Types</option>
          <option value="MANUAL">Manual Selection</option>
          <option value="AUTOMATIC">Automatic Smart Rules</option>
        </select>
      </div>

      {/* Sort Option */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ArrowUpDown size={14} style={{ color: "#D4AF37" }} />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as CollectionSortOption)}
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#FFFFFF",
            fontSize: 13,
            color: "#171717",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="most_products">Sort: Most Products</option>
        </select>
      </div>
    </div>
  );
}
