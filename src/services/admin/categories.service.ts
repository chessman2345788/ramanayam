import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { initialMockCategories } from "@/data/mockCategoryData";

export class AdminCategoriesService {
  static async getCategories() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/categories");
        return res.data;
      },
      initialMockCategories,
      "Admin Categories List"
    );
  }

  static async getCategoryTree() {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/categories/tree");
        return res.data;
      },
      [],
      "Admin Category Tree"
    );
  }

  static async createCategory(categoryData: any) {
    const res = await ApiClient.post("/categories", categoryData);
    return res.data;
  }

  static async updateCategory(id: string, categoryData: any) {
    const res = await ApiClient.patch(`/categories/${id}`, categoryData);
    return res.data;
  }

  static async deleteCategory(id: string) {
    const res = await ApiClient.delete(`/categories/${id}`);
    return res.data;
  }
}
