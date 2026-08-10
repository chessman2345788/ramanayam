import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

console.log("NEXT_PUBLIC_API_URL =", process.env.NEXT_PUBLIC_API_URL);
console.log("API_BASE_URL =", API_BASE_URL);

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Token storage helpers with Remember Me support
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || localStorage.getItem("token");
};

export const setAccessToken = (token: string, rememberMe = true): void => {
  if (typeof window === "undefined") return;
  if (rememberMe) {
    localStorage.setItem("accessToken", token);
    sessionStorage.removeItem("accessToken");
  } else {
    sessionStorage.setItem("accessToken", token);
    localStorage.removeItem("accessToken");
  }
};

export const removeAccessToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
  sessionStorage.removeItem("accessToken");
};

// Request interceptor to attach Bearer token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor with automatic token refresh on 401
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

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          refreshResponse.data?.data?.accessToken || refreshResponse.data?.accessToken;

        if (newAccessToken) {
          const wasRemembered = Boolean(localStorage.getItem("accessToken"));
          setAccessToken(newAccessToken, wasRemembered);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          processQueue(null, newAccessToken);
          return axiosClient(originalRequest);
        } else {
          throw new Error("No access token returned on refresh.");
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        removeAccessToken();

        if (typeof window !== "undefined" && !window.location.pathname.includes("/admin/login")) {
          window.location.href = "/admin/login?sessionExpired=true";
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    const message = error.response?.data?.message || error.message || "An unexpected API error occurred.";
    return Promise.reject(new Error(message));
  }
);
