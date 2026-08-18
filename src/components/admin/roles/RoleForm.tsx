"use client";

import React from "react";
import { ShieldCheck, CheckSquare, Square } from "lucide-react";
import { ALL_PERMISSION_GROUPS, ALL_PERMISSION_IDS, AdminRoleDetail } from "@/data/mockRolesData";
import { PermissionGroup } from "./PermissionGroup";

interface RoleFormProps {
  initialRole?: Partial<AdminRoleDetail>;
  onSubmit: (roleData: Partial<AdminRoleDetail>) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

export function RoleForm({
  initialRole,
  onSubmit,
  onCancel,
  isEditMode,
}: RoleFormProps) {
  const [name, setName] = React.useState(initialRole?.name || "");
  const [description, setDescription] = React.useState(initialRole?.description || "");
  const [status, setStatus] = React.useState<"ACTIVE" | "INACTIVE">(initialRole?.status || "ACTIVE");
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>(
    initialRole?.permissions || []
  );

  const isSuperAdmin = initialRole?.id === "role_super_admin";

  const handleTogglePermission = (id: string, value: boolean) => {
    if (isSuperAdmin) return;
    if (value) {
      setSelectedPermissions((prev) => [...new Set([...prev, id])]);
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => p !== id));
    }
  };

  const handleSelectAllGroup = (groupId: string) => {
    if (isSuperAdmin) return;
    const group = ALL_PERMISSION_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const groupIds = group.permissions.map((p) => p.id);
    setSelectedPermissions((prev) => [...new Set([...prev, ...groupIds])]);
  };

  const handleClearAllGroup = (groupId: string) => {
    if (isSuperAdmin) return;
    const group = ALL_PERMISSION_GROUPS.find((g) => g.id === groupId);
    if (!group) return;
    const groupIds = group.permissions.map((p) => p.id);
    setSelectedPermissions((prev) => prev.filter((id) => !groupIds.includes(id)));
  };

  const handleGlobalSelectAll = () => {
    if (isSuperAdmin) return;
    setSelectedPermissions([...ALL_PERMISSION_IDS]);
  };

  const handleGlobalClearAll = () => {
    if (isSuperAdmin) return;
    setSelectedPermissions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      status,
      permissions: selectedPermissions,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Details Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Role Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Role Name *</label>
            <input
              type="text"
              required
              disabled={isSuperAdmin}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Inventory Specialist"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none disabled:bg-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
            <select
              disabled={isSuperAdmin}
              value={status}
              onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none cursor-pointer disabled:bg-stone-100"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Role Description *</label>
          <textarea
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the responsibilities and scope of this role..."
            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:border-amber-600 outline-none resize-none"
          />
        </div>
      </div>

      {/* Permissions Groups Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-sm font-bold text-stone-900 font-display">Granular Module Permissions</h2>
          <p className="text-xs text-stone-500">
            {selectedPermissions.length} of {ALL_PERMISSION_IDS.length} total permissions enabled
          </p>
        </div>

        {!isSuperAdmin && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleGlobalSelectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Select All Permissions</span>
            </button>

            <button
              type="button"
              onClick={handleGlobalClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 text-stone-400" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Permission Groups List */}
      <div className="space-y-4">
        {ALL_PERMISSION_GROUPS.map((group) => (
          <PermissionGroup
            key={group.id}
            group={group}
            selectedPermissionIds={selectedPermissions}
            onTogglePermission={handleTogglePermission}
            onSelectAllGroup={handleSelectAllGroup}
            onClearAllGroup={handleClearAllGroup}
            disabled={isSuperAdmin}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
        >
          {isEditMode ? "Save Changes" : "Create Role"}
        </button>
      </div>
    </form>
  );
}
