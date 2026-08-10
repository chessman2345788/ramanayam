"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, ShieldPlus } from "lucide-react";
import { RolesProvider, useRoles } from "@/components/admin/roles/RolesContext";
import { RoleForm } from "@/components/admin/roles/RoleForm";
import { PermissionMatrix } from "@/components/admin/roles/PermissionMatrix";
import { RoleStatus } from "@/types/roles";

function CreateRoleContent() {
  const router = useRouter();
  const { addRole } = useRoles();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#F57C00");
  const [iconName, setIconName] = useState("ShieldCheck");
  const [status, setStatus] = useState<RoleStatus>("ACTIVE");
  const [permissions, setPermissions] = useState<Record<string, string[]>>({
    dashboard: ["view"],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addRole({
      name,
      description,
      color,
      iconName,
      isSystemRole: false,
      status,
      permissions,
    });

    router.push("/admin/roles");
  };

  return (
    <form onSubmit={handleSave} className="p-6 space-y-6 max-w-5xl mx-auto pb-24">
      {/* Back & Title Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/roles"
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <ShieldPlus className="w-5 h-5 text-amber-700" />
              <h1 className="text-xl font-bold text-stone-900">Create Custom Role</h1>
            </div>
            <p className="text-xs text-stone-500">Define access scope and permission policies.</p>
          </div>
        </div>
      </div>

      {/* Role General Form */}
      <RoleForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        color={color}
        setColor={setColor}
        iconName={iconName}
        setIconName={setIconName}
        status={status}
        setStatus={setStatus}
      />

      {/* Permission Matrix */}
      <PermissionMatrix permissions={permissions} onChange={setPermissions} />

      {/* Sticky Bottom Save Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md border-t border-stone-200 px-6 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">
            Configuring new custom role permission set
          </span>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/roles"
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-lg shadow-md transition-all active:scale-95"
            >
              <Save className="w-4 h-4" /> Save Role
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function CreateRolePage() {
  return (
    <RolesProvider>
      <CreateRoleContent />
    </RolesProvider>
  );
}
