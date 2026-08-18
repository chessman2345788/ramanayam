"use client";

import React from "react";
import { Users, UserMinus, UserPlus } from "lucide-react";
import { StaffUserItem } from "@/data/mockRolesData";

interface AssignedUsersProps {
  users: StaffUserItem[];
  onOpenAssignDialog: () => void;
  onRemoveUser: (user: StaffUserItem) => void;
  isSuperAdmin?: boolean;
}

export function AssignedUsers({
  users,
  onOpenAssignDialog,
  onRemoveUser,
  isSuperAdmin,
}: AssignedUsersProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-stone-900 font-display">Assigned Staff Members</h3>
          <span className="text-xs font-semibold text-stone-400">({users.length})</span>
        </div>

        <button
          type="button"
          onClick={onOpenAssignDialog}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5 text-amber-700" />
          <span>Assign Staff Users</span>
        </button>
      </div>

      <div className="space-y-2">
        {users.length === 0 ? (
          <div className="p-6 text-center text-stone-400 text-xs">
            No staff members currently assigned to this role.
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
              <div className="flex items-center gap-3">
                <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-stone-200" />
                <div>
                  <div className="font-bold text-stone-900">{u.name}</div>
                  <div className="text-[10px] text-stone-400">{u.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                  {u.status}
                </span>

                {!isSuperAdmin && (
                  <button
                    type="button"
                    onClick={() => onRemoveUser(u)}
                    title="Remove user from role"
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
