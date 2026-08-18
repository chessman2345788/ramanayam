"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Download, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  ReviewsSummaryCards,
  ProductRatingSummary,
  ReviewSearch,
  ReviewFilters,
  ReviewsTable,
  ReviewDetails,
  ReviewModerationDialog,
  Pagination,
  SortOption,
  DateRangeOption,
  VerifiedFilterOption,
  ModerationDialogMode,
} from "@/components/admin/reviews";
import { AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";
import { EmptyState } from "@/components/admin/EmptyState";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReviewDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "ALL">("ALL");
  const [ratingFilter, setRatingFilter] = useState<number | "ALL">("ALL");
  const [verifiedFilter, setVerifiedFilter] = useState<VerifiedFilterOption>("ALL");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeOption>("ALL");
  const [productFilter, setProductFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Selection & Pagination
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Drawer & Dialog States
  const [drawerReview, setDrawerReview] = useState<AdminReviewDetail | null>(null);
  const [dialogReview, setDialogReview] = useState<AdminReviewDetail | null>(null);
  const [dialogMode, setDialogMode] = useState<ModerationDialogMode>(null);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  /** Map UI sort option to backend params */
  const getSortParams = (sort: SortOption) => {
    switch (sort) {
      case "oldest":
        return { sortBy: "createdAt", sortOrder: "asc" };
      case "rating_high":
        return { sortBy: "rating", sortOrder: "desc" };
      case "rating_low":
        return { sortBy: "rating", sortOrder: "asc" };
      case "newest":
      default:
        return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const sortParams = getSortParams(sortOption);
      const params: Record<string, any> = {
        page: currentPage,
        limit: pageSize,
        sortBy: sortParams.sortBy,
        sortOrder: sortParams.sortOrder,
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (ratingFilter !== "ALL") {
        params.rating = ratingFilter;
      }

      const result = await AdminService.fetchReviewsListFromApi(params);

      if (result.data && result.data.length > 0) {
        const formatted: AdminReviewDetail[] = result.data.map((r: any) => {
          const custName = r.user
            ? `${r.user.firstName || ""} ${r.user.lastName || ""}`.trim() || r.user.email
            : "Customer";
          const custEmail = r.user?.email || "";
          const prodName = r.product?.name || "Product";

          return {
            id: r.id,
            reviewNumber: `REV-${r.id.slice(0, 6).toUpperCase()}`,
            rating: r.rating || 5,
            title: r.comment ? (r.comment.length > 50 ? r.comment.slice(0, 50) + "..." : r.comment) : "Customer Review",
            comment: r.comment || "",
            status: "APPROVED" as ReviewStatus, // Default display status (no status field in Prisma model)
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            helpfulCount: 0,

            productId: r.productId,
            productName: prodName,
            productSku: "N/A",
            productImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=400&auto=format&fit=crop&q=80",
            productCategory: "General",
            productPrice: 0,
            productAverageRating: 5.0,
            productTotalReviews: 1,

            customerId: r.userId,
            customerName: custName,
            customerEmail: custEmail,
            customerLocation: "India",
            isVerifiedPurchase: false, // Verified purchase logic not present in backend schema

            images: [],
            timeline: [
              {
                id: `t_${r.id}`,
                type: "SUBMITTED",
                title: "Review Submitted",
                description: `Review created with ${r.rating}-star rating.`,
                timestamp: new Date(r.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                actor: custName,
              },
            ],
          };
        });

        setReviews(formatted);
      } else {
        setReviews([]);
      }

      setTotalItems(result.total);
      setTotalPages(result.totalPages);
    } catch (err: any) {
      console.error("Failed to load reviews from API:", err);
      showToast("Failed to load reviews from database.");
      setReviews([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, ratingFilter, sortOption]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Unique products/categories list for filter dropdowns derived from loaded reviews
  const productsList = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.productName)));
  }, [reviews]);

  const categoriesList = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.productCategory)));
  }, [reviews]);

  const hasActiveFilters =
    statusFilter !== "ALL" ||
    ratingFilter !== "ALL" ||
    verifiedFilter !== "ALL" ||
    dateRangeFilter !== "ALL" ||
    productFilter !== "ALL" ||
    categoryFilter !== "ALL" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setStatusFilter("ALL");
    setRatingFilter("ALL");
    setVerifiedFilter("ALL");
    setDateRangeFilter("ALL");
    setProductFilter("ALL");
    setCategoryFilter("ALL");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Moderation Action Handlers
  const handleApprove = (_id: string) => {
    showToast("Review status moderation is not supported by backend schema (no status field). Reviews are published by default.");
  };

  const handleConfirmHide = (_id: string) => {
    showToast("Review hiding is not supported by backend schema. Use Delete to remove a review.");
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await AdminService.deleteReviewFromApi(id);
      showToast(`Review ${id} permanently deleted.`);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      if (drawerReview?.id === id) setDrawerReview(null);
      await loadReviews();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to delete review.";
      showToast(`Error: ${errMsg}`);
    }
  };

  const handleConfirmReport = (_id: string) => {
    showToast("Reporting reviews is not supported by backend schema.");
  };

  // Bulk Actions
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === reviews.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reviews.map((r) => r.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to permanently delete ${selectedIds.length} selected reviews?`)) return;

    try {
      await Promise.all(selectedIds.map((id) => AdminService.deleteReviewFromApi(id)));
      showToast(`Bulk deleted ${selectedIds.length} selected reviews.`);
      setSelectedIds([]);
      await loadReviews();
    } catch (err: any) {
      showToast("Error executing bulk delete.");
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Review ID,Customer,Email,Product,Rating,Comment,Date"]
        .concat(
          reviews.map(
            (r) =>
              `"${r.reviewNumber}","${r.customerName}","${r.customerEmail}","${r.productName}",${r.rating},"${r.comment.replace(/"/g, '""')}","${r.createdAt}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ramanayam_reviews_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${reviews.length} reviews to CSV.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Page Header & Primary Actions */}
      <AdminPageHeader
        title="Reviews Management"
        subtitle="Moderate customer ratings, manage verified buyer reviews, and inspect product feedback."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export CSV</span>
            </button>

            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleBulkDelete}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Bulk Delete ({selectedIds.length})</span>
              </button>
            )}
          </div>
        }
      />

      {/* Summary Cards */}
      <ReviewsSummaryCards reviews={reviews} />

      {/* Product Rating Breakdown Summary */}
      <ProductRatingSummary
        reviews={reviews}
        onSelectProductFilter={(prod) => {
          setProductFilter(prod || "ALL");
          setCurrentPage(1);
        }}
      />

      {/* Search Bar & Filter Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <ReviewSearch
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
          />

          <ReviewFilters
            statusFilter={statusFilter}
            onStatusChange={(s) => {
              setStatusFilter(s);
              setCurrentPage(1);
            }}
            ratingFilter={ratingFilter}
            onRatingChange={(r) => {
              setRatingFilter(r);
              setCurrentPage(1);
            }}
            verifiedFilter={verifiedFilter}
            onVerifiedChange={(v) => {
              setVerifiedFilter(v);
              setCurrentPage(1);
            }}
            dateRangeFilter={dateRangeFilter}
            onDateRangeChange={(d) => {
              setDateRangeFilter(d);
              setCurrentPage(1);
            }}
            productFilter={productFilter}
            onProductChange={(p) => {
              setProductFilter(p);
              setCurrentPage(1);
            }}
            categoryFilter={categoryFilter}
            onCategoryChange={(c) => {
              setCategoryFilter(c);
              setCurrentPage(1);
            }}
            sortOption={sortOption}
            onSortChange={setSortOption}
            productsList={productsList}
            categoriesList={categoriesList}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>

      {/* Main Reviews Table or Loading / Empty State */}
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-stone-700">Loading reviews from database...</p>
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState
          title="No Reviews Found"
          description="No customer reviews match your search query or active filter settings."
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
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-0">
          <ReviewsTable
            reviews={reviews}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onViewDetails={(rev) => setDrawerReview(rev)}
            onApprove={handleApprove}
            onHideModal={(rev) => {
              setDialogReview(rev);
              setDialogMode("HIDE");
            }}
            onDeleteModal={(rev) => {
              setDialogReview(rev);
              setDialogMode("DELETE");
            }}
            onReportModal={(rev) => {
              setDialogReview(rev);
              setDialogMode("REPORT");
            }}
            onFilterCustomer={(email) => {
              setSearchQuery(email);
              setCurrentPage(1);
            }}
            onFilterProduct={(prod) => {
              setProductFilter(prod);
              setCurrentPage(1);
            }}
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

      {/* Review Details Drawer */}
      <ReviewDetails
        review={drawerReview}
        isOpen={!!drawerReview}
        onClose={() => setDrawerReview(null)}
        onApprove={handleApprove}
        onHide={(rev) => {
          setDialogReview(rev);
          setDialogMode("HIDE");
        }}
        onDelete={(rev) => {
          setDialogReview(rev);
          setDialogMode("DELETE");
        }}
        onReport={(rev) => {
          setDialogReview(rev);
          setDialogMode("REPORT");
        }}
      />

      {/* Moderation Confirmation Dialog */}
      <ReviewModerationDialog
        isOpen={!!dialogMode && !!dialogReview}
        mode={dialogMode}
        review={dialogReview}
        onClose={() => {
          setDialogMode(null);
          setDialogReview(null);
        }}
        onConfirmHide={handleConfirmHide}
        onConfirmDelete={handleConfirmDelete}
        onConfirmReport={handleConfirmReport}
      />
    </div>
  );
}
