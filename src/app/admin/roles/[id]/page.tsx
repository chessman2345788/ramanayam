"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, ShieldCheck, Lock } from "lucide-react";
import { RolesProvider, useRoles } from "@/components/admin/roles/RolesContext";
import { RoleForm } from "@/components/admin/roles/RoleForm";
import { PermissionMatrix } from "@/components/admin/roles/PermissionMatrix";
import { UserAssignmentList } from "@/components/admin/roles/UserAssignmentList";
import { RoleStatus } from "@/types/roles";

function EditRoleContent({ roleId }: { roleId: string }) {
  const router = useRouter();
  const { roles, updateRole } = useRoles();
  const role = roles.find((r) => r.id === roleId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#F57C00");
  const [iconName, setIconName] = useState("ShieldCheck");
  const [status, setStatus] = useState<RoleStatus>("ACTIVE");
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});
  const [activeTab, setActiveTab] = useState<"matrix" | "users" | "details">("matrix");

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
      setColor(role.color);
      setIconName(role.iconName);
      setStatus(role.status);
      setPermissions(role.permissions || {});
    }
  }, [role]);

  if (!role) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Role Not Found</h2>
        <p className="text-sm text-stone-500">The role with ID "{roleId}" does not exist.</p>
        <Link href="/admin/roles" className="inline-block text-xs font-bold text-amber-700 underline">
          Return to Roles Dashboard
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRole(roleId, {
      name,
      description,
      color,
      iconName,
      status,
      permissions,
    });
    router.push("/admin/roles");
  };

  return (
    <form onSubmit={handleSave} className="p-6 space-y-6 max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/roles" className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <h1 className="text-xl font-bold text-stone-900">{role.name}</h1>
              {role.isSystemRole && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold bg-stone-100 text-stone-600 rounded border border-stone-200">
                  <Lock className="w-3 h-3" /> System Managed
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500">ID: {role.id} • Created {role.createdAt}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("matrix")}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === "matrix" ? "border-amber-600 text-amber-900 font-bold" : "border-transparent text-stone-500 hover:text-stone-900"
          }`}
        >
          Permissions Matrix
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === "users" ? "border-amber-600 text-amber-900 font-bold" : "border-transparent text-stone-500 hover:text-stone-900"
          }`}
        >
          Assigned Users ({role.usersCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === "details" ? "border-amber-600 text-amber-900 font-bold" : "border-transparent text-stone-500 hover:text-stone-900"
          }`}
        >
          Role Settings
        </button>
      </div>

      {activeTab === "matrix" && (
        <PermissionMatrix permissions={permissions} onChange={setPermissions} />
      )}

      {activeTab === "users" && (
        <UserAssignmentList roleId={roleId} roleName={role.name} />
      )}

      {activeTab === "details" && (
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
      )}

      {/* Sticky Bottom Save Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md border-t border-stone-200 px-6 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">
            Editing role configuration for {role.name}
          </span>
          <div className="flex items-center gap-3">
            <Link href="/admin/roles" className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg">
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-lg shadow-md transition-all active:scale-95"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <RolesProvider>
      <EditRoleContent roleId={resolvedParams.id} />
    </RolesProvider>
  );
}
