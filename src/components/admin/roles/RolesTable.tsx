"use client";

import React from "react";
import Link from "next/link";
import { Shield, Copy, Trash2, Edit3 } from "lucide-react";
import { AdminRoleDetail, StaffUserItem } from "@/types/roles";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionMenu } from "@/components/admin/ActionMenu";

interface RolesTableProps {
  roles: AdminRoleDetail[];
  staff: StaffUserItem[];
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RolesTable({ roles, staff, onDuplicate, onDelete }: RolesTableProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              <th className="py-3.5 px-4">Role Name</th>
              <th className="py-3.5 px-4">Users Assigned</th>
              <th className="py-3.5 px-4 text-center">Permissions</th>
              <th className="py-3.5 px-4">Created Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {roles.map((role) => {
              const roleStaff = staff.filter((s) => s.roleId === role.id);
              const isSystem = role.isSystemRole;

              return (
                <tr key={role.id} className="hover:bg-stone-50/60 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-2xs"
                        style={{ backgroundColor: role.color || "#F57C00" }}
                      >
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/roles/${role.id}`}
                            className="font-bold text-stone-900 hover:text-amber-700 transition-colors font-display"
                          >
                            {role.name}
                          </Link>
                          {isSystem && (
                            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-stone-100 text-stone-600 rounded border border-stone-200">
                              System
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 max-w-xs">{role.description}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {roleStaff.slice(0, 3).map((u) => (
                          <img
                            key={u.id}
                            src={u.avatar}
                            alt={u.name}
                            title={u.name}
                            className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-stone-700">
                        {roleStaff.length} {roleStaff.length === 1 ? "user" : "users"}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 font-bold border border-amber-200">
                      {role.permissionsCount} perms
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-stone-500 font-medium">{role.createdAt}</td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={role.status} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionMenu
                        items={[
                          {
                            label: "Configure Role",
                            icon: Edit3,
                            href: `/admin/roles/${role.id}`,
                          },
                          {
                            label: "Duplicate Role",
                            icon: Copy,
                            onClick: () => onDuplicate(role.id),
                          },
                          ...(!isSystem
                            ? [
                                {
                                  label: "Delete Role",
                                  icon: Trash2,
                                  isDanger: true,
                                  onClick: () => onDelete(role.id),
                                },
                              ]
                            : []),
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
