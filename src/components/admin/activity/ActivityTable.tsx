"use client";

import React from "react";
import { DataTable, StatusBadge } from "@/components/admin";
import { ActivityLogItem } from "@/types/activity";
import { SeverityBadge } from "./SeverityBadge";
import { Eye, ShieldCheck, AlertOctagon } from "lucide-react";

interface ActivityTableProps {
  logs: ActivityLogItem[];
  onInspectLog: (log: ActivityLogItem) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ActivityTable({
  logs,
  onInspectLog,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ActivityTableProps) {
  return (
    <DataTable<ActivityLogItem>
      data={logs}
      keyExtractor={(item) => item.id}
      pagination={{
        currentPage,
        totalPages,
        totalItems,
        pageSize,
        onPageChange,
      }}
      columns={[
        {
          header: "Timestamp",
          render: (item) => (
            <span className="font-mono text-[11px] text-stone-500 font-medium">{item.timestamp}</span>
          ),
        },
        {
          header: "User & Role",
          render: (item) => (
            <div className="flex items-center gap-2.5">
              <img src={item.user.avatar} alt={item.user.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
              <div>
                <span className="font-bold text-stone-900 block leading-tight font-display">{item.user.name}</span>
                <span className="text-[10px] text-stone-500 font-medium">{item.user.role}</span>
              </div>
            </div>
          ),
        },
        {
          header: "Module",
          render: (item) => (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-stone-100 text-stone-700 border border-stone-200">
              {item.module}
            </span>
          ),
        },
        {
          header: "Action",
          render: (item) => (
            <span className="font-semibold text-stone-800 text-xs">{item.action}</span>
          ),
        },
        {
          header: "Target Entity",
          render: (item) => (
            <span className="font-mono text-xs text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
              {item.target}
            </span>
          ),
        },
        {
          header: "IP Address",
          render: (item) => (
            <span className="font-mono text-[11px] text-stone-500">{item.ipAddress}</span>
          ),
        },
        {
          header: "Severity",
          render: (item) => <SeverityBadge severity={item.severity} size="sm" />,
        },
        {
          header: "Status",
          render: (item) => <StatusBadge status={item.status} size="sm" />,
        },
        {
          header: "Actions",
          align: "right",
          render: (item) => (
            <button
              type="button"
              onClick={() => onInspectLog(item)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Inspect
            </button>
          ),
        },
      ]}
    />
  );
}
