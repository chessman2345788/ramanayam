"use client";

import React from "react";
import { Users, UserCheck, UserPlus, RefreshCw, HeartHandshake } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function CustomerAnalytics() {
  const customerCohortData = [
    { month: "Jan", newCust: 540, returningCust: 820 },
    { month: "Feb", newCust: 480, returningCust: 890 },
    { month: "Mar", newCust: 820, returningCust: 1120 },
    { month: "Apr", newCust: 610, returningCust: 980 },
    { month: "May", newCust: 590, returningCust: 1040 },
    { month: "Jun", newCust: 710, returningCust: 1180 },
    { month: "Jul", newCust: 790, returningCust: 1210 },
    { month: "Aug", newCust: 860, returningCust: 1240 },
  ];

  return (
    <div className="space-y-6">
      {/* Customer Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
            <UserPlus className="w-3.5 h-3.5 text-amber-600" /> New Customers
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-display">860</div>
          <div className="text-[10px] font-bold text-emerald-700">+12.4% this month</div>
        </div>

        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-purple-600" /> Returning Buyers
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-display">1,240</div>
          <div className="text-[10px] font-bold text-emerald-700">+18.2% retention</div>
        </div>

        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" /> Repeat Rate
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-display">59.0%</div>
          <div className="text-[10px] font-bold text-emerald-700">High brand loyalty</div>
        </div>

        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
          <div className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" /> Avg LTV (Est.)
          </div>
          <div className="text-xl font-extrabold text-amber-700 font-display">₹14,250</div>
          <div className="text-[10px] text-stone-400 font-medium">3.8 orders / buyer</div>
        </div>
      </div>

      {/* New vs Returning Customers Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customerCohortData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            <XAxis dataKey="month" stroke="#78716c" fontSize={11} tickLine={false} />
            <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
            <Tooltip contentStyle={{ background: "#fff", borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="newCust" fill="#d97706" radius={[4, 4, 0, 0]} name="New Devotees" />
            <Bar dataKey="returningCust" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Returning Patrons" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
