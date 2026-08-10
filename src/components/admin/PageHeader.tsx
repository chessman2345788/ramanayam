"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  badge,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-stone-200/80 mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-stone-500">
          <Link href="/admin" className="hover:text-amber-700 font-medium transition-colors">
            Admin
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label + idx}>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-amber-700 font-medium transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-stone-800">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 shadow-2xs shrink-0">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
                {title}
              </h1>
              {badge && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2.5 flex-wrap">{actions}</div>}
      </div>
    </div>
  );
}
