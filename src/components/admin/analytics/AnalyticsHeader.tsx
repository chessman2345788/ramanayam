"use client";

import React from "react";
import { Download, FileText, Printer, BarChart3 } from "lucide-react";
import { DateRangeSelector, DateRangeOption } from "./DateRangeSelector";

interface AnalyticsHeaderProps {
  selectedRange: DateRangeOption;
  onRangeChange: (range: DateRangeOption) => void;
  onExportCSV: () => void;
  onExportReport: () => void;
  onPrintReport: () => void;
}

export function AnalyticsHeader({
  selectedRange,
  onRangeChange,
  onExportCSV,
  onExportReport,
  onPrintReport,
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 font-display">
            Store Analytics & Intelligence
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Comprehensive sales, customer cohorts, product movement, and festival performance.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DateRangeSelector selectedRange={selectedRange} onRangeChange={onRangeChange} />

        <button
          type="button"
          onClick={onExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-600" />
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-purple-600" />
          <span>PDF Report</span>
        </button>

        <button
          type="button"
          onClick={onPrintReport}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-stone-600" />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
}
