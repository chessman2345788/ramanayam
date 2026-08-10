"use client";

import React, { createContext, useContext, useState } from "react";
import { ActivityLogItem } from "@/types/activity";
import { mockActivityLogsList } from "@/data/mockActivityData";

interface AddLogInput {
  user: {
    name: string;
    email?: string;
    role: string;
    avatar?: string;
  };
  module: ActivityLogItem["module"];
  action: ActivityLogItem["action"];
  target: string;
  ipAddress?: string;
  severity: ActivityLogItem["severity"];
  status: "SUCCESS" | "FAILED";
  metadata?: Partial<ActivityLogItem["metadata"]>;
}

interface ActivityContextType {
  logs: ActivityLogItem[];
  addLog: (input: AddLogInput) => void;
  exportLogs: (format: "csv" | "excel" | "pdf") => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<ActivityLogItem[]>(mockActivityLogsList);

  const addLog = (input: AddLogInput) => {
    const newLog: ActivityLogItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " Today",
      user: {
        name: input.user.name,
        email: input.user.email || `${input.user.name.toLowerCase().replace(/\s+/g, ".")}@ramanayam.com`,
        role: input.user.role,
        avatar: input.user.avatar || "/images/avatars/admin.png",
      },
      module: input.module,
      action: input.action,
      target: input.target,
      ipAddress: input.ipAddress || "127.0.0.1",
      severity: input.severity,
      status: input.status,
      metadata: {
        browser: input.metadata?.browser || "Chrome 122",
        os: input.metadata?.os || "Windows 11",
        device: input.metadata?.device || "Desktop",
        location: input.metadata?.location || "India",
        before: input.metadata?.before,
        after: input.metadata?.after,
      },
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const exportLogs = (format: "csv" | "excel" | "pdf") => {
    let content = "";
    let mimeType = "text/csv";
    let extension = ".csv";

    if (format === "excel") {
      mimeType = "application/vnd.ms-excel";
      extension = ".xls";
    } else if (format === "pdf") {
      mimeType = "application/pdf";
      extension = ".pdf";
    }

    const filename = `ramanayam_audit_logs_${new Date().toISOString().split("T")[0]}${extension}`;

    const headers = ["ID", "Timestamp", "User Name", "User Role", "Module", "Action", "Target", "IP Address", "Severity", "Status"];
    const rows = logs.map((l) => [
      l.id,
      l.timestamp,
      `"${l.user.name}"`,
      `"${l.user.role}"`,
      l.module,
      l.action,
      `"${l.target}"`,
      l.ipAddress,
      l.severity,
      l.status,
    ]);

    content = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const dataStr = `data:${mimeType};charset=utf-8,` + encodeURIComponent(content);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <ActivityContext.Provider value={{ logs, addLog, exportLogs }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) throw new Error("useActivity must be used within an ActivityProvider");
  return context;
}
