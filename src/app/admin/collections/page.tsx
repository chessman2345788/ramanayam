"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Download, Upload, CheckCircle2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CollectionSummaryCards } from "@/components/admin/collections/CollectionSummaryCards";
import { CollectionSearchBar } from "@/components/admin/collections/CollectionSearchBar";
import { CollectionFilters, CollectionSortOption } from "@/components/admin/collections/CollectionFilters";
import { CollectionsTable } from "@/components/admin/collections/CollectionsTable";
import { Pagination } from "@/components/admin/collections/Pagination";
import { mockCollectionsList, AdminCollectionDetail, CollectionStatus, CollectionVisibility, CollectionType } from "@/data/mockCollectionsData";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<AdminCollectionDetail[]>(mockCollectionsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CollectionStatus | "ALL">("ALL");
  const [visibilityFilter, setVisibilityFilter] = useState<CollectionVisibility | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<CollectionType | "ALL">("ALL");
  const [sortOption, setSortOption] = useState<CollectionSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Duplicate Collection
  const handleDuplicateCollection = (collection: AdminCollectionDetail) => {
    const duplicated: AdminCollectionDetail = {
      ...collection,
      id: `col_${Date.now()}`,
      name: `${collection.name} (Copy)`,
      slug: `${collection.slug}-copy`,
      status: "DRAFT",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCollections([duplicated, ...collections]);
    showToast(`Duplicated collection "${duplicated.name}" created`);
  };

  // Delete Collection
  const handleDeleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    showToast(`Collection ${id} deleted`);
  };

  // Filter & Search Logic
  const filteredCollections = useMemo(() => {
    return collections
      .filter((c) => {
        if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
        if (visibilityFilter !== "ALL" && c.visibility !== visibilityFilter) return false;
        if (typeFilter !== "ALL" && c.type !== typeFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = c.name.toLowerCase().includes(q);
          const matchSlug = c.slug.toLowerCase().includes(q);
          const matchDesc = c.description.toLowerCase().includes(q);
          if (!matchName && !matchSlug && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortOption === "oldest") return new Date(a.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortOption === "most_products") return b.productsCount - a.productsCount;
        return 0;
      });
  }, [collections, searchQuery, statusFilter, visibilityFilter, typeFilter, sortOption]);

  const totalPages = Math.ceil(filteredCollections.length / pageSize) || 1;
  const paginatedCollections = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCollections.slice(start, start + pageSize);
  }, [filteredCollections, currentPage, pageSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#171717",
            color: "#FFFFFF",
            padding: "12px 18px",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 100,
          }}
        >
          <CheckCircle2 size={16} style={{ color: "#F57C00" }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <AdminPageHeader
        title="Collections"
        subtitle="Organize products into curated collections."
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => showToast("Exporting curated collections metadata to CSV...")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#FFFFFF",
                color: "#171717",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <Download size={15} style={{ color: "#F57C00" }} /> Export
            </button>

            <button
              type="button"
              onClick={() => showToast("Opening collection bulk CSV importer...")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#FFFFFF",
                color: "#171717",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <Upload size={15} style={{ color: "#701A75" }} /> Import
            </button>

            <Link
              href="/admin/collections/new"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 10,
                border: "none",
                background: "#F57C00",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 2px 10px rgba(245,124,0,0.25)",
              }}
            >
              <Plus size={16} /> + Create Collection
            </Link>
          </div>
        }
      />

      {/* Summary KPI Cards */}
      <CollectionSummaryCards collections={collections} />

      {/* Search & Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <CollectionSearchBar value={searchQuery} onChange={setSearchQuery} />
        <CollectionFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          visibilityFilter={visibilityFilter}
          onVisibilityChange={setVisibilityFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      {/* Main Collections Table */}
      <CollectionsTable
        collections={paginatedCollections}
        onDuplicateCollection={handleDuplicateCollection}
        onDeleteCollection={handleDeleteCollection}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCollections.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
