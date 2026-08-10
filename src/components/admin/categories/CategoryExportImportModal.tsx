"use client";

import React, { useState } from "react";
import { X, Download, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { CategoryItem } from "@/types/category";

interface CategoryExportImportModalProps {
  isOpen: boolean;
  type: "export" | "import" | null;
  categories: CategoryItem[];
  onClose: () => void;
  onImportSuccess?: (imported: CategoryItem[]) => void;
}

export const CategoryExportImportModal: React.FC<CategoryExportImportModalProps> = ({
  isOpen,
  type,
  categories,
  onClose,
  onImportSuccess,
}) => {
  const [importStatus, setImportStatus] = useState<"idle" | "uploading" | "done">("idle");

  if (!isOpen || !type) return null;

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Slug", "Parent ID", "Parent Name", "Product Count", "Status", "Description"];
    const rows = categories.map((c) => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      c.slug,
      c.parentId || "",
      `"${(c.parentName || "").replace(/"/g, '""')}"`,
      c.productCount,
      c.status,
      `"${(c.description || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ramanayam_categories_${new Date().toISOString().slice(0, 10)}.csv`);
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
        // Mock imported subcategories
        const newImported: CategoryItem[] = [
          {
            id: `cat-imp-${Date.now()}`,
            name: "Silver Aarti Diyas",
            slug: "silver-aarti-diyas",
            parentId: "cat-brass",
            parentName: "Brass & Utensils",
            description: "Pure 925 Sterling Silver Aarti Diyas & Camphor Burners",
            image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80",
            productCount: 8,
            status: "ACTIVE",
            seoTitle: "Pure 925 Silver Aarti Diyas",
            seoDescription: "Pure silver thalis and oil lamps for special havan.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        onImportSuccess(newImported);
      }
      setTimeout(() => {
        setImportStatus("idle");
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              {type === "export" ? <Download size={18} /> : <Upload size={18} />}
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {type === "export" ? "Export Category Taxonomy" : "Import Categories (CSV / JSON)"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {type === "export" ? (
          <div className="space-y-4 text-xs">
            <p className="text-stone-600">
              Export all <strong>{categories.length}</strong> categories, subcategories, slugs, product counts, and status flags into a CSV file compatible with Shopify Admin & Excel.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-1">
              <div className="font-semibold text-stone-700">Export Summary:</div>
              <p className="text-stone-500">• Total Top-Level Categories: {categories.filter((c) => !c.parentId).length}</p>
              <p className="text-stone-500">• Total Subcategories: {categories.filter((c) => c.parentId).length}</p>
              <p className="text-stone-500">• Export Format: UTF-8 Encoded CSV</p>
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
              Upload your category structure CSV or JSON file. Standard Shopify format supported.
            </p>

            <div className="border-2 border-dashed border-amber-300 bg-amber-50/40 rounded-2xl p-6 text-center space-y-2">
              <FileSpreadsheet size={32} className="mx-auto text-amber-600" />
              <div className="font-semibold text-stone-800">
                {importStatus === "done"
                  ? "Import Completed Successfully!"
                  : importStatus === "uploading"
                  ? "Processing & Validating Taxonomy..."
                  : "Drag & drop CSV file or click to browse"}
              </div>
              <p className="text-[11px] text-stone-500">Supports .csv, .json up to 5MB</p>
            </div>

            {importStatus === "done" && (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                <CheckCircle2 size={16} />
                <span>1 new subcategory imported into Brass & Utensils!</span>
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
