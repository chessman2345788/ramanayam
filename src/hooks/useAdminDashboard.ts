import { useQuery } from "@tanstack/react-query";
import { AdminService, AdminDashboardData } from "@/services/admin.service";

export const adminKeys = {
  dashboard: ["admin", "dashboard"] as const,
};

export function useAdminDashboardQuery() {
  return useQuery<AdminDashboardData>({
    queryKey: adminKeys.dashboard,
    queryFn: () => AdminService.fetchDashboardFromApi(),
    refetchInterval: 30000, // Refetch every 30s to keep DB state live
  });
}
