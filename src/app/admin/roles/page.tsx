"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ShieldCheck, Plus, Loader2 } from "lucide-react";
import {
  RoleSummaryCards,
  PermissionSearch,
  RolesTable,
  ConfirmDialog,
  RoleConfirmActionType,
  AssignUserDialog,
  Pagination,
} from "@/components/admin/roles";
import {
  mockRolesList,
  AdminRoleDetail,
  StaffUserItem,
} from "@/data/mockRolesData";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminRolesListPage() {
  const [roles, setRoles] = useState<AdminRoleDetail[]>(mockRolesList);
  const [staffUsers, setStaffUsers] = useState<StaffUserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Dialog States
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    actionType: RoleConfirmActionType | null;
    role: AdminRoleDetail | null;
  }>({
    isOpen: false,
    actionType: null,
    role: null,
  });

  const [assignDialog, setAssignDialog] = useState<{
    isOpen: boolean;
    role: AdminRoleDetail | null;
  }>({
    isOpen: false,
    role: null,
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersResult = await AdminService.fetchUsersFromApi({ limit: 100 });
      if (usersResult.data && usersResult.data.length > 0) {
        const formattedUsers: StaffUserItem[] = usersResult.data.map((u: any) => ({
          id: u.id,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email,
          email: u.email,
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
          roleId: u.role === "ADMIN" ? "role_super_admin" : u.role === "VENDOR" ? "role_catalog" : "role_staff",
          roleName: u.role === "ADMIN" ? "Super Administrator" : u.role === "VENDOR" ? "Artisan & Vendor" : "Customer",
          status: u.accountStatus === "BLOCKED" ? "SUSPENDED" : "ACTIVE",
          joinedDate: new Date(u.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          lastActive: "Active Now",
        }));

        setStaffUsers(formattedUsers);

        // Update role counts from real users
        const adminCount = usersResult.data.filter((u: any) => u.role === "ADMIN").length;
        const vendorCount = usersResult.data.filter((u: any) => u.role === "VENDOR").length;

        setRoles((prev) =>
          prev.map((r) => {
            if (r.id === "role_super_admin") return { ...r, usersCount: adminCount };
            if (r.id === "role_catalog") return { ...r, usersCount: vendorCount };
            return r;
          })
        );
      }
    } catch (err: any) {
      console.error("Failed to load staff users from API:", err);
      showToast("Notice: Loaded offline role management state.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Search filtering
  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return roles;
    const q = searchQuery.toLowerCase();
    return roles.filter(
      (r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  }, [roles, searchQuery]);

  // Pagination
  const totalItems = filteredRoles.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedRoles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRoles.slice(start, start + pageSize);
  }, [filteredRoles, currentPage, pageSize]);

  // Action handlers
  const handleDuplicate = (role: AdminRoleDetail) => {
    const newRole: AdminRoleDetail = {
      ...role,
      id: `role_${Date.now()}`,
      name: `${role.name} (Copy)`,
      isSystemRole: false,
      usersCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setRoles((prev) => [...prev, newRole]);
    showToast(`Role "${newRole.name}" created successfully.`);
  };

  const handleDeleteTrigger = (role: AdminRoleDetail) => {
    if (role.isSystemRole || role.id === "role_super_admin") {
      showToast("System default roles cannot be deleted.");
      return;
    }
    setConfirmDialog({
      isOpen: true,
      actionType: "DELETE_ROLE",
      role,
    });
  };

  const handleConfirmAction = () => {
    if (!confirmDialog.role || !confirmDialog.actionType) return;

    if (confirmDialog.actionType === "DELETE_ROLE") {
      const deletedRole = confirmDialog.role;
      setRoles((prev) => prev.filter((r) => r.id !== deletedRole.id));
      showToast(`Role "${deletedRole.name}" has been deleted.`);
    }

    setConfirmDialog({ isOpen: false, actionType: null, role: null });
  };

  const handleSaveAssignments = async (selectedUserIds: string[]) => {
    if (!assignDialog.role) return;

    const role = assignDialog.role;
    const dbRole = role.id === "role_super_admin" ? "ADMIN" : role.id === "role_catalog" ? "VENDOR" : "CUSTOMER";

    try {
      // Update users in PostgreSQL
      for (const uId of selectedUserIds) {
        await AdminService.updateUserRoleFromApi(uId, dbRole);
      }

      showToast(`Staff role updated to ${dbRole} for selected users.`);
      setAssignDialog({ isOpen: false, role: null });
      await loadData();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to update user role.";
      showToast(`Error: ${errMsg}`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header & New Role CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-stone-900 font-display">
              Roles & Access Control (RBAC)
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage system security profiles, module permissions, and team access scopes.
            </p>
          </div>
        </div>

        <Link
          href="/admin/roles/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Role</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-stone-700">Loading roles and user permissions from database...</p>
        </div>
      ) : (
        <>
          {/* Summary KPI Cards */}
          <RoleSummaryCards roles={roles} staffUsers={staffUsers} />

          {/* Search Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <PermissionSearch value={searchQuery} onChange={(q) => { setSearchQuery(q); setCurrentPage(1); }} />
          </div>

          {/* Roles Data Table */}
          <RolesTable
            roles={paginatedRoles}
            staffUsers={staffUsers}
            onDuplicate={handleDuplicate}
            onDelete={handleDeleteTrigger}
            onAssignUsers={(role) => setAssignDialog({ isOpen: true, role })}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={(p) => setCurrentPage(p)}
            onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(1); }}
          />
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        actionType={confirmDialog.actionType}
        roleName={confirmDialog.role?.name || ""}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, actionType: null, role: null })}
      />

      {/* Assign Users Modal */}
      <AssignUserDialog
        isOpen={assignDialog.isOpen}
        roleName={assignDialog.role?.name || ""}
        allStaffUsers={staffUsers}
        currentAssignedUserIds={
          assignDialog.role
            ? staffUsers.filter((u) => u.roleId === assignDialog.role?.id).map((u) => u.id)
            : []
        }
        onSaveAssignments={handleSaveAssignments}
        onClose={() => setAssignDialog({ isOpen: false, role: null })}
      />
    </div>
  );
}
