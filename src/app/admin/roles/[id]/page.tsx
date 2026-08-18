"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Edit, ShieldCheck, UserPlus, Eye } from "lucide-react";
import {
  RoleDetails,
  AssignedUsers,
  PermissionGroup,
  RoleForm,
  AssignUserDialog,
  ConfirmDialog,
  RoleConfirmActionType,
} from "@/components/admin/roles";
import {
  mockRolesList,
  mockStaffUsersList,
  ALL_PERMISSION_GROUPS,
  AdminRoleDetail,
  StaffUserItem,
} from "@/data/mockRolesData";
import { AdminToast } from "@/components/admin/ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminRoleDetailPage({ params }: PageProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEditMode = searchParams.get("edit") === "true";

  const initialRole = mockRolesList.find((r) => r.id === id) || mockRolesList[0];
  const [role, setRole] = useState<AdminRoleDetail>(initialRole);
  const [staffUsers, setStaffUsers] = useState<StaffUserItem[]>(mockStaffUsersList);
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Dialogs State
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    actionType: RoleConfirmActionType | null;
  }>({
    isOpen: false,
    actionType: null,
  });

  const isSuperAdmin = role.id === "role_super_admin";

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const assignedStaff = staffUsers.filter(
    (u) => u.roleId === role.id || u.roleName === role.name
  );

  const handleSaveRoleForm = (updatedData: Partial<AdminRoleDetail>) => {
    if (isSuperAdmin) {
      showToast("Super Admin permissions are fixed system defaults and cannot be altered.");
      setIsEditing(false);
      return;
    }

    setRole((prev) => ({
      ...prev,
      ...updatedData,
      updatedAt: new Date().toISOString().split("T")[0],
    }));

    setIsEditing(false);
    showToast(`Role "${updatedData.name || role.name}" permissions updated successfully.`);
  };

  const handleSaveAssignments = (selectedUserIds: string[]) => {
    setStaffUsers((prev) =>
      prev.map((u) => {
        if (selectedUserIds.includes(u.id)) {
          return { ...u, roleId: role.id, roleName: role.name };
        }
        if (u.roleId === role.id && !selectedUserIds.includes(u.id)) {
          return { ...u, roleId: "role_staff", roleName: "Staff / Moderator" };
        }
        return u;
      })
    );

    setRole((prev) => ({ ...prev, usersCount: selectedUserIds.length }));
    showToast("Assigned staff members updated successfully.");
  };

  const handleRemoveUser = (user: StaffUserItem) => {
    if (isSuperAdmin && assignedStaff.length <= 1) {
      showToast("Cannot remove the last remaining Super Admin user.");
      return;
    }

    setStaffUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, roleId: "role_staff", roleName: "Staff / Moderator" } : u
      )
    );
    setRole((prev) => ({ ...prev, usersCount: Math.max(0, prev.usersCount - 1) }));
    showToast(`Removed "${user.name}" from role "${role.name}".`);
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/roles"
            className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900 font-display">
                {role.name}
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Role Profile & Permission Matrix Scope • Role ID: <span className="font-mono">{role.id}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              disabled={isSuperAdmin}
              onClick={() => {
                if (isSuperAdmin) {
                  showToast("Super Admin permissions cannot be modified.");
                } else {
                  setIsEditing(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Permissions</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View Overview</span>
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        /* Edit Mode Form */
        <RoleForm
          initialRole={role}
          onSubmit={handleSaveRoleForm}
          onCancel={() => setIsEditing(false)}
          isEditMode={true}
        />
      ) : (
        /* View Mode Overview */
        <div className="space-y-6">
          {/* Role Header Info */}
          <RoleDetails role={role} />

          {/* Assigned Staff Users */}
          <AssignedUsers
            users={assignedStaff}
            onOpenAssignDialog={() => setAssignDialogOpen(true)}
            onRemoveUser={handleRemoveUser}
            isSuperAdmin={isSuperAdmin}
          />

          {/* Permissions Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 font-display">Active Permission Scopes</h2>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                {role.permissions.length} Granted Permissions
              </span>
            </div>

            <div className="space-y-4">
              {ALL_PERMISSION_GROUPS.map((group) => (
                <PermissionGroup
                  key={group.id}
                  group={group}
                  selectedPermissionIds={role.permissions}
                  onTogglePermission={() => {}}
                  onSelectAllGroup={() => {}}
                  onClearAllGroup={() => {}}
                  disabled={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assign Users Modal */}
      <AssignUserDialog
        isOpen={assignDialogOpen}
        roleName={role.name}
        allStaffUsers={staffUsers}
        currentAssignedUserIds={assignedStaff.map((u) => u.id)}
        onSaveAssignments={handleSaveAssignments}
        onClose={() => setAssignDialogOpen(false)}
      />
    </div>
  );
}
