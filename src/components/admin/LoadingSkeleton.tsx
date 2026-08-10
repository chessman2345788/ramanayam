"use client";

import React from "react";

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs animate-pulse">
      <div className="bg-stone-50 border-b border-stone-200 p-4 flex gap-4">
        <div className="h-4 w-1/4 bg-stone-200 rounded" />
        <div className="h-4 w-1/4 bg-stone-200 rounded" />
        <div className="h-4 w-1/4 bg-stone-200 rounded" />
        <div className="h-4 w-1/4 bg-stone-200 rounded" />
      </div>
      <div className="divide-y divide-stone-100 p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center py-2">
            <div className="h-9 w-9 bg-stone-200 rounded-lg shrink-0" />
            <div className="h-4 flex-1 bg-stone-200/80 rounded" />
            <div className="h-4 w-24 bg-stone-200/80 rounded" />
            <div className="h-4 w-16 bg-amber-100/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 space-y-3 shadow-2xs">
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 bg-stone-200 rounded" />
            <div className="h-8 w-8 bg-stone-200 rounded-lg" />
          </div>
          <div className="h-6 w-16 bg-stone-300 rounded" />
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 animate-pulse">
      <div className="h-5 w-44 bg-stone-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-10 bg-stone-100 rounded-lg" />
        <div className="h-10 bg-stone-100 rounded-lg" />
      </div>
      <div className="h-20 bg-stone-100 rounded-lg" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center pb-6 border-b border-stone-200 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-stone-200 rounded-md" />
          <div className="h-4 w-72 bg-stone-100 rounded-md" />
        </div>
        <div className="h-9 w-28 bg-amber-200/50 rounded-lg" />
      </div>
      <CardSkeleton count={4} />
      <TableSkeleton rows={6} />
    </div>
  );
}

export function LoadingSkeleton({ type = "table" }: { type?: "table" | "card" | "form" | "page" }) {
  if (type === "card") return <CardSkeleton />;
  if (type === "form") return <FormSkeleton />;
  if (type === "page") return <PageSkeleton />;
  return <TableSkeleton />;
}
