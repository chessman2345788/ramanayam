"use client";

import React, { useState } from "react";
import { Users, Search, UserPlus, UserMinus, CheckCircle, Clock } from "lucide-react";
import { StaffUserItem } from "@/types/roles";
import { useRoles } from "./RolesContext";

interface UserAssignmentListProps {
  roleId: string;
  roleName: string;
}

export function UserAssignmentList({ roleId, roleName }: UserAssignmentListProps) {
  const { staff, assignUserRole, roles } = useRoles();
  const [search, setSearch] = useState("");

  const assignedUsers = staff.filter((s) => s.roleId === roleId);
  const unassignedUsers = staff.filter((s) => s.roleId !== roleId);

  const filteredUnassigned = unassignedUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="p-5 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-700" />
          <h3 className="text-sm font-bold text-stone-900">User Assignment ({assignedUsers.length})</h3>
        </div>
        <span className="text-xs font-semibold text-stone-500">Role: {roleName}</span>
      </div>

      <div className="p-5 space-y-5">
        {/* Currently Assigned List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
            Assigned Staff ({assignedUsers.length})
          </h4>
          {assignedUsers.length === 0 ? (
            <p className="text-xs text-stone-400 italic py-2">No staff members currently assigned to this role.</p>
          ) : (
            <div className="space-y-2">
              {assignedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{user.name}</span>
                        {user.status === "ACTIVE" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            <CheckCircle className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            <Clock className="w-3 h-3" /> Invited
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">{user.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const defaultRole = roles.find((r) => r.id !== roleId)?.id || "role_customer_support";
                      assignUserRole(user.id, defaultRole);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors"
                  >
                    <UserMinus className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add User Section */}
        <div className="pt-4 border-t border-stone-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
            Assign Other Staff Members
          </h4>

          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search available staff by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 transition-all"
            />
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {filteredUnassigned.length === 0 ? (
              <p className="text-xs text-stone-400 py-1">No additional staff available to assign.</p>
            ) : (
              filteredUnassigned.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-semibold text-stone-800">{user.name}</span>
                      <p className="text-[10px] text-stone-400">{user.email} • Current: {user.roleName}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => assignUserRole(user.id, roleId)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Assign
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
