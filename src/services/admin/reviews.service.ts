import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { mockReviewsList } from "@/data/mockReviewsData";
import { QueryParams } from "@/types/api";

export class AdminReviewsService {
  static async getReviews(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/reviews", params);
        return res.data;
      },
      mockReviewsList,
      "Admin Reviews List"
    );
  }

  static async updateReviewStatus(id: string, status: "APPROVED" | "PENDING" | "HIDDEN" | "REJECTED") {
    const res = await ApiClient.patch(`/admin/reviews/${id}`, { status });
    return res.data;
  }

  static async deleteReview(id: string) {
    const res = await ApiClient.delete(`/admin/reviews/${id}`);
    return res.data;
  }
}
