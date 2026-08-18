"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { initialMockCategories } from "@/data/mockCategoryData";
import { CategoryFilterState, CategoryItem } from "@/types/category";
import { CategoryFilters } from "@/components/admin/categories/CategoryFilters";
import { CategoryTable } from "@/components/admin/categories/CategoryTable";
import { CategoryModal } from "@/components/admin/categories/CategoryModal";
import { CategoryDeleteDialog } from "@/components/admin/categories/CategoryDeleteDialog";
import { CategoryEmptyState } from "@/components/admin/categories/CategoryEmptyState";
import { ProductService } from "@/services/product.service";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [defaultParentId, setDefaultParentId] = useState<string | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<CategoryItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [filters, setFilters] = useState<CategoryFilterState>({
    searchQuery: "",
    status: "ALL",
    parentId: "ALL",
    sortBy: "newest",
    viewMode: "table",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const reloadCategories = async () => {
    setIsLoading(true);
    try {
      const apiCats = await ProductService.fetchCategoriesFromApi();
      if (apiCats && apiCats.length > 0) {
        const formatted: CategoryItem[] = apiCats.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          parentId: c.parentId || null,
          parentName: c.parentName || null,
          description: c.description || "",
          image: c.image || "/images/categories/placeholder.jpg",
          productCount: c.productCount || 0,
          status: (c.status || (c.isActive ? "ACTIVE" : "HIDDEN")) as any,
          seoTitle: c.seoTitle || c.name,
          seoDescription: c.seoDescription || c.description || "",
          createdAt: c.createdAt || new Date().toISOString(),
          updatedAt: c.updatedAt || new Date().toISOString(),
        }));
        setCategories(formatted);
      } else {
        setCategories([]);
      }
    } catch (err: any) {
      console.error("Failed to load categories from API:", err);
      showToast("Failed to load categories from database.");
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reloadCategories();
  }, []);

  const handleSaveCategory = async (categoryData: Partial<CategoryItem>) => {
    try {
      if (categoryData.id) {
        await ProductService.updateCategoryFromApi(categoryData.id, categoryData);
        showToast(`Category "${categoryData.name}" updated successfully.`);
      } else {
        const created = await ProductService.createCategoryFromApi(categoryData);
        showToast(`New category "${created.name || categoryData.name}" created successfully.`);
      }
      await reloadCategories();
      setIsModalOpen(false);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to save category.";
      showToast(`Error: ${errMsg}`);
    }
  };

  const handleDeleteCategory = async (category: CategoryItem) => {
    try {
      await ProductService.deleteCategoryFromApi(category.id);
      showToast(`Category "${category.name}" deleted successfully.`);
      setSelectedIds((prev) => prev.filter((id) => id !== category.id));
      setDeleteCategory(null);
      await reloadCategories();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Cannot delete category.";
      showToast(`Delete Error: ${errMsg}`);
    }
  };

  const handleDuplicate = (category: CategoryItem) => {
    showToast(`Backend limitation: Category duplication endpoint (/categories/${category.id}/duplicate) is currently unavailable.`);
  };

  const handleToggleHide = async (category: CategoryItem) => {
    const nextStatus = category.status === "HIDDEN" ? "ACTIVE" : "HIDDEN";
    try {
      await ProductService.updateCategoryFromApi(category.id, { status: nextStatus });
      showToast(`Category "${category.name}" status updated to ${nextStatus}.`);
      await reloadCategories();
    } catch (err: any) {
      showToast(`Failed to update status: ${err?.message || "Error"}`);
    }
  };

  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          if (!cat.name.toLowerCase().includes(q) && !cat.slug.toLowerCase().includes(q)) return false;
        }
        if (filters.status !== "ALL" && cat.status !== filters.status) return false;
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [categories, filters]);

  const totalPages = Math.ceil(filteredCategories.length / pageSize) || 1;
  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, currentPage, pageSize]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <AdminPageHeader
        title="Categories Management"
        subtitle="Organize product catalogue categories, subcategories, and hierarchy."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setEditingCategory(null);
                setDefaultParentId(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              <span>+ Add Category</span>
            </button>
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={filters.searchQuery}
          onChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
          placeholder="Search categories by name or slug..."
        />
        <CategoryFilters
          filters={filters}
          onFilterChange={(u) => setFilters((prev) => ({ ...prev, ...u }))}
          categories={categories}
          totalResultsCount={filteredCategories.length}
        />
      </div>

      {filteredCategories.length === 0 ? (
        <CategoryEmptyState
          hasFilters={!!filters.searchQuery}
          onResetFilters={() => setFilters({ searchQuery: "", status: "ALL", parentId: "ALL", sortBy: "newest", viewMode: filters.viewMode })}
          onAddCategory={() => setIsModalOpen(true)}
        />
      ) : (
        <CategoryTable
          categories={paginatedCategories}
          selectedIds={selectedIds}
          onSelectAll={(checked) => setSelectedIds(checked ? paginatedCategories.map((c) => c.id) : [])}
          onSelectOne={(id, checked) => setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))}
          onEdit={(cat) => { setEditingCategory(cat); setIsModalOpen(true); }}
          onDelete={(cat) => setDeleteCategory(cat)}
          onDuplicate={handleDuplicate}
          onToggleHide={handleToggleHide}
        />
      )}

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredCategories.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        initialCategory={editingCategory}
        parentOptions={categories}
        defaultParentId={defaultParentId}
      />
      <CategoryDeleteDialog
        isOpen={!!deleteCategory}
        category={deleteCategory}
        subcategoriesCount={0}
        onClose={() => setDeleteCategory(null)}
        onConfirm={handleDeleteCategory}
      />
    </div>
  );
}
