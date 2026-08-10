"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface StorefrontButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function StorefrontButton({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: StorefrontButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3 text-sm sm:text-base gap-2.5 rounded-2xl",
  }[size];

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white shadow-md hover:shadow-lg active:scale-[0.98]",
    secondary:
      "bg-stone-900 hover:bg-stone-800 text-white shadow-sm hover:shadow-md active:scale-[0.98]",
    outline:
      "bg-white hover:bg-stone-50 border border-stone-200 hover:border-amber-500 text-stone-800 shadow-2xs active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-amber-50/80 text-stone-700 hover:text-amber-900 active:scale-[0.98]",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm active:scale-[0.98]",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
