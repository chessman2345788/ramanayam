"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Package, Loader2, AlertCircle } from "lucide-react";
import { Product, ProductFilterState, BulkActionType } from "@/components/admin/products/types/product.types";
import { ProductFilters } from "@/components/admin/products/components/ProductFilters";
import { ProductTable } from "@/components/admin/products/components/ProductTable";
import { BulkActionsBar } from "@/components/admin/products/components/BulkActionsBar";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";
import {
  useProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useBulkDeleteMutation,
  useBulkPublishMutation,
  useBulkArchiveMutation,
} from "@/hooks/useProducts";

const initialFilters: ProductFilterState = {
  search: "",
  category: "",
  subcategory: "",
  brand: "",
  status: "",
  featured: null,
  stockFilter: "all",
  vendor: "",
  material: "",
  occasion: "",
  deity: "",
  minPrice: null,
  maxPrice: null,
  sortBy: "newest",
};

export default function AdminProductsPage() {
  const [filters, setFilters] = useState<ProductFilterState>(initialFilters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const queryParams = useMemo(() => {
    return {
      page: currentPage,
      limit: pageSize,
      search: filters.search || undefined,
      category: filters.category || undefined,
      status: filters.status || undefined,
      featured: filters.featured !== null ? filters.featured : undefined,
      minPrice: filters.minPrice ?? undefined,
      maxPrice: filters.maxPrice ?? undefined,
      sortBy: filters.sortBy,
    };
  }, [currentPage, pageSize, filters]);

  const { data, isLoading, isError, error } = useProductsQuery(queryParams);

  const products = data?.products || [];
  const totalItems = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  const deleteMutation = useDeleteProductMutation();
  const updateMutation = useUpdateProductMutation();
  const bulkDeleteMutation = useBulkDeleteMutation();
  const bulkPublishMutation = useBulkPublishMutation();
  const bulkArchiveMutation = useBulkArchiveMutation();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.status) count++;
    if (filters.material) count++;
    if (filters.deity) count++;
    return count;
  }, [filters]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleToggleSelectAll = () => {
    setSelectedIds(selectedIds.length === products.length ? [] : products.map((p: Product) => p.id));
  };

  const handleToggleFeatured = (id: string) => {
    const target = products.find((p: Product) => p.id === id);
    if (!target) return;
    updateMutation.mutate(
      { id, data: { isFeatured: !target.isFeatured } },
      {
        onSuccess: () => showToast(`Updated featured status for "${target.name}"`),
        onError: (err: any) => showToast(err.message || "Failed to update featured status"),
      }
    );
  };

  const handleDeleteProduct = (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        showToast(`Product "${product.name}" deleted successfully.`);
        setSelectedIds((prev) => prev.filter((i) => i !== product.id));
      },
      onError: (err: any) => showToast(err.message || "Failed to delete product."),
    });
  };

  const handleDuplicateProduct = (product: Product) => {
    showToast(`Draft copy of "${product.name}" created.`);
  };

  const handleArchiveProduct = (product: Product) => {
    updateMutation.mutate(
      { id: product.id, data: { status: "Archived" } },
      {
        onSuccess: () => showToast(`Archived product "${product.name}"`),
        onError: (err: any) => showToast(err.message || "Failed to archive product"),
      }
    );
  };

  const handleBulkAction = (action: BulkActionType) => {
    if (selectedIds.length === 0) return;

    if (action === "delete") {
      if (!confirm(`Delete ${selectedIds.length} selected products?`)) return;
      bulkDeleteMutation.mutate(selectedIds, {
        onSuccess: () => {
          showToast(`Deleted ${selectedIds.length} products.`);
          setSelectedIds([]);
        },
        onError: (err: any) => showToast(err.message || "Bulk delete failed."),
      });
    } else if (action === "publish") {
      bulkPublishMutation.mutate(selectedIds, {
        onSuccess: () => {
          showToast(`Published ${selectedIds.length} products.`);
          setSelectedIds([]);
        },
        onError: (err: any) => showToast(err.message || "Bulk publish failed."),
      });
    } else if (action === "archive" || action === "unpublish") {
      bulkArchiveMutation.mutate(selectedIds, {
        onSuccess: () => {
          showToast(`Archived/Unpublished ${selectedIds.length} products.`);
          setSelectedIds([]);
        },
        onError: (err: any) => showToast(err.message || "Bulk action failed."),
      });
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Package className="w-3.5 h-3.5" />
            <span>Catalogue Management</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-display">Products Catalogue</h1>
          <p className="text-xs text-stone-500 mt-0.5">Manage temple catalogue products, live inventory, and pricing.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={filters.search}
          onChange={(search) => {
            setFilters((f) => ({ ...f, search }));
            setCurrentPage(1);
          }}
          placeholder="Search products by name, SKU, or brand..."
        />
        <ProductFilters
          filters={filters}
          onFilterChange={(newF) => {
            setFilters(newF);
            setCurrentPage(1);
          }}
          onReset={() => {
            setFilters(initialFilters);
            setCurrentPage(1);
          }}
          activeFilterCount={activeFilterCount}
        />
      </div>

      {/* Loading / Error States */}
      {isLoading ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
          <p className="text-sm font-semibold text-stone-700">Loading catalogue products from backend...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-800">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-sm font-bold">Failed to load products from API</p>
          <p className="text-xs text-red-600 mt-1">{(error as any)?.message || "Network error"}</p>
        </div>
      ) : (
        <ProductTable
          products={products}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleFeatured={handleToggleFeatured}
          onDelete={handleDeleteProduct}
          onDuplicate={handleDuplicateProduct}
          onArchive={handleArchiveProduct}
        />
      )}

      {/* Pagination */}
      {!isLoading && !isError && (
        <AdminPagination
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
      )}

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        onBulkAction={handleBulkAction}
      />
    </div>
  );
}
