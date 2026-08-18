import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockSummaryKPIs, mockTimeSeriesData, mockFestivals } from "@/data/mockAnalyticsData";

export class AdminAnalyticsService {
  static async getAnalyticsSummary(timeRange = "30days") {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/stats", { range: timeRange });
        return res.data;
      },
      {
        kpis: mockSummaryKPIs,
        timeSeries: mockTimeSeriesData.monthly,
        festivals: mockFestivals,
      },
      "Admin Analytics Summary"
    );
  }

  static async getPaymentAnalytics() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/payments");
        return res.data;
      },
      [],
      "Admin Payment Monitoring"
    );
  }
}
