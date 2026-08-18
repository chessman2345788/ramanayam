import { ApiClient } from "@/lib/api/apiClient";
import { fetchWithMockFallback } from "@/lib/api/withFallback";
import { QueryParams } from "@/types/api";

export class AdminProductsService {
  static async getProducts(params?: QueryParams) {
    return fetchWithMockFallback(
      async () => {
        const res = await ApiClient.get("/admin/products", params);
        return res.data;
      },
      [],
      "Admin Products List"
    );
  }

  static async updateProductStatus(id: string, isPublished: boolean) {
    const res = await ApiClient.patch(`/admin/products/${id}`, { isPublished });
    return res.data;
  }

  static async deleteProduct(id: string) {
    const res = await ApiClient.delete(`/admin/products/${id}`);
    return res.data;
  }

  static async createProduct(productData: any) {
    const res = await ApiClient.post("/products", productData);
    return res.data;
  }

  static async updateProduct(id: string, productData: any) {
    const res = await ApiClient.put(`/products/${id}`, productData);
    return res.data;
  }
}
