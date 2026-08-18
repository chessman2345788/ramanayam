import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockSummaryKPIs, mockTimeSeriesData } from "@/data/mockAnalyticsData";

export interface AdminDashboardData {
  summaryKpis: any[];
  timeSeriesData: any;
  topProducts: any[];
  recentOrders: any[];
}

export class AdminDashboardService {
  static async getDashboardMetrics() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/dashboard");
        return res.data;
      },
      {
        summaryKpis: mockSummaryKPIs,
        timeSeriesData: mockTimeSeriesData.monthly,
        topProducts: [],
        recentOrders: [],
      },
      "Admin Dashboard Metrics"
    );
  }

  static async getAdminStats() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/stats");
        return res.data;
      },
      {
        totalRevenue: 3480200,
        totalOrders: 1842,
        totalCustomers: 2100,
        avgOrderValue: 2450,
      },
      "Admin Stats Overview"
    );
  }
}
