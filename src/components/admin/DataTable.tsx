"use client";

import React from "react";
import { EmptyState } from "./EmptyState";
import { TableSkeleton } from "./LoadingSkeleton";
import { Pagination } from "./roles/Pagination";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  render?: (item: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  isLoading?: boolean;
  emptyState?: {
    title?: string;
    description?: string;
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyState,
  pagination,
}: DataTableProps<T>) {
  if (isLoading) return <TableSkeleton rows={pagination?.pageSize || 5} />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={emptyState?.title || "No items found"}
        description={emptyState?.description || "No records exist for the selected query or filters."}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ width: col.width }}
                  className={`py-3.5 px-4 ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs text-stone-800">
            {data.map((item, rowIdx) => (
              <tr key={keyExtractor(item, rowIdx)} className="hover:bg-stone-50/60 transition-colors">
                {columns.map((col, colIdx) => {
                  const val = col.accessorKey ? String(item[col.accessorKey] ?? "") : "";
                  return (
                    <td
                      key={colIdx}
                      className={`py-3.5 px-4 ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {col.render ? col.render(item, rowIdx) : val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
