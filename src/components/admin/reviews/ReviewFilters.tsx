"use client";

import React from "react";
import { Filter, Star, ArrowUpDown } from "lucide-react";
import { ReviewStatus } from "@/data/mockReviewsData";

export type SortOption = "newest" | "oldest" | "rating_high" | "rating_low";

interface ReviewFiltersProps {
  statusFilter: ReviewStatus | "ALL";
  onStatusChange: (status: ReviewStatus | "ALL") => void;
  ratingFilter: number | "ALL";
  onRatingChange: (rating: number | "ALL") => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ReviewFilters({
  statusFilter,
  onStatusChange,
  ratingFilter,
  onRatingChange,
  sortOption,
  onSortChange,
}: ReviewFiltersProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
      {/* Status Filter Dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Filter size={14} style={{ color: "#F57C00" }} />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as ReviewStatus | "ALL")}
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
          <option value="PENDING">Pending Moderation</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="REPORTED">Reported / Flagged</option>
        </select>
      </div>

      {/* Rating Filter Dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Star size={14} style={{ color: "#D4AF37" }} />
        <select
          value={ratingFilter}
          onChange={(e) =>
            onRatingChange(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
          }
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
          <option value="ALL">All Ratings</option>
          <option value="5">5 Stars Only</option>
          <option value="4">4 Stars Only</option>
          <option value="3">3 Stars Only</option>
          <option value="2">2 Stars Only</option>
          <option value="1">1 Star Only</option>
        </select>
      </div>

      {/* Sort Option Dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ArrowUpDown size={14} style={{ color: "#701A75" }} />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
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
          <option value="rating_high">Sort: Rating High to Low</option>
          <option value="rating_low">Sort: Rating Low to High</option>
        </select>
      </div>
    </div>
  );
}
