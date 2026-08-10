"use client";

import React from "react";
import { Filter, Calendar, Layers, ShieldAlert, User, Activity } from "lucide-react";
import { ActivityModule, ActivitySeverity, ActivityActionType } from "@/types/activity";

interface ActivityFiltersProps {
  dateRange: string;
  setDateRange: (v: string) => void;
  moduleFilter: string;
  setModuleFilter: (v: string) => void;
  severityFilter: string;
  setSeverityFilter: (v: string) => void;
  actionTypeFilter: string;
  setActionTypeFilter: (v: string) => void;
  userFilter: string;
  setUserFilter: (v: string) => void;
  onReset: () => void;
}

const modulesList: ActivityModule[] = [
  "Authentication",
  "Products",
  "Inventory",
  "Orders",
  "Payments",
  "Customers",
  "Reviews",
  "Coupons",
  "CMS",
  "Settings",
  "System",
  "Security",
];

const actionTypesList: ActivityActionType[] = [
  "Created",
  "Updated",
  "Deleted",
  "Published",
  "Archived",
  "Login",
  "Logout",
  "Password Changed",
  "Permission Changed",
  "Status Updated",
  "Refund Issued",
];

export function ActivityFilters({
  dateRange,
  setDateRange,
  moduleFilter,
  setModuleFilter,
  severityFilter,
  setSeverityFilter,
  actionTypeFilter,
  setActionTypeFilter,
  userFilter,
  setUserFilter,
  onReset,
}: ActivityFiltersProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-amber-700" />
          <span>Advanced Audit Log Filters</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-amber-800 hover:text-amber-950 transition-colors"
        >
          Reset All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Date Range */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white font-medium text-stone-700"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>

        {/* Module */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
            Module
          </label>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white font-medium text-stone-700"
          >
            <option value="all">All Modules</option>
            {modulesList.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
            Severity
          </label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white font-medium text-stone-700"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Action Type */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
            Action Type
          </label>
          <select
            value={actionTypeFilter}
            onChange={(e) => setActionTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white font-medium text-stone-700"
          >
            <option value="all">All Action Types</option>
            {actionTypesList.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* User */}
        <div>
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
            User / Actor
          </label>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 bg-white font-medium text-stone-700"
          >
            <option value="all">All Users</option>
            <option value="Pandit Rajesh Sharma">Pandit Rajesh Sharma (Super Admin)</option>
            <option value="Sanjay Verma">Sanjay Verma (Order Manager)</option>
            <option value="Meera Agarwal">Meera Agarwal (Marketing Manager)</option>
            <option value="Pooja Hegde">Pooja Hegde (Inventory Manager)</option>
            <option value="Unknown / Failed Auth">Unknown / Failed Auth</option>
          </select>
        </div>
      </div>
    </div>
  );
}
