import { ApiClient } from "./apiClient";
import { QueryParams } from "@/types/api";

export async function fetchWithMockFallback<T>(
  apiCall: () => Promise<T>,
  fallbackMockData: T,
  serviceName: string
): Promise<{ data: T; isFallback: boolean; error?: string }> {
  try {
    const result = await apiCall();
    return { data: result, isFallback: false };
  } catch (err: any) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[API Integration Warning] ${serviceName} backend call failed. Utilizing mock fallback.`, err.message);
    }
    return {
      data: fallbackMockData,
      isFallback: true,
      error: err.message || "Failed to reach backend API.",
    };
  }
}
