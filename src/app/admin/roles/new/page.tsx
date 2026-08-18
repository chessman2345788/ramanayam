"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { RoleForm } from "@/components/admin/roles";
import { AdminRoleDetail } from "@/data/mockRolesData";
import { AdminToast } from "@/components/admin/ui";

export default function AdminNewRolePage() {
  const router = useRouter();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmitNewRole = (roleData: Partial<AdminRoleDetail>) => {
    setToastMsg(`New role "${roleData.name}" created successfully! Redirecting...`);
    setTimeout(() => {
      router.push("/admin/roles");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
        <Link
          href="/admin/roles"
          className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 font-display">
            Create Custom RBAC Role
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure role name, description, and granular module permissions.
          </p>
        </div>
      </div>

      {/* Role Creation Form */}
      <RoleForm
        onSubmit={handleSubmitNewRole}
        onCancel={() => router.push("/admin/roles")}
      />
    </div>
  );
}
