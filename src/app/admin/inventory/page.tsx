"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { initialMockInventory, initialMockHistory, initialWarehouses } from "@/data/mockInventoryData";
import { InventoryFilterState, InventoryHistoryEntry, InventoryItem, StockAdjustmentReason } from "@/types/inventory";
import { InventorySummaryCards } from "@/components/admin/inventory/InventorySummaryCards";
import { LowStockPanel } from "@/components/admin/inventory/LowStockPanel";
import { InventoryFilters } from "@/components/admin/inventory/InventoryFilters";
import { InventoryTable } from "@/components/admin/inventory/InventoryTable";
import { StockAdjustmentDialog } from "@/components/admin/inventory/StockAdjustmentDialog";
import { InventoryHistoryDrawer } from "@/components/admin/inventory/InventoryHistoryDrawer";
import { InventoryTransferDialog } from "@/components/admin/inventory/InventoryTransferDialog";
import { InventoryService } from "@/services/inventory.service";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [history, setHistory] = useState<InventoryHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [warehouses] = useState<string[]>(initialWarehouses);

  const [adjustmentTarget, setAdjustmentTarget] = useState<InventoryItem | null>(null);
  const [historyTarget, setHistoryTarget] = useState<InventoryItem | null>(null);
  const [transferTarget, setTransferTarget] = useState<InventoryItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [filters, setFilters] = useState<InventoryFilterState>({
    searchQuery: "",
    category: "ALL",
    vendor: "ALL",
    warehouse: "ALL",
    stockStatus: "ALL",
    sortBy: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const reloadInventory = async () => {
    setIsLoading(true);
    try {
      const apiItems = await InventoryService.fetchInventoriesFromApi();
      if (apiItems && apiItems.length > 0) {
        const formatted: InventoryItem[] = apiItems.map((i: any, idx) => ({
          id: i.id || `inv-api-${idx}`,
          variantId: i.variantId || i.id,
          productName: i.productName,
          sku: i.sku,
          barcode: `BAR-${idx + 1000}`,
          category: i.category || "Puja Essentials",
          vendor: i.vendor || "Ramanayam Artisans",
          warehouse: i.location || "Main Mandir Warehouse",
          available: i.available,
          reserved: i.reserved || 0,
          lowStockThreshold: i.lowStockThreshold || 5,
          unitCost: 450,
          sellingPrice: 899,
          status: i.status === "OUT_OF_STOCK" ? "OUT_OF_STOCK" : i.status === "LOW_STOCK" ? "LOW_STOCK" : "IN_STOCK",
          image: "/images/products/placeholder.jpg",
          updatedAt: i.updatedAt || new Date().toISOString(),
        }));
        setItems(formatted);
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.error("Failed to load inventory from API:", err);
      showToast("Failed to load inventory from database.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reloadInventory();
  }, []);

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const vendors = useMemo(() => Array.from(new Set(items.map((i) => i.vendor))), [items]);

  const handleSaveStockAdjustment = async (
    targetItem: InventoryItem,
    type: "INCREASE" | "DECREASE",
    qty: number,
    reason: StockAdjustmentReason,
    notes: string
  ) => {
    const variantId = (targetItem as any).variantId || targetItem.id;
    try {
      if (type === "INCREASE") {
        await InventoryService.addStockFromApi(variantId, qty, targetItem.productName);
      } else {
        await InventoryService.decreaseStockFromApi(variantId, qty, targetItem.productName);
      }

      await reloadInventory();

      const historyEntry: InventoryHistoryEntry = {
        id: `hist-${Date.now()}`,
        inventoryId: targetItem.id,
        date: new Date().toISOString(),
        user: "Warehouse Manager",
        action: type,
        quantityChanged: qty,
        previousStock: targetItem.available,
        newStock: type === "INCREASE" ? targetItem.available + qty : Math.max(0, targetItem.available - qty),
        reason,
        notes: notes || `Manual ${type.toLowerCase()} adjustment.`,
      };
      setHistory((prev) => [historyEntry, ...prev]);
      showToast(`Stock updated for ${targetItem.productName}.`);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Stock adjustment failed.";
      showToast(`Error: ${errMsg}`);
    }
  };

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          if (!item.productName.toLowerCase().includes(q) && !item.sku.toLowerCase().includes(q)) return false;
        }
        if (filters.category !== "ALL" && item.category !== filters.category) return false;
        if (filters.stockStatus !== "ALL" && item.status !== filters.stockStatus) return false;
        return true;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [items, filters]);

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <AdminPageHeader
        title="Inventory & Stock Control"
        subtitle="Manage product stock, warehouse availability, and reorder alerts."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setAdjustmentTarget(items[0] || null)}
              className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              <span>+ Stock Adjustment</span>
            </button>
          </div>
        }
      />

      <InventorySummaryCards items={items} />
      <LowStockPanel items={items} onRestock={(item) => setAdjustmentTarget(item)} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={filters.searchQuery}
          onChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
          placeholder="Search stock by product name or SKU..."
        />
        <InventoryFilters
          filters={filters}
          onFilterChange={(u) => setFilters((prev) => ({ ...prev, ...u }))}
          categories={categories}
          vendors={vendors}
          warehouses={warehouses}
          totalFilteredCount={filteredItems.length}
        />
      </div>

      <InventoryTable
        items={paginatedItems}
        selectedIds={selectedIds}
        onSelectAll={(checked) => setSelectedIds(checked ? paginatedItems.map((i) => i.id) : [])}
        onSelectOne={(id, checked) => setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))}
        onAdjustStock={(item) => setAdjustmentTarget(item)}
        onTransferStock={(item) => setTransferTarget(item)}
        onViewHistory={(item) => setHistoryTarget(item)}
        onEditThreshold={async (item) => {
          const val = prompt(`Set low stock alert limit for ${item.productName}:`, item.lowStockThreshold.toString());
          if (val !== null && !isNaN(Number(val))) {
            const variantId = (item as any).variantId || item.id;
            try {
              await InventoryService.adjustStockFromApi(variantId, { lowStockAlert: Number(val) });
              showToast(`Low stock alert threshold updated to ${val} for ${item.productName}.`);
              await reloadInventory();
            } catch (err: any) {
              showToast(`Failed to update threshold: ${err?.message || "Error"}`);
            }
          }
        }}
      />

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredItems.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <StockAdjustmentDialog
        isOpen={!!adjustmentTarget}
        item={adjustmentTarget}
        onClose={() => setAdjustmentTarget(null)}
        onSave={handleSaveStockAdjustment}
      />
      <InventoryHistoryDrawer
        isOpen={!!historyTarget}
        item={historyTarget}
        historyEntries={history}
        onClose={() => setHistoryTarget(null)}
      />
    </div>
  );
}
