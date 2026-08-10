"use client";

import React, { useState } from "react";
import { FileText, Download, CheckCircle2, FileSpreadsheet } from "lucide-react";
import { mockReportsList, ReportItem } from "@/data/mockAnalyticsData";

interface ReportsCardProps {
  onDownloadReport?: (reportTitle: string) => void;
}

export function ReportsCard({ onDownloadReport }: ReportsCardProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (report: ReportItem) => {
    setDownloadingId(report.id);
    if (onDownloadReport) onDownloadReport(report.title);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>Available Financial & Sales Reports</h3>
        <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
          Export ready audit statements, GST returns, inventory logs, and customer cohort files.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {mockReportsList.map((rep) => {
          const isDownloading = downloadingId === rep.id;
          return (
            <div
              key={rep.id}
              style={{
                background: "#FAF8F3",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.06)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 12,
                transition: "border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#F57C00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: rep.format === "XLSX" ? "rgba(22,163,74,0.1)" : "rgba(245,124,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: rep.format === "XLSX" ? "#16A34A" : "#F57C00",
                    }}
                  >
                    {rep.format === "XLSX" ? <FileSpreadsheet size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>{rep.title}</div>
                    <div style={{ fontSize: 11, color: "#999999" }}>
                      {rep.format} • {rep.fileSize} • Generated {rep.lastGenerated}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "#666666", lineHeight: 1.4 }}>{rep.description}</div>

              <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 10, display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => handleDownload(rep)}
                  disabled={isDownloading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: isDownloading ? "#16A34A" : "#F57C00",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                >
                  {isDownloading ? (
                    <>
                      <CheckCircle2 size={14} /> Preparing Download...
                    </>
                  ) : (
                    <>
                      <Download size={14} /> Export {rep.format}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
