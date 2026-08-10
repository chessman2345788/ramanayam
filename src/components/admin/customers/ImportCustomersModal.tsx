"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileText, Check, AlertCircle } from "lucide-react";

interface ImportCustomersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (count: number) => void;
}

export function ImportCustomersModal({ isOpen, onClose, onImportComplete }: ImportCustomersModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onImportComplete(25); // Simulated import of 25 customers
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-[#F57C00]" />
            <h3 className="text-sm font-semibold text-gray-900">Import Customers CSV</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-[#F57C00] shrink-0 mt-0.5" />
            <p>
              CSV columns should include: <strong>Name, Email, Phone, City, CustomerType, Status</strong>.
            </p>
          </div>

          <label className="border-2 border-dashed border-gray-200 hover:border-[#F57C00] bg-gray-50/50 hover:bg-amber-50/30 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all">
            <FileText className="w-8 h-8 text-[#F57C00] mb-2" />
            <span className="text-xs font-semibold text-gray-800">
              {selectedFile ? selectedFile.name : "Click to choose CSV file or drag & drop"}
            </span>
            <span className="text-[11px] text-gray-400 mt-1">Supports CSV, XLSX up to 10MB</span>
            <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="hidden" />
          </label>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!selectedFile || isUploading}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] hover:bg-[#E06D00] text-white text-xs font-semibold disabled:opacity-50 rounded-xl shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>{isUploading ? "Importing..." : "Start Import"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
