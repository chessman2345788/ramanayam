"use client";

import React, { useState } from "react";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DateRangePicker, DateRangePreset } from "@/components/admin/analytics/DateRangePicker";
import { AnalyticsCards } from "@/components/admin/analytics/AnalyticsCards";
import { RevenueChart } from "@/components/admin/analytics/RevenueChart";
import { RevenueBreakdown } from "@/components/admin/analytics/RevenueBreakdown";
import { TopProductsTable } from "@/components/admin/analytics/TopProductsTable";
import { TopCategoriesGrid } from "@/components/admin/analytics/TopCategoriesGrid";
import { CustomerAnalytics } from "@/components/admin/analytics/CustomerAnalytics";
import { OrderAnalytics } from "@/components/admin/analytics/OrderAnalytics";
import { PaymentPieChart } from "@/components/admin/analytics/PaymentPieChart";
import { FestivalChart } from "@/components/admin/analytics/FestivalChart";
import { ProductPerformance } from "@/components/admin/analytics/ProductPerformance";
import { RealtimeActivity } from "@/components/admin/analytics/RealtimeActivity";
import { ReportsCard } from "@/components/admin/analytics/ReportsCard";
import { mockSummaryKPIs } from "@/data/mockAnalyticsData";
import { AdminToast } from "@/components/admin/ui";

export default function AdminAnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState<DateRangePreset>("30days");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleExportPDF = () => {
    showToast("Generating Executive PDF Analytics Report...");
  };

  const handleExportExcel = () => {
    showToast("Exporting Raw Analytics & Sales Data to Excel (.xlsx)...");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Header */}
      <AdminPageHeader
        title="Analytics & Reports"
        subtitle="Track store business performance with real-time analytics."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <DateRangePicker
              selectedRange={selectedRange}
              onRangeChange={(range) => {
                setSelectedRange(range);
                showToast(`Updated analytics view for: ${range.toUpperCase()}`);
              }}
            />

            <button
              type="button"
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-amber-50 hover:border-amber-200 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export Excel</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-purple-50 hover:border-purple-200 text-stone-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-purple-600" />
              <span>Print Report</span>
            </button>
          </div>
        }
      />

      {/* Summary KPI Cards Grid (12 Cards) */}
      <AnalyticsCards kpiItems={mockSummaryKPIs} />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <RevenueBreakdown />
        </div>
      </div>

      {/* Dedicated Festival Dashboard */}
      <FestivalChart />

      {/* Top Products & Top Categories Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsTable />
        <TopCategoriesGrid />
      </div>

      {/* Customer Analytics & Order Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerAnalytics />
        <OrderAnalytics />
      </div>

      {/* Payment Analytics & Realtime Stream Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentPieChart />
        <RealtimeActivity />
      </div>

      {/* Product Performance Highlights */}
      <ProductPerformance />

      {/* Reports Card Section */}
      <ReportsCard
        onDownloadReport={(reportTitle) => {
          showToast(`Downloading report file: ${reportTitle}`);
        }}
      />
    </div>
  );
}
