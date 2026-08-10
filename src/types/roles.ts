export type RoleStatus = "ACTIVE" | "DISABLED";
export type StaffStatus = "ACTIVE" | "INVITED";

export interface PermissionAction {
  key: string;
  label: string;
}

export interface PermissionModule {
  id: string;
  name: string;
  actions: PermissionAction[];
}

export interface AdminRoleDetail {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
  isSystemRole: boolean;
  status: RoleStatus;
  usersCount: number;
  permissionsCount: number;
  createdAt: string;
  permissions: Record<string, string[]>;
}

export interface StaffUserItem {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  status: StaffStatus;
  lastActive: string;
  avatar: string;
}
