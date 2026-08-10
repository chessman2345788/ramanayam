"use client";

import React from "react";
import { Shield, Users, UserCheck, Mail } from "lucide-react";
import { AdminRoleDetail, StaffUserItem } from "@/types/roles";
import { StatCard } from "@/components/admin/StatCard";

interface RoleSummaryCardsProps {
  roles: AdminRoleDetail[];
  staff: StaffUserItem[];
}

export function RoleSummaryCards({ roles, staff }: RoleSummaryCardsProps) {
  const totalRoles = roles.length;
  const activeStaff = staff.filter((s) => s.status === "ACTIVE").length;
  const customRoles = roles.filter((r) => !r.isSystemRole).length;
  const pendingInvitations = staff.filter((s) => s.status === "INVITED").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Roles"
        value={totalRoles}
        icon={Shield}
        subtext="System & Custom Roles"
        iconBg="bg-amber-50 border-amber-200"
        iconColor="text-amber-700"
      />
      <StatCard
        title="Active Staff"
        value={activeStaff}
        icon={UserCheck}
        subtext="Verified Admin Users"
        iconBg="bg-emerald-50 border-emerald-200"
        iconColor="text-emerald-600"
      />
      <StatCard
        title="Custom Roles"
        value={customRoles}
        icon={Users}
        subtext="User Defined Scope"
        iconBg="bg-orange-50 border-orange-200"
        iconColor="text-orange-600"
      />
      <StatCard
        title="Pending Invitations"
        value={pendingInvitations}
        icon={Mail}
        subtext="Awaiting Staff Acceptance"
        iconBg="bg-amber-100/60 border-amber-300"
        iconColor="text-amber-800"
      />
    </div>
  );
}
