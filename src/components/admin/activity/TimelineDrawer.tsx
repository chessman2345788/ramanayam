"use client";

import React from "react";
import { X, Clock, User, Globe, Laptop, Shield, History, ArrowRight } from "lucide-react";
import { ActivityLogItem } from "@/types/activity";
import { SeverityBadge } from "./SeverityBadge";

interface TimelineDrawerProps {
  log: ActivityLogItem | null;
  onClose: () => void;
}

export function TimelineDrawer({ log, onClose }: TimelineDrawerProps) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border-l border-stone-200 shadow-2xl max-w-xl w-full h-full flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">Audit Log Inspection</h3>
              <p className="text-xs text-stone-500">ID: {log.id} • {log.timestamp}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Action Overview Box */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 text-sm font-display">{log.action}</span>
              <SeverityBadge severity={log.severity} size="sm" />
            </div>
            <div className="text-stone-600 space-y-1">
              <p><strong className="text-stone-800">Target Resource:</strong> {log.target}</p>
              <p><strong className="text-stone-800">Module:</strong> {log.module}</p>
              <p><strong className="text-stone-800">Execution Status:</strong> <span className={log.status === "SUCCESS" ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{log.status}</span></p>
            </div>
          </div>

          {/* User & Client Device Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs">
                <User className="w-3.5 h-3.5 text-amber-700" /> Performed By
              </div>
              <div className="flex items-center gap-2 pt-1">
                <img src={log.user.avatar} alt={log.user.name} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <span className="font-bold text-stone-900 block">{log.user.name}</span>
                  <span className="text-[10px] text-stone-500">{log.user.role}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs">
                <Globe className="w-3.5 h-3.5 text-amber-700" /> Origin & Client
              </div>
              <p className="text-stone-600">IP: <strong className="text-stone-800">{log.ipAddress}</strong></p>
              <p className="text-stone-600">{log.metadata.browser} • {log.metadata.os}</p>
              <p className="text-stone-400 text-[10px]">{log.metadata.location}</p>
            </div>
          </div>

          {/* Diff View (Old vs New Value) */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">Audit Diff State (Before vs After)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-800 text-[10px] uppercase block">Old Value (Before)</span>
                <pre className="text-[11px] text-rose-900 font-mono whitespace-pre-wrap overflow-x-auto">
                  {typeof log.metadata.before === "object"
                    ? JSON.stringify(log.metadata.before, null, 2)
                    : String(log.metadata.before || "None / Initial Creation")}
                </pre>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-800 text-[10px] uppercase block">New Value (After)</span>
                <pre className="text-[11px] text-emerald-900 font-mono whitespace-pre-wrap overflow-x-auto">
                  {typeof log.metadata.after === "object"
                    ? JSON.stringify(log.metadata.after, null, 2)
                    : String(log.metadata.after || "None")}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg">
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
