"use client";

import React from "react";
import { CreditCard, CheckCircle2, XCircle, Clock, RotateCcw } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { mockPaymentMethods } from "@/data/mockAnalyticsData";

export function PaymentAnalytics() {
  const successRate = 98.4;
  const totalVolume = 3480200;

  return (
    <div className="space-y-6">
      {/* Payment Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50/60 border border-emerald-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Successful
          </div>
          <div className="text-xl font-extrabold text-emerald-950 font-display">1,814</div>
          <div className="text-[10px] text-emerald-700 font-bold">{successRate}% Success Rate</div>
        </div>

        <div className="bg-rose-50/60 border border-rose-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-rose-800 uppercase flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Failed Payments
          </div>
          <div className="text-xl font-extrabold text-rose-950 font-display">28</div>
          <div className="text-[10px] text-rose-700 font-bold">1.5% Failure Rate</div>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-amber-800 uppercase flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending COD
          </div>
          <div className="text-xl font-extrabold text-amber-950 font-display">147</div>
          <div className="text-[10px] text-amber-700 font-medium">₹2.78 L to collect</div>
        </div>

        <div className="bg-purple-50/60 border border-purple-200/80 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-semibold text-purple-800 uppercase flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5 text-purple-600" /> Refunds Issued
          </div>
          <div className="text-xl font-extrabold text-purple-950 font-display">₹62,400</div>
          <div className="text-[10px] text-purple-700 font-medium">1.6% of gross sales</div>
        </div>
      </div>

      {/* Payment Methods Chart & Table */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockPaymentMethods}
                dataKey="revenue"
                nameKey="method"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {mockPaymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => `₹${Number(val).toLocaleString("en-IN")}`}
                contentStyle={{ background: "#fff", borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="md:col-span-7 space-y-2.5">
          {mockPaymentMethods.map((pm) => (
            <div key={pm.method} className="flex items-center gap-3 text-xs p-2 bg-stone-50 rounded-xl border border-stone-200/60">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: pm.color }} />
              <div className="flex-1 font-semibold text-stone-800">{pm.method}</div>
              <div className="font-extrabold text-stone-900">₹{pm.revenue.toLocaleString("en-IN")}</div>
              <div className="w-12 text-right font-bold text-amber-700">{pm.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
