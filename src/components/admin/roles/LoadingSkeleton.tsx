"use client";

import React from "react";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-stone-200 rounded-md" />
          <div className="h-4 w-72 bg-stone-100 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-stone-200 rounded-lg" />
          <div className="h-9 w-28 bg-amber-200/50 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-stone-100 rounded-xl border border-stone-200 p-4 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-stone-200 rounded" />
              <div className="h-8 w-8 bg-stone-200 rounded-lg" />
            </div>
            <div className="h-6 w-12 bg-stone-300 rounded" />
          </div>
        ))}
      </div>

      <div className="h-64 bg-stone-100 rounded-xl border border-stone-200 p-6 space-y-4">
        <div className="h-5 w-40 bg-stone-200 rounded" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-stone-200/60 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
