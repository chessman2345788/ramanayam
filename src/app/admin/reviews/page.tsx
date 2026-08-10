"use client";

import React, { useState, useMemo } from "react";
import { Download, CheckCircle2, XCircle } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReviewsSummaryCards } from "@/components/admin/reviews/ReviewsSummaryCards";
import { ReviewFilters, SortOption } from "@/components/admin/reviews/ReviewFilters";
import { ReviewsTable } from "@/components/admin/reviews/ReviewsTable";
import { mockReviewsList, AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReviewDetail[]>(mockReviewsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "ALL">("ALL");
  const [ratingFilter, setRatingFilter] = useState<number | "ALL">("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleUpdateStatus = (id: string, status: ReviewStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, moderatedAt: new Date().toISOString() } : r))
    );
    showToast(`Review ${id} status updated to ${status}`);
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    showToast(`Review ${id} deleted`);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredReviews.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredReviews.map((r) => r.id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedIds.length === 0) return;
    setReviews((prev) =>
      prev.map((r) => (selectedIds.includes(r.id) ? { ...r, status: "APPROVED" as ReviewStatus } : r))
    );
    showToast(`Bulk approved ${selectedIds.length} reviews`);
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    if (selectedIds.length === 0) return;
    setReviews((prev) =>
      prev.map((r) => (selectedIds.includes(r.id) ? { ...r, status: "REJECTED" as ReviewStatus } : r))
    );
    showToast(`Bulk rejected ${selectedIds.length} reviews`);
    setSelectedIds([]);
  };

  const handleExportReviews = () => {
    showToast("Exporting review records to CSV...");
  };

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        if (statusFilter !== "ALL" && rev.status !== statusFilter) return false;
        if (ratingFilter !== "ALL" && rev.rating !== ratingFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchId = rev.reviewNumber.toLowerCase().includes(q) || rev.id.toLowerCase().includes(q);
          const matchCust = rev.customerName.toLowerCase().includes(q) || rev.customerEmail.toLowerCase().includes(q);
          const matchProd = rev.productName.toLowerCase().includes(q) || rev.productSku.toLowerCase().includes(q);
          if (!matchId && !matchCust && !matchProd) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortOption === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortOption === "rating_high") return b.rating - a.rating;
        if (sortOption === "rating_low") return a.rating - b.rating;
        return 0;
      });
  }, [reviews, searchQuery, statusFilter, ratingFilter, sortOption]);

  const totalPages = Math.ceil(filteredReviews.length / pageSize) || 1;
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReviews.slice(start, start + pageSize);
  }, [filteredReviews, currentPage, pageSize]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <AdminPageHeader
        title="Reviews & Ratings"
        subtitle="Manage customer feedback, ratings, and content moderation."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportReviews}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleBulkApprove}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 text-white disabled:text-stone-400 text-xs font-semibold transition-colors disabled:cursor-not-allowed shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bulk Approve ({selectedIds.length})</span>
            </button>

            <button
              type="button"
              onClick={handleBulkReject}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-stone-200 text-white disabled:text-stone-400 text-xs font-semibold transition-colors disabled:cursor-not-allowed shadow-2xs"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Bulk Reject ({selectedIds.length})</span>
            </button>
          </div>
        }
      />

      {/* Summary KPI Cards */}
      <ReviewsSummaryCards reviews={reviews} />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          placeholder="Search by customer, product, or review ID..."
        />
        <ReviewFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      {/* Main Reviews Table */}
      <ReviewsTable
        reviews={paginatedReviews}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onUpdateStatus={handleUpdateStatus}
        onDeleteReview={handleDeleteReview}
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredReviews.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
