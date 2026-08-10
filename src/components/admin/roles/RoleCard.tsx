"use client";

import React from "react";
import Link from "next/link";
import { Shield, Copy, Trash2, Edit3, Users } from "lucide-react";
import { AdminRoleDetail, StaffUserItem } from "@/types/roles";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface RoleCardProps {
  role: AdminRoleDetail;
  assignedStaff: StaffUserItem[];
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RoleCard({ role, assignedStaff, onDuplicate, onDelete }: RoleCardProps) {
  const isSystem = role.isSystemRole;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-xs font-bold text-sm"
              style={{ backgroundColor: role.color || "#F57C00" }}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900 leading-tight font-display">{role.name}</h3>
                {isSystem && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 rounded border border-stone-200">
                    System
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Created {role.createdAt}</span>
            </div>
          </div>

          <StatusBadge status={role.status} size="sm" />
        </div>

        <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">{role.description}</p>
      </div>

      <div className="pt-3 border-t border-stone-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-medium">Permissions Granted</span>
          <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            {role.permissionsCount} perms
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs font-semibold text-stone-700">{assignedStaff.length} Users</span>
          </div>

          <div className="flex -space-x-1.5 overflow-hidden">
            {assignedStaff.slice(0, 4).map((user) => (
              <img
                key={user.id}
                src={user.avatar}
                alt={user.name}
                title={user.name}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
              />
            ))}
            {assignedStaff.length > 4 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-[10px] font-bold text-stone-600 ring-2 ring-white">
                +{assignedStaff.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onDuplicate(role.id)}
            title="Duplicate Role"
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>

          {!isSystem && (
            <button
              type="button"
              onClick={() => onDelete(role.id)}
              title="Delete Role"
              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <Link
            href={`/admin/roles/${role.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-md transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Configure
          </Link>
        </div>
      </div>
    </div>
  );
}
