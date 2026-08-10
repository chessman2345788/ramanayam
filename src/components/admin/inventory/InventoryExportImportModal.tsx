"use client";

import React, { useState } from "react";
import { X, Download, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { InventoryItem } from "@/types/inventory";

interface InventoryExportImportModalProps {
  isOpen: boolean;
  type: "export" | "import" | null;
  items: InventoryItem[];
  onClose: () => void;
  onImportSuccess?: (imported: InventoryItem[]) => void;
}

export const InventoryExportImportModal: React.FC<InventoryExportImportModalProps> = ({
  isOpen,
  type,
  items,
  onClose,
  onImportSuccess,
}) => {
  const [importStatus, setImportStatus] = useState<"idle" | "uploading" | "done">("idle");

  if (!isOpen || !type) return null;

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Product Name",
      "SKU",
      "Barcode",
      "Category",
      "Warehouse",
      "Available",
      "Reserved",
      "Low Threshold",
      "Unit Cost",
      "Selling Price",
      "Status",
    ];
    const rows = items.map((i) => [
      i.id,
      `"${i.productName.replace(/"/g, '""')}"`,
      i.sku,
      i.barcode,
      `"${i.category.replace(/"/g, '""')}"`,
      `"${i.warehouse.replace(/"/g, '""')}"`,
      i.available,
      i.reserved,
      i.lowStockThreshold,
      i.unitCost,
      i.sellingPrice,
      i.status,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ramanayam_inventory_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const handleSimulateImport = () => {
    setImportStatus("uploading");
    setTimeout(() => {
      setImportStatus("done");
      if (onImportSuccess) {
        const mockImported: InventoryItem[] = [
          {
            id: `inv-imp-${Date.now()}`,
            productName: "Natural Kumkum & Chandan Combo Set",
            sku: "KUM-CHAND-01",
            barcode: "8901234567999",
            category: "Pooja Samagri",
            vendor: "Vrindavan Organic Farms",
            warehouse: "Ayodhya Main Warehouse",
            available: 50,
            reserved: 0,
            lowStockThreshold: 10,
            unitCost: 150,
            sellingPrice: 399,
            status: "IN_STOCK",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
            updatedAt: new Date().toISOString(),
          },
        ];
        onImportSuccess(mockImported);
      }
      setTimeout(() => {
        setImportStatus("idle");
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs md:text-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              {type === "export" ? <Download size={18} /> : <Upload size={18} />}
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {type === "export" ? "Export Inventory File" : "Import Inventory Stock (CSV)"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {type === "export" ? (
          <div className="space-y-4 text-xs">
            <p className="text-stone-600">
              Export all <strong>{items.length}</strong> inventory stock records, SKUs, warehouse allocations, and unit costs into a CSV spreadsheet.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
              <div className="font-semibold text-stone-700">Export Breakdown:</div>
              <p className="text-stone-500">• Total SKUs Included: {items.length}</p>
              <p className="text-stone-500">• Format: UTF-8 Encoded CSV</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onClose} className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleExportCSV}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Download size={15} />
                <span>Download CSV</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <p className="text-stone-600">
              Upload stock count CSV exported from ERP or warehouse handheld scanners.
            </p>

            <div className="border-2 border-dashed border-amber-300 bg-amber-50/40 rounded-2xl p-6 text-center space-y-2">
              <FileSpreadsheet size={32} className="mx-auto text-amber-600" />
              <div className="font-semibold text-stone-800">
                {importStatus === "done"
                  ? "Import Completed Successfully!"
                  : importStatus === "uploading"
                  ? "Processing Stock Levels & SKUs..."
                  : "Drag & drop CSV file or click to browse"}
              </div>
              <p className="text-[11px] text-stone-500">Supports .csv, .xlsx files</p>
            </div>

            {importStatus === "done" && (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                <CheckCircle2 size={16} />
                <span>1 new SKU stock record imported to Ayodhya Warehouse!</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onClose} className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleSimulateImport}
                disabled={importStatus !== "idle"}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs disabled:opacity-50 flex items-center gap-1.5"
              >
                <Upload size={15} />
                <span>{importStatus === "uploading" ? "Importing..." : "Start Import"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
