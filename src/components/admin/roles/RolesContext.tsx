"use client";

import React, { createContext, useContext, useState } from "react";
import { AdminRoleDetail, StaffUserItem } from "@/types/roles";
import { mockRolesList, mockStaffUsers } from "@/data/mockRolesData";

interface RolesContextType {
  roles: AdminRoleDetail[];
  staff: StaffUserItem[];
  addRole: (role: Omit<AdminRoleDetail, "id" | "createdAt" | "usersCount" | "permissionsCount">) => AdminRoleDetail;
  updateRole: (id: string, roleData: Partial<AdminRoleDetail>) => void;
  deleteRole: (id: string) => boolean;
  duplicateRole: (id: string) => AdminRoleDetail | null;
  inviteStaff: (email: string, roleId: string) => void;
  assignUserRole: (userId: string, roleId: string) => void;
  exportRolesData: () => void;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export function RolesProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<AdminRoleDetail[]>(mockRolesList);
  const [staff, setStaff] = useState<StaffUserItem[]>(mockStaffUsers);

  const calculatePermsCount = (perms: Record<string, string[]>) =>
    Object.values(perms).reduce((acc, arr) => acc + arr.length, 0);

  const addRole = (roleData: Omit<AdminRoleDetail, "id" | "createdAt" | "usersCount" | "permissionsCount">) => {
    const newId = `role_custom_${Date.now().toString(36)}`;
    const permsCount = calculatePermsCount(roleData.permissions);
    const newRole: AdminRoleDetail = {
      ...roleData,
      id: newId,
      createdAt: new Date().toISOString().split("T")[0],
      usersCount: 0,
      permissionsCount: permsCount,
    };
    setRoles((prev) => [newRole, ...prev]);
    return newRole;
  };

  const updateRole = (id: string, roleData: Partial<AdminRoleDetail>) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id !== id) return role;
        const updatedPerms = roleData.permissions ?? role.permissions;
        const permsCount = calculatePermsCount(updatedPerms);
        return {
          ...role,
          ...roleData,
          permissions: updatedPerms,
          permissionsCount: permsCount,
        };
      })
    );
  };

  const deleteRole = (id: string) => {
    const target = roles.find((r) => r.id === id);
    if (!target || target.isSystemRole) return false;
    setRoles((prev) => prev.filter((r) => r.id !== id));
    return true;
  };

  const duplicateRole = (id: string) => {
    const target = roles.find((r) => r.id === id);
    if (!target) return null;
    return addRole({
      name: `${target.name} (Copy)`,
      description: `Duplicated from ${target.name}`,
      color: target.color,
      iconName: target.iconName,
      isSystemRole: false,
      status: "ACTIVE",
      permissions: JSON.parse(JSON.stringify(target.permissions)),
    });
  };

  const inviteStaff = (email: string, roleId: string) => {
    const targetRole = roles.find((r) => r.id === roleId);
    const newStaff: StaffUserItem = {
      id: `usr_${Date.now().toString(36)}`,
      name: email.split("@")[0].replace(".", " "),
      email,
      roleId,
      roleName: targetRole ? targetRole.name : "Custom Role",
      status: "INVITED",
      lastActive: "Pending",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
    };
    setStaff((prev) => [...prev, newStaff]);
    if (targetRole) {
      updateRole(roleId, { usersCount: targetRole.usersCount + 1 });
    }
  };

  const assignUserRole = (userId: string, roleId: string) => {
    const targetRole = roles.find((r) => r.id === roleId);
    if (!targetRole) return;
    setStaff((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        return { ...u, roleId, roleName: targetRole.name };
      })
    );
    // Recalculate users count
    setRoles((prev) =>
      prev.map((r) => {
        const count = staff.filter((s) => (s.id === userId ? roleId === r.id : s.roleId === r.id)).length;
        return { ...r, usersCount: count };
      })
    );
  };

  const exportRolesData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ roles, staff }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ramanayam_rbac_roles_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <RolesContext.Provider
      value={{
        roles,
        staff,
        addRole,
        updateRole,
        deleteRole,
        duplicateRole,
        inviteStaff,
        assignUserRole,
        exportRolesData,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(RolesContext);
  if (!context) throw new Error("useRoles must be used within a RolesProvider");
  return context;
}
