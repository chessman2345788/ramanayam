"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Users, SlidersHorizontal } from "lucide-react";
import { AdminRoleDetail, StaffUserItem } from "@/data/mockRolesData";

interface RoleSummaryCardsProps {
  roles: AdminRoleDetail[];
  staffUsers: StaffUserItem[];
}

export function RoleSummaryCards({ roles, staffUsers }: RoleSummaryCardsProps) {
  const totalRoles = roles.length;
  const activeRoles = roles.filter((r) => r.status === "ACTIVE").length;
  const totalStaff = staffUsers.length;
  const customRoles = roles.filter((r) => !r.isSystemRole).length;

  const cards = [
    {
      title: "Total Roles",
      value: totalRoles,
      subtitle: "RBAC security profiles",
      icon: ShieldCheck,
      iconBg: "bg-amber-50 text-amber-700 border-amber-200",
      valueColor: "text-stone-900",
    },
    {
      title: "Active Roles",
      value: activeRoles,
      subtitle: "Operational roles",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      valueColor: "text-emerald-700",
    },
    {
      title: "Total Staff",
      value: totalStaff,
      subtitle: "Assigned admin users",
      icon: Users,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      valueColor: "text-purple-700",
    },
    {
      title: "Custom Roles",
      value: customRoles,
      subtitle: "User-configured roles",
      icon: SlidersHorizontal,
      iconBg: "bg-sky-50 text-sky-600 border-sky-200",
      valueColor: "text-sky-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{c.title}</span>
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${c.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className={`text-2xl font-extrabold font-display ${c.valueColor}`}>
                {c.value}
              </div>
              <p className="text-[11px] font-medium text-stone-400 mt-0.5">{c.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
