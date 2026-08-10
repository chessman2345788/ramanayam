"use client";

import React, { useState } from "react";
import { ActivityProvider, useActivity } from "@/components/admin/activity/ActivityContext";
import { ActivitySummaryCards } from "@/components/admin/activity/ActivitySummaryCards";
import { ActivityTable } from "@/components/admin/activity/ActivityTable";
import { ActivityFilters } from "@/components/admin/activity/ActivityFilters";
import { TimelineDrawer } from "@/components/admin/activity/TimelineDrawer";
import { PageHeader } from "@/components/admin";
import { ActivityLogItem } from "@/types/activity";
import { Activity, Download, Filter, ChevronDown } from "lucide-react";
import { AdminSearchBar, AdminToast } from "@/components/admin/ui";

function ActivityContent() {
  const { logs, exportLogs } = useActivity();
  const [search, setSearch] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [actionTypeFilter, setActionTypeFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<ActivityLogItem | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const resetFilters = () => {
    setDateRange("all");
    setModuleFilter("all");
    setSeverityFilter("all");
    setActionTypeFilter("all");
    setUserFilter("all");
    setSearch("");
    setCurrentPage(1);
  };

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.name.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.module.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase()) ||
      l.ipAddress.includes(search);

    const matchesModule = moduleFilter === "all" || l.module === moduleFilter;
    const matchesSeverity = severityFilter === "all" || l.severity === severityFilter;
    const matchesActionType = actionTypeFilter === "all" || l.action === actionTypeFilter;
    const matchesUser = userFilter === "all" || l.user.name === userFilter;

    return matchesSearch && matchesModule && matchesSeverity && matchesActionType && matchesUser;
  });

  const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1;
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <PageHeader
        title="Activity Logs & Audit Trail"
        subtitle="Track every important security, inventory, and order action across the platform."
        icon={Activity}
        badge={`${logs.length} Total Audits`}
        actions={
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showAdvancedFilters ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              Advanced Filters
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 transition-all shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export Logs
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl border border-stone-200 shadow-xl py-1 z-30 text-xs font-semibold animate-in fade-in zoom-in-95 duration-100">
                  <button
                    type="button"
                    onClick={() => {
                      exportLogs("csv");
                      setShowExportMenu(false);
                      showToast("Exported logs to CSV.");
                    }}
                    className="w-full px-3 py-2 text-left text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer"
                  >
                    Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      exportLogs("excel");
                      setShowExportMenu(false);
                      showToast("Exported logs to Excel.");
                    }}
                    className="w-full px-3 py-2 text-left text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer"
                  >
                    Export Excel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      exportLogs("pdf");
                      setShowExportMenu(false);
                      showToast("Exported logs to PDF.");
                    }}
                    className="w-full px-3 py-2 text-left text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer"
                  >
                    Export PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      />

      <ActivitySummaryCards logs={logs} />

      {showAdvancedFilters && (
        <ActivityFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          moduleFilter={moduleFilter}
          setModuleFilter={setModuleFilter}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          actionTypeFilter={actionTypeFilter}
          setActionTypeFilter={setActionTypeFilter}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          onReset={resetFilters}
        />
      )}

      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
        <AdminSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          placeholder="Search by User, Action, Module, Order ID, Product, or IP Address..."
          maxWidth="max-w-full"
        />
      </div>

      <ActivityTable
        logs={paginatedLogs}
        onInspectLog={setSelectedLog}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredLogs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      <TimelineDrawer log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}

export default function ActivityPage() {
  return (
    <ActivityProvider>
      <ActivityContent />
    </ActivityProvider>
  );
}
