"use client";

import React from "react";
import { Activity, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { mockSystemHealth } from "../data/dashboard.mock";
import { SystemServiceHealth } from "../types/dashboard.types";

export function SystemHealth() {
  const getBadge = (status: SystemServiceHealth["status"]) => {
    switch (status) {
      case "Healthy":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Healthy
          </span>
        );
      case "Warning":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Warning
          </span>
        );
      case "Offline":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 rounded-full">
            <XCircle className="w-3 h-3 text-red-600" />
            Offline
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
          <div>
            <h2 className="text-base font-serif font-bold text-[#7A1F1F]">
              System Health & Services
            </h2>
            <p className="text-xs text-[#666666]">Infrastructure status monitoring</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          All Core Systems Nominal
        </span>
      </div>

      {/* Grid of System Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {mockSystemHealth.map((svc) => (
          <div
            key={svc.id}
            className="p-3 bg-[#FAF8F3]/60 border border-black/5 rounded-xl flex flex-col justify-between hover:bg-white hover:shadow-xs transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[#171717] truncate">{svc.name}</span>
            </div>
            {getBadge(svc.status)}

            <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] text-[#666666]">
              <span>Latency: {svc.latency}</span>
              <span>Uptime: {svc.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
