"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: "#FFFFFF",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        fontSize: 13,
        color: "#666666",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      <div>
        Showing <span style={{ fontWeight: 600, color: "#171717" }}>{startItem}</span> to{" "}
        <span style={{ fontWeight: 600, color: "#171717" }}>{endItem}</span> of{" "}
        <span style={{ fontWeight: 600, color: "#171717" }}>{totalItems}</span> roles
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "5px 10px",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.12)",
            background: currentPage <= 1 ? "#FAF8F3" : "#FFFFFF",
            color: currentPage <= 1 ? "#BBBBBB" : "#171717",
            cursor: currentPage <= 1 ? "not-allowed" : "pointer",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          <ChevronLeft size={14} /> Previous
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: "none",
                background: isActive ? "#F57C00" : "transparent",
                color: isActive ? "#FFFFFF" : "#171717",
                fontWeight: isActive ? 700 : 500,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "5px 10px",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.12)",
            background: currentPage >= totalPages ? "#FAF8F3" : "#FFFFFF",
            color: currentPage >= totalPages ? "#BBBBBB" : "#171717",
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
