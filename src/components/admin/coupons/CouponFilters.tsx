"use client";

import React from "react";
import { Filter, Tag, Users, ArrowUpDown } from "lucide-react";
import { CouponStatus, DiscountType, CustomerTypeEligibility } from "@/data/mockCouponsData";

export type CouponSortOption = "newest" | "oldest" | "most_used" | "highest_discount";

interface CouponFiltersProps {
  statusFilter: CouponStatus | "ALL";
  onStatusChange: (status: CouponStatus | "ALL") => void;
  typeFilter: DiscountType | "FESTIVAL" | "ALL";
  onTypeChange: (type: DiscountType | "FESTIVAL" | "ALL") => void;
  customerFilter: CustomerTypeEligibility | "ALL";
  onCustomerChange: (cust: CustomerTypeEligibility | "ALL") => void;
  sortOption: CouponSortOption;
  onSortChange: (sort: CouponSortOption) => void;
}

export function CouponFilters({
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  customerFilter,
  onCustomerChange,
  sortOption,
  onSortChange,
}: CouponFiltersProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
      {/* Status Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Filter size={14} style={{ color: "#F57C00" }} />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as CouponStatus | "ALL")}
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
          <option value="EXPIRED">Expired</option>
          <option value="DISABLED">Disabled</option>
        </select>
      </div>

      {/* Discount Type Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Tag size={14} style={{ color: "#701A75" }} />
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value as DiscountType | "FESTIVAL" | "ALL")}
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
          <option value="ALL">All Discount Types</option>
          <option value="PERCENTAGE">Percentage (%)</option>
          <option value="FIXED_AMOUNT">Fixed Amount (₹)</option>
          <option value="FREE_SHIPPING">Free Shipping</option>
          <option value="FESTIVAL">Festival Special Offer</option>
        </select>
      </div>

      {/* Customer Type Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Users size={14} style={{ color: "#16A34A" }} />
        <select
          value={customerFilter}
          onChange={(e) => onCustomerChange(e.target.value as CustomerTypeEligibility | "ALL")}
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
          <option value="ALL">All Customer Types</option>
          <option value="NEW">New Devotees Only</option>
          <option value="RETURNING">Returning Buyers</option>
          <option value="VIP">VIP Patrons</option>
        </select>
      </div>

      {/* Sort Option Dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ArrowUpDown size={14} style={{ color: "#D4AF37" }} />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as CouponSortOption)}
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
          <option value="most_used">Sort: Most Used</option>
          <option value="highest_discount">Sort: Highest Discount</option>
        </select>
      </div>
    </div>
  );
}
