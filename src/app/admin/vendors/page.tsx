"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Store, Loader2 } from "lucide-react";
import {
  VendorSummaryCards,
  VendorSearch,
  VendorFilters,
  VendorSortOption,
  VendorsTable,
  ConfirmDialog,
  ConfirmActionType,
  Pagination,
} from "@/components/admin/vendors";
import { AdminVendorDetail, VendorStatus } from "@/data/mockVendorsData";
import { EmptyState } from "@/components/admin/EmptyState";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminVendorsListPage() {
  const [vendors, setVendors] = useState<AdminVendorDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<VendorStatus | "ALL">("ALL");
  const [sortOption, setSortOption] = useState<VendorSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    actionType: ConfirmActionType | null;
    vendor: AdminVendorDetail | null;
  }>({
    isOpen: false,
    actionType: null,
    vendor: null,
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadVendors = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, any> = {
        page: currentPage,
        limit: pageSize,
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      const result = await AdminService.fetchVendorsListFromApi(params);

      if (result.data && result.data.length > 0) {
        const formatted: AdminVendorDetail[] = result.data.map((v: any) => ({
          id: v.id,
          name: v.ownerName || v.businessName,
          businessName: v.businessName,
          businessType: "Artisan / Flagship Seller",
          email: v.email || "",
          phone: v.phone || "",
          logo: v.logo || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&auto=format&fit=crop&q=80",
          status: (v.status || "PENDING") as VendorStatus,
          joinedDate: new Date(v.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          isPrimary: false,

          gstNumber: v.gstNumber || "N/A",
          pan: v.panNumber || "N/A",
          businessAddress: "Varanasi, UP",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221001",

          productsCount: v._count?.products || 0,
          activeProductsCount: v._count?.products || 0,
          ordersCount: 0,
          totalRevenue: 0,
          avgOrderValue: 0,
          customerRating: 5.0,

          products: [],
          orders: [],
          salesHistory: [],
        }));

        setVendors(formatted);
      } else {
        setVendors([]);
      }

      setTotalItems(result.total);
      setTotalPages(result.totalPages);
    } catch (err: any) {
      console.error("Failed to load vendors from API:", err);
      showToast("Failed to load vendors from database.");
      setVendors([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, statusFilter]);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  // Action handlers
  const handleTriggerAction = (vendor: AdminVendorDetail, actionType: ConfirmActionType) => {
    setConfirmDialog({
      isOpen: true,
      actionType,
      vendor,
    });
  };

  const handleConfirmAction = async () => {
    if (!confirmDialog.vendor || !confirmDialog.actionType) return;

    const { vendor, actionType } = confirmDialog;
    let newStatus: VendorStatus = vendor.status;

    if (actionType === "APPROVE") newStatus = "ACTIVE";
    if (actionType === "SUSPEND") newStatus = "SUSPENDED";
    if (actionType === "ACTIVATE") newStatus = "ACTIVE";

    try {
      await AdminService.updateVendorStatusInApi(vendor.id, newStatus);
      showToast(`Seller "${vendor.businessName}" status updated to ${newStatus}.`);
      setConfirmDialog({ isOpen: false, actionType: null, vendor: null });
      await loadVendors();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to update vendor status.";
      showToast(`Error: ${errMsg}`);
    }
  };

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "ALL" || sortOption !== "newest";

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setSortOption("newest");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-stone-900 font-display">
              Vendors & Marketplace Sellers
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage registered artisan cooperatives, flagship seller catalog, and seller statuses.
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <VendorSummaryCards vendors={vendors} />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
        <VendorSearch value={searchQuery} onChange={(q) => { setSearchQuery(q); setCurrentPage(1); }} />

        <VendorFilters
          statusFilter={statusFilter}
          onStatusChange={(s) => { setStatusFilter(s); setCurrentPage(1); }}
          sortOption={sortOption}
          onSortChange={(so) => { setSortOption(so); setCurrentPage(1); }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Main Table or Loading / Empty State */}
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-stone-700">Loading sellers from database...</p>
        </div>
      ) : vendors.length === 0 ? (
        <EmptyState
          title="No Sellers Found"
          description="No registered sellers match your search query or active status filter."
        />
      ) : (
        <div className="space-y-0">
          <VendorsTable
            vendors={vendors}
            onApprove={(v) => handleTriggerAction(v, "APPROVE")}
            onSuspend={(v) => handleTriggerAction(v, "SUSPEND")}
            onActivate={(v) => handleTriggerAction(v, "ACTIVATE")}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={(p) => setCurrentPage(p)}
            onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(1); }}
          />
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        actionType={confirmDialog.actionType}
        vendorName={confirmDialog.vendor?.businessName || ""}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, actionType: null, vendor: null })}
      />
    </div>
  );
}
