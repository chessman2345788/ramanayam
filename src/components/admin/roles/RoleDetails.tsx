"use client";

import React from "react";
import { ShieldCheck, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { AdminRoleDetail, TOTAL_PERMISSIONS_COUNT } from "@/data/mockRolesData";
import { StatusBadge } from "./StatusBadge";

interface RoleDetailsProps {
  role: AdminRoleDetail;
}

export function RoleDetails({ role }: RoleDetailsProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-stone-900 font-display">{role.name}</h2>
              <StatusBadge status={role.status} isSystemRole={role.isSystemRole} />
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{role.description}</p>
          </div>
        </div>

        <div className="flex flex-col text-right text-xs text-stone-400 space-y-0.5">
          <div className="flex items-center gap-1 sm:justify-end">
            <Calendar className="w-3.5 h-3.5" />
            <span>Created {role.createdAt}</span>
          </div>
          {role.updatedAt && (
            <div className="flex items-center gap-1 sm:justify-end">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated {role.updatedAt}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 text-xs">
        <div>
          <div className="text-stone-400 font-medium">Assigned Users</div>
          <div className="text-lg font-extrabold text-stone-900 mt-0.5">{role.usersCount} Staff</div>
        </div>

        <div>
          <div className="text-stone-400 font-medium">Permissions Granted</div>
          <div className="text-lg font-extrabold text-amber-700 mt-0.5">
            {role.permissions.length} / {TOTAL_PERMISSIONS_COUNT}
          </div>
        </div>

        <div>
          <div className="text-stone-400 font-medium">Role Privilege Level</div>
          <div className="text-xs font-bold text-stone-800 mt-1">
            {role.id === "role_super_admin" ? "Unrestricted Full Root" : "Custom Granular Scope"}
          </div>
        </div>
      </div>
    </div>
  );
}
