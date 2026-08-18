import { ApiResponse, QueryParams } from "@/types/api";
import { ApiError } from "./apiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const DEFAULT_TIMEOUT = 15000; // 15 seconds

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  params?: QueryParams;
  authToken?: string;
}

export class ApiClient {
  private static getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("ramanayam_admin_token");
  }

  private static buildQueryString(params?: QueryParams): string {
    if (!params) return "";
    const cleanParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        cleanParams[key] = String(val);
      }
    });
    const searchParams = new URLSearchParams(cleanParams);
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  static async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = "GET",
      body,
      headers = {},
      params,
      timeoutMs = DEFAULT_TIMEOUT,
      authToken,
      ...customConfig
    } = options;

    const token = authToken || this.getAuthToken();
    const queryString = this.buildQueryString(params);
    const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}${queryString}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    };

    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
        signal: controller.signal,
        credentials: "include",
        ...customConfig,
      });

      clearTimeout(timeoutId);

      let responseData: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      }

      if (!response.ok) {
        const errorMsg = responseData?.message || `Request failed with status ${response.status}`;
        const validationErrors = responseData?.errors;

        if (response.status === 401 && typeof window !== "undefined") {
          localStorage.removeItem("ramanayam_admin_token");
        }

        throw new ApiError(errorMsg, response.status, validationErrors);
      }

      return responseData as ApiResponse<T>;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err instanceof ApiError) throw err;
      if (err.name === "AbortError") {
        throw new ApiError("Request timed out.", 408);
      }
      throw new ApiError(err.message || "Failed to communicate with API server", 500);
    }
  }

  static async get<T = any>(endpoint: string, params?: QueryParams, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET", params });
  }

  static async post<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "POST", body: data });
  }

  static async put<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body: data });
  }

  static async patch<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "PATCH", body: data });
  }

  static async delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}
