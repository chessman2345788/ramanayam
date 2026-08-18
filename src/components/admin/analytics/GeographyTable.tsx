"use client";

import React from "react";
import { MapPin, Building2 } from "lucide-react";

export function GeographyTable() {
  const geoData = [
    { state: "Uttar Pradesh", topCity: "Varanasi / Ayodhya", orders: 642, revenue: 1420000, share: "28%" },
    { state: "Maharashtra", topCity: "Mumbai / Pune", orders: 485, revenue: 980000, share: "21%" },
    { state: "Karnataka", topCity: "Bengaluru", orders: 320, revenue: 640000, share: "14%" },
    { state: "Delhi NCR", topCity: "New Delhi / Noida", orders: 280, revenue: 590000, share: "12%" },
    { state: "Gujarat", topCity: "Ahmedabad / Surat", orders: 210, revenue: 420000, share: "9%" },
    { state: "Rajasthan", topCity: "Jaipur / Jodhpur", orders: 155, revenue: 310000, share: "7%" },
    { state: "West Bengal", topCity: "Kolkata", orders: 120, revenue: 240000, share: "5%" },
    { state: "Tamil Nadu", topCity: "Chennai", orders: 90, revenue: 180000, share: "4%" },
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3">State</th>
              <th className="p-3">Top Order Hubs / City</th>
              <th className="p-3">Total Orders</th>
              <th className="p-3">Total Sales Revenue</th>
              <th className="p-3">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {geoData.map((row) => (
              <tr key={row.state} className="hover:bg-amber-50/20 transition-colors">
                <td className="p-3 font-bold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{row.state}</span>
                </td>
                <td className="p-3 text-stone-600 font-medium">{row.topCity}</td>
                <td className="p-3 font-bold text-stone-900">{row.orders.toLocaleString("en-IN")}</td>
                <td className="p-3 font-extrabold text-amber-700">₹{row.revenue.toLocaleString("en-IN")}</td>
                <td className="p-3 font-semibold text-stone-500">{row.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
