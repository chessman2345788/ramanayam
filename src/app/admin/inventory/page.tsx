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
  const [items, setItems] = useState<InventoryItem[]>(initialMockInventory);
  const [history, setHistory] = useState<InventoryHistoryEntry[]>(initialMockHistory);
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

  useEffect(() => {
    async function loadInventory() {
      try {
        const apiItems = await InventoryService.fetchInventoriesFromApi();
        if (apiItems && apiItems.length > 0) {
          const formatted: InventoryItem[] = apiItems.map((i, idx) => ({
            id: i.id || `inv-api-${idx}`,
            productName: i.productName,
            sku: i.sku,
            barcode: `BAR-${idx + 1000}`,
            category: "Sacred Items",
            vendor: "Sacred Artisans Guild",
            warehouse: i.location || "Main Mandir Warehouse",
            available: i.available,
            reserved: i.reserved,
            lowStockThreshold: i.lowStockThreshold,
            unitCost: 450,
            sellingPrice: 899,
            status: i.status === "OUT_OF_STOCK" ? "OUT_OF_STOCK" : i.status === "LOW_STOCK" ? "LOW_STOCK" : "IN_STOCK",
            image: "/images/products/placeholder.jpg",
            updatedAt: i.updatedAt,
          }));
          setItems(formatted);
        }
      } catch (err) {
        console.warn("Inventory API fetch fallback to mock:", err);
      }
    }
    loadInventory();
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
    const change = type === "INCREASE" ? qty : -qty;
    const newAvailable = Math.max(0, targetItem.available + change);
    let newStatus: InventoryItem["status"] = "IN_STOCK";
    if (newAvailable === 0) newStatus = "OUT_OF_STOCK";
    else if (newAvailable <= targetItem.lowStockThreshold) newStatus = "LOW_STOCK";

    await InventoryService.updateStockFromApi(targetItem.id, newAvailable);

    setItems((prev) =>
      prev.map((i) => (i.id === targetItem.id ? { ...i, available: newAvailable, status: newStatus, updatedAt: new Date().toISOString() } : i))
    );

    const historyEntry: InventoryHistoryEntry = {
      id: `hist-${Date.now()}`,
      inventoryId: targetItem.id,
      date: new Date().toISOString(),
      user: "Warehouse Manager",
      action: type,
      quantityChanged: qty,
      previousStock: targetItem.available,
      newStock: newAvailable,
      reason,
      notes: notes || `Manual ${type.toLowerCase()} adjustment.`,
    };
    setHistory((prev) => [historyEntry, ...prev]);
    showToast(`Stock updated for ${targetItem.productName}: ${newAvailable} units.`);
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
        onEditThreshold={(item) => {
          const val = prompt(`Set low stock alert limit for ${item.productName}:`, item.lowStockThreshold.toString());
          if (val !== null && !isNaN(Number(val))) {
            setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, lowStockThreshold: Number(val) } : i)));
            showToast(`Threshold updated for ${item.productName}.`);
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
