"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Download, Calendar } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CouponSummaryCards } from "@/components/admin/coupons/CouponSummaryCards";
import { CouponFilters, CouponSortOption } from "@/components/admin/coupons/CouponFilters";
import { CouponTable } from "@/components/admin/coupons/CouponTable";
import { CampaignCalendar } from "@/components/admin/coupons/CampaignCalendar";
import { mockCouponsList, AdminCouponDetail, CouponStatus, DiscountType, CustomerTypeEligibility } from "@/data/mockCouponsData";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCouponDetail[]>(mockCouponsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CouponStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<DiscountType | "FESTIVAL" | "ALL">("ALL");
  const [customerFilter, setCustomerFilter] = useState<CustomerTypeEligibility | "ALL">("ALL");
  const [sortOption, setSortOption] = useState<CouponSortOption>("newest");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleToggleStatus = (id: string, currentStatus: CouponStatus) => {
    const nextStatus: CouponStatus = currentStatus === "ACTIVE" ? "DISABLED" : "ACTIVE";
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
    );
    showToast(`Coupon ${id} set to ${nextStatus}`);
  };

  const handleDuplicateCoupon = (coupon: AdminCouponDetail) => {
    const duplicated: AdminCouponDetail = {
      ...coupon,
      id: `coup_${Date.now()}`,
      code: `${coupon.code}_COPY`,
      campaignName: `${coupon.campaignName} (Copy)`,
      usageCount: 0,
      status: "SCHEDULED",
      timeline: [
        {
          id: `t_${Date.now()}`,
          title: "Duplicated Coupon Created",
          description: `Duplicated from ${coupon.code}`,
          timestamp: "Just now",
          actor: "Admin User",
        },
      ],
    };
    setCoupons([duplicated, ...coupons]);
    showToast(`Duplicated coupon code ${duplicated.code} created`);
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast(`Coupon ${id} deleted`);
  };

  const filteredCoupons = useMemo(() => {
    return coupons
      .filter((c) => {
        if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
        if (customerFilter !== "ALL" && c.customerEligibility !== customerFilter) return false;
        if (typeFilter !== "ALL") {
          if (typeFilter === "FESTIVAL") {
            if (
              !c.campaignName.toLowerCase().includes("festival") &&
              !c.campaignName.toLowerCase().includes("mahotsav") &&
              !c.campaignName.toLowerCase().includes("navami") &&
              !c.campaignName.toLowerCase().includes("janmashtami")
            ) {
              return false;
            }
          } else if (c.discountType !== typeFilter) {
            return false;
          }
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchCode = c.code.toLowerCase().includes(q);
          const matchCampaign = c.campaignName.toLowerCase().includes(q);
          const matchCat = c.applicableCategories.some((cat) => cat.toLowerCase().includes(q));
          if (!matchCode && !matchCampaign && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "newest") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        if (sortOption === "oldest") return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (sortOption === "most_used") return b.usageCount - a.usageCount;
        if (sortOption === "highest_discount") return b.value - a.value;
        return 0;
      });
  }, [coupons, searchQuery, statusFilter, typeFilter, customerFilter, sortOption]);

  const totalPages = Math.ceil(filteredCoupons.length / pageSize) || 1;
  const paginatedCoupons = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCoupons.slice(start, start + pageSize);
  }, [filteredCoupons, currentPage, pageSize]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <AdminPageHeader
        title="Coupons & Promotions"
        subtitle="Create and manage discounts, festival offers, and promotional campaigns."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>Campaign Calendar</span>
            </button>

            <button
              type="button"
              onClick={() => showToast("Exporting promotional campaigns list to Excel...")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/admin/coupons/new"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Coupon</span>
            </Link>
          </div>
        }
      />

      {/* Summary KPI Cards */}
      <CouponSummaryCards coupons={coupons} />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          placeholder="Search by code, campaign name, or category..."
        />
        <CouponFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          customerFilter={customerFilter}
          onCustomerChange={setCustomerFilter}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      {/* Main Coupons Table */}
      <CouponTable
        coupons={paginatedCoupons}
        onToggleStatus={handleToggleStatus}
        onDuplicateCoupon={handleDuplicateCoupon}
        onDeleteCoupon={handleDeleteCoupon}
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCoupons.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {/* Campaign Calendar Modal Drawer */}
      <CampaignCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        coupons={coupons}
      />
    </div>
  );
}
