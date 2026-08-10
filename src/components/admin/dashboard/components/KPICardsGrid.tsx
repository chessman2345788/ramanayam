"use client";

import React from "react";
import { StatCard } from "./StatCard";
import { mockKPIMetrics } from "../data/dashboard.mock";

export function KPICardsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockKPIMetrics.map((metric, idx) => (
        <StatCard key={metric.id} metric={metric} index={idx} />
      ))}
    </div>
  );
}
