"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  width?: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  searchField?: (item: T) => string;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: string) => void;
  actions?: (item: T) => React.ReactNode;
}

export function AdminTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = "Search...",
  searchField,
  actions,
}: AdminTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredData = data.filter((item) => {
    if (!searchTerm || !searchField) return true;
    return searchField(item).toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      {/* Table Toolbar */}
      {searchField && (
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: 320,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 12,
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              style={{
                width: "100%",
                height: 36,
                paddingLeft: 36,
                paddingRight: 12,
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: 13,
                outline: "none",
                background: "var(--bg-primary)",
              }}
            />
          </div>

          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Showing <b>{paginatedData.length}</b> of <b>{filteredData.length}</b> items
          </div>
        </div>
      )}

      {/* Table Container */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: 13,
          }}
        >
          <thead>
            <tr
              style={{
                background: "var(--bg-primary)",
                borderBottom: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontWeight: 600,
              }}
            >
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: "12px 20px",
                    width: col.width,
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th style={{ padding: "12px 20px", width: 80, textAlign: "right" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  style={{
                    padding: "48px 20px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  No records found
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.15s ease",
                  }}
                  className="hover:bg-(--bg-primary)"
                >
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      style={{
                        padding: "14px 20px",
                        color: "var(--text-primary)",
                        verticalAlign: "middle",
                      }}
                    >
                      {col.accessor(item)}
                    </td>
                  ))}
                  {actions && (
                    <td
                      style={{
                        padding: "14px 20px",
                        textAlign: "right",
                        verticalAlign: "middle",
                      }}
                    >
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Page {currentPage} of {totalPages}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
