"use client";

import React from "react";
import Link from "next/link";
import { Plus, Download, UserPlus, Shield } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";

interface RolesHeaderProps {
  onOpenInvite: () => void;
  onExport: () => void;
}

export function RolesHeader({ onOpenInvite, onExport }: RolesHeaderProps) {
  return (
    <PageHeader
      title="Roles & Permissions"
      subtitle="Manage admin roles and access permissions."
      icon={Shield}
      actions={
        <>
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 hover:border-stone-400 active:scale-95 transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            Export
          </button>

          <button
            type="button"
            onClick={onOpenInvite}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-amber-900 bg-amber-100/70 border border-amber-300 hover:bg-amber-100 active:scale-95 transition-all shadow-2xs"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-700" />
            Invite Staff
          </button>

          <Link
            href="/admin/roles/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 active:scale-95 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Role
          </Link>
        </>
      }
    />
  );
}
