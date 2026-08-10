const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  retryCount?: number;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Token storage helpers
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
};

export const setAccessToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", token);
};

export const removeAccessToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

async function refreshAuthToken(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      removeAccessToken();
      return null;
    }

    const data = await response.json();
    const newToken = data.data?.accessToken || data.accessToken;
    if (newToken) {
      setAccessToken(newToken);
      return newToken;
    }
    return null;
  } catch {
    removeAccessToken();
    return null;
  }
}

export async function request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers = {}, retryCount = 0, ...customConfig } = options;

  let url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const token = getAccessToken();
  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: "GET",
    headers: reqHeaders,
    credentials: "include",
    ...customConfig,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401 && !endpoint.includes("/auth/login") && !endpoint.includes("/auth/refresh")) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          reqHeaders["Authorization"] = `Bearer ${newToken}`;
          return request<T>(endpoint, { ...options, headers: reqHeaders });
        });
      }

      isRefreshing = true;

      const newToken = await refreshAuthToken();
      if (newToken) {
        isRefreshing = false;
        processQueue(null, newToken);
        reqHeaders["Authorization"] = `Bearer ${newToken}`;
        return request<T>(endpoint, { ...options, headers: reqHeaders });
      } else {
        isRefreshing = false;
        processQueue(new ApiError("Session expired. Please log in again.", 401), null);
        throw new ApiError("Session expired. Please log in again.", 401);
      }
    }

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const message = typeof data === "object" && data?.message ? data.message : `HTTP Error ${response.status}`;
      throw new ApiError(message, response.status, data);
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Retry handling for transient network errors (max 2 retries)
    if (retryCount < 2 && (error.name === "TypeError" || error.message?.includes("fetch"))) {
      await new Promise((res) => setTimeout(res, 500 * (retryCount + 1)));
      return request<T>(endpoint, { ...options, retryCount: retryCount + 1 });
    }

    throw new ApiError(error.message || "Network error. Please check your connection.", 0, error);
  }
}

export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PATCH", body: JSON.stringify(body) }),
  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
