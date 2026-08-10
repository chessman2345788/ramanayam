"use client";

import React from "react";

interface StorefrontBadgeProps {
  variant?: "saffron" | "maroon" | "emerald" | "stone" | "sky" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function StorefrontBadge({
  variant = "saffron",
  size = "md",
  children,
  className = "",
  icon,
}: StorefrontBadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  }[size];

  const variantStyles = {
    saffron: "bg-amber-50 text-amber-900 border border-amber-200/80 font-bold",
    maroon: "bg-red-950/90 text-amber-300 border border-red-800/80 font-serif font-bold",
    emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    stone: "bg-stone-100 text-stone-700 border border-stone-200 font-medium",
    sky: "bg-sky-50 text-sky-800 border border-sky-200 font-semibold",
    outline: "bg-white text-stone-800 border border-stone-300 font-semibold",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg uppercase tracking-wider ${sizeStyles} ${variantStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
