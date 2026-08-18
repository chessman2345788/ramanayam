"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  UserPlus,
  ShieldCheck,
} from "lucide-react";
import { AdminRoleDetail, StaffUserItem, TOTAL_PERMISSIONS_COUNT } from "@/data/mockRolesData";
import { StatusBadge } from "./StatusBadge";

interface RolesTableProps {
  roles: AdminRoleDetail[];
  staffUsers: StaffUserItem[];
  onDuplicate: (role: AdminRoleDetail) => void;
  onDelete: (role: AdminRoleDetail) => void;
  onAssignUsers: (role: AdminRoleDetail) => void;
}

export function RolesTable({
  roles,
  staffUsers,
  onDuplicate,
  onDelete,
  onAssignUsers,
}: RolesTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3.5">Role Name</th>
              <th className="p-3.5">Description</th>
              <th className="p-3.5">Users Assigned</th>
              <th className="p-3.5">Permissions</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Created Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {roles.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-stone-500 text-xs">
                  No RBAC roles match your search filter.
                </td>
              </tr>
            ) : (
              roles.map((r) => {
                const isMenuOpen = activeMenuId === r.id;
                const assignedStaff = staffUsers.filter((u) => u.roleId === r.id || u.roleName === r.name);

                return (
                  <tr key={r.id} className="hover:bg-amber-50/20 transition-colors">
                    {/* Role Name */}
                    <td className="p-3.5 whitespace-nowrap max-w-[220px]">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <Link href={`/admin/roles/${r.id}`} className="font-bold text-stone-900 hover:text-amber-700 transition-colors truncate block">
                            {r.name}
                          </Link>
                          <div className="text-[10px] text-stone-400 font-mono">{r.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="p-3.5 max-w-[280px]">
                      <p className="text-stone-600 font-normal line-clamp-2 leading-relaxed">{r.description}</p>
                    </td>

                    {/* Users Assigned */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {assignedStaff.slice(0, 3).map((u) => (
                            <img
                              key={u.id}
                              src={u.avatar}
                              alt={u.name}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                              title={u.name}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-stone-800">
                          {assignedStaff.length} staff
                        </span>
                      </div>
                    </td>

                    {/* Permissions Count */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-extrabold text-amber-700">
                        {r.permissions.length} / {TOTAL_PERMISSIONS_COUNT}
                      </div>
                      <div className="text-[10px] text-stone-400 font-medium">Granular permissions</div>
                    </td>

                    {/* Status */}
                    <td className="p-3.5 whitespace-nowrap">
                      <StatusBadge status={r.status} isSystemRole={r.isSystemRole} />
                    </td>

                    {/* Created Date */}
                    <td className="p-3.5 whitespace-nowrap text-stone-500 font-medium text-[11px]">
                      {r.createdAt}
                    </td>

                    {/* Actions Menu */}
                    <td className="p-3.5 text-right whitespace-nowrap relative">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/roles/${r.id}`}
                          title="View Role Details"
                          className="p-1.5 text-stone-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setActiveMenuId(isMenuOpen ? null : r.id)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <>
                          <div onClick={() => setActiveMenuId(null)} className="fixed inset-0 z-40" />
                          <div className="absolute right-3 top-10 w-44 bg-white rounded-xl border border-stone-200 shadow-xl p-1 z-50 text-left animate-in fade-in zoom-in-95 duration-100 space-y-0.5">
                            <Link
                              href={`/admin/roles/${r.id}`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-600" /> View Details
                            </Link>

                            <Link
                              href={`/admin/roles/${r.id}?edit=true`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5 text-sky-600" /> Edit Permissions
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                onDuplicate(r);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5 text-purple-600" /> Duplicate Role
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onAssignUsers(r);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <UserPlus className="w-3.5 h-3.5 text-emerald-600" /> Assign Users
                            </button>

                            {!r.isSystemRole && (
                              <button
                                type="button"
                                onClick={() => {
                                  onDelete(r);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Role
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
