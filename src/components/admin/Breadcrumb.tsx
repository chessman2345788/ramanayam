"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();

  // Parse path segments
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const formattedLabel = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      label: formattedLabel,
      href: index === segments.length - 1 ? undefined : href,
      isCurrent: index === segments.length - 1,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center text-xs text-[#666666]">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            href="/admin"
            className="flex items-center gap-1 hover:text-[#F57C00] transition-colors focus:outline-none focus-visible:underline"
            title="Admin Home"
          >
            <Home className="w-3.5 h-3.5 text-[#999999]" />
            <span className="sr-only">Admin</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-[#BBBBBB] shrink-0" />
            {item.isCurrent || !item.href ? (
              <span className="font-semibold text-[#171717] truncate max-w-[150px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#F57C00] transition-colors truncate max-w-[120px]"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
