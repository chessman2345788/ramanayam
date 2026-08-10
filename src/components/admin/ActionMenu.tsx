"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MoreVertical, LucideIcon } from "lucide-react";

export interface ActionMenuItem {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  isDanger?: boolean;
  disabled?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  align?: "left" | "right";
}

export function ActionMenu({ items, align = "right" }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
        title="Actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-30 mt-1 w-44 rounded-xl bg-white border border-stone-200 shadow-lg py-1.5 text-xs animate-in fade-in zoom-in-95 duration-100 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, idx) => {
            const IconComp = item.icon;
            const content = (
              <>
                {IconComp && <IconComp className="w-3.5 h-3.5 shrink-0" />}
                <span>{item.label}</span>
              </>
            );

            const baseStyle = `w-full flex items-center gap-2 px-3 py-2 text-left font-medium transition-colors ${
              item.disabled
                ? "opacity-40 cursor-not-allowed text-stone-400"
                : item.isDanger
                ? "text-rose-600 hover:bg-rose-50"
                : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
            }`;

            if (item.href && !item.disabled) {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={baseStyle}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={baseStyle}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
