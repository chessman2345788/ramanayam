import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockRolesList, mockStaffUsersList } from "@/data/mockRolesData";

export class AdminRolesService {
  static async getRoles() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/roles");
        return res.data;
      },
      mockRolesList,
      "Admin Roles List"
    );
  }

  static async getStaffUsers() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/users");
        return res.data;
      },
      mockStaffUsersList,
      "Admin Staff Users List"
    );
  }

  static async createRole(roleData: any) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.post("/admin/roles", roleData);
        return res.data;
      },
      { id: `role_${Date.now()}`, ...roleData },
      "Create Role"
    );
  }
}
