"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Plus, Download, Calendar, RefreshCw, Loader2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  CouponSummaryCards,
  CouponSearch,
  CouponFilters,
  CouponTable,
  CouponUsageTable,
  CampaignCalendar,
  Pagination,
  CouponSortOption,
  DateRangeOption,
  UsageFilterOption,
} from "@/components/admin/coupons";
import { AdminCouponDetail, CouponStatus, DiscountType } from "@/data/mockCouponsData";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCouponDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState<CouponStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<DiscountType | "ALL">("ALL");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeOption>("ALL");
  const [usageFilter, setUsageFilter] = useState<UsageFilterOption>("ALL");
  const [sortOption, setSortOption] = useState<CouponSortOption>("newest");

  // Pagination & Modals
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [usageCoupon, setUsageCoupon] = useState<AdminCouponDetail | null>(null);
  const [deleteCoupon, setDeleteCoupon] = useState<AdminCouponDetail | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, any> = {
        page: currentPage,
        limit: pageSize,
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (statusFilter === "ACTIVE") {
        params.isActive = true;
      } else if (statusFilter === "DISABLED") {
        params.isActive = false;
      }

      const result = await AdminService.fetchCouponsFromApi(params);

      if (result.items && result.items.length > 0) {
        const now = new Date();

        const formatted: AdminCouponDetail[] = result.items.map((c: any) => {
          const startDate = c.startDate ? new Date(c.startDate) : null;
          const endDate = c.endDate ? new Date(c.endDate) : null;

          let status: CouponStatus = "ACTIVE";
          if (!c.isActive) {
            status = "DISABLED";
          } else if (endDate && now > endDate) {
            status = "EXPIRED";
          } else if (startDate && now < startDate) {
            status = "SCHEDULED";
          }

          return {
            id: c.id,
            code: c.code,
            campaignName: c.description || c.code,
            description: c.description || "",
            discountType: (c.discountType === "FIXED" ? "FIXED_AMOUNT" : "PERCENTAGE") as DiscountType,
            value: Number(c.discountValue || 0),
            maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : undefined,
            minOrderValue: c.minOrderAmount ? Number(c.minOrderAmount) : 0,
            usageCount: c.usedCount || 0,
            usageLimit: c.usageLimit || 9999,
            perCustomerLimit: 1,
            usedTodayCount: 0,
            revenueGenerated: 0,
            totalDiscountAmount: 0,
            status,
            applicability: "ENTIRE_STORE",
            startDate: c.startDate ? new Date(c.startDate).toISOString().slice(0, 10) : new Date(c.createdAt).toISOString().slice(0, 10),
            endDate: c.endDate ? new Date(c.endDate).toISOString().slice(0, 10) : "2099-12-31",
            applicableCategories: [],
            applicableProducts: [],
            excludedProducts: [],
            timezone: "Asia/Kolkata (IST)",
            createdBy: "Admin",
            timeline: [
              {
                id: `t_${c.id}`,
                title: "Coupon Created",
                description: `Created with code ${c.code}`,
                timestamp: new Date(c.createdAt).toLocaleDateString("en-IN"),
                actor: "System",
              },
            ],
          };
        });

        setCoupons(formatted);
      } else {
        setCoupons([]);
      }

      setTotalItems(result.total);
      setTotalPages(result.totalPages);
    } catch (err: any) {
      console.error("Failed to load coupons from API:", err);
      showToast("Failed to load coupons from database.");
      setCoupons([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, statusFilter]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const hasActiveFilters =
    statusFilter !== "ALL" ||
    typeFilter !== "ALL" ||
    dateRangeFilter !== "ALL" ||
    usageFilter !== "ALL" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setStatusFilter("ALL");
    setTypeFilter("ALL");
    setDateRangeFilter("ALL");
    setUsageFilter("ALL");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Status toggle handler
  const handleToggleStatus = async (id: string, currentStatus: CouponStatus) => {
    const nextIsActive = currentStatus !== "ACTIVE";
    try {
      await AdminService.updateCouponInApi(id, { isActive: nextIsActive });
      showToast(`Coupon ${id} ${nextIsActive ? "activated" : "disabled"} successfully.`);
      await loadCoupons();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to update coupon status.";
      showToast(`Error: ${errMsg}`);
    }
  };

  // Duplicate coupon code handler
  const handleDuplicateCoupon = async (coupon: AdminCouponDetail) => {
    const newCode = `${coupon.code}_COPY_${Math.floor(100 + Math.random() * 900)}`;
    try {
      await AdminService.createCouponInApi({
        code: newCode,
        description: coupon.description ? `${coupon.description} (Copy)` : `Copy of ${coupon.code}`,
        discountType: coupon.discountType === "FIXED_AMOUNT" ? "FIXED" : "PERCENTAGE",
        discountValue: coupon.value,
        minOrderAmount: coupon.minOrderValue || undefined,
        maxDiscount: coupon.maxDiscount || undefined,
        usageLimit: coupon.usageLimit || undefined,
        isActive: true,
      });
      showToast(`Duplicated coupon code ${newCode} created successfully.`);
      await loadCoupons();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to duplicate coupon.";
      showToast(`Error: ${errMsg}`);
    }
  };

  // Delete coupon handler
  const handleConfirmDelete = async () => {
    if (!deleteCoupon) return;
    try {
      await AdminService.deleteCouponFromApi(deleteCoupon.id);
      showToast(`Coupon ${deleteCoupon.code} permanently deleted.`);
      setDeleteCoupon(null);
      await loadCoupons();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to delete coupon.";
      showToast(`Error: ${errMsg}`);
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Coupon Code,Campaign Name,Type,Discount,Min Order,Usage,Usage Limit,Status,Start Date,End Date"]
        .concat(
          coupons.map(
            (c) =>
              `"${c.code}","${c.campaignName}","${c.discountType}",${c.value},${c.minOrderValue},${c.usageCount},${c.usageLimit},"${c.status}","${c.startDate}","${c.endDate}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ramanayam_coupons_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${coupons.length} promotional coupons to CSV.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Page Header */}
      <AdminPageHeader
        title="Coupons & Promotions"
        subtitle="Manage discount codes, festival promotional offers, and usage rules."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>Calendar</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/admin/coupons/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Coupon</span>
            </Link>
          </div>
        }
      />

      {/* 6 Summary Cards */}
      <CouponSummaryCards coupons={coupons} />

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <CouponSearch
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
          />

          <CouponFilters
            statusFilter={statusFilter}
            onStatusChange={(s) => {
              setStatusFilter(s);
              setCurrentPage(1);
            }}
            typeFilter={typeFilter}
            onTypeChange={(t) => {
              setTypeFilter(t);
              setCurrentPage(1);
            }}
            dateRangeFilter={dateRangeFilter}
            onDateRangeChange={(d) => {
              setDateRangeFilter(d);
              setCurrentPage(1);
            }}
            usageFilter={usageFilter}
            onUsageChange={(u) => {
              setUsageFilter(u);
              setCurrentPage(1);
            }}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>

      {/* Main Table or Loading / Empty State */}
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-stone-700">Loading coupons from database...</p>
        </div>
      ) : coupons.length === 0 ? (
        <EmptyState
          title="No Coupons Found"
          description="No promotional coupons match your search query or active filter settings."
          action={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            ) : (
              <Link
                href="/admin/coupons/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Coupon</span>
              </Link>
            )
          }
        />
      ) : (
        <div className="space-y-0">
          <CouponTable
            coupons={coupons}
            onToggleStatus={handleToggleStatus}
            onDuplicateCoupon={handleDuplicateCoupon}
            onViewUsageModal={(c) => setUsageCoupon(c)}
            onDeleteModal={(c) => setDeleteCoupon(c)}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* Usage History Modal */}
      <CouponUsageTable
        isOpen={!!usageCoupon}
        coupon={usageCoupon}
        usages={[]}
        onClose={() => setUsageCoupon(null)}
      />

      {/* Campaign Calendar Overview Modal */}
      <CampaignCalendar
        isOpen={isCalendarOpen}
        coupons={coupons}
        onClose={() => setIsCalendarOpen(false)}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteCoupon}
        title={`Delete Coupon Code ${deleteCoupon?.code}?`}
        description="Are you sure you want to permanently delete this promotional coupon? This action cannot be undone."
        confirmText="Delete Coupon"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteCoupon(null)}
      />
    </div>
  );
}
