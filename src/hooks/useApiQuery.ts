"use client";

import { useState, useEffect, useCallback } from "react";
import { ApiError } from "@/lib/api/apiError";

export type ApiStatus = "idle" | "loading" | "success" | "empty" | "error";

export interface UseApiQueryResult<T> {
  data: T | null;
  status: ApiStatus;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isFallback: boolean;
}

export function useApiQuery<T>(
  queryFn: () => Promise<{ data: T; isFallback?: boolean; error?: string } | T>,
  deps: any[] = []
): UseApiQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const executeFetch = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const result: any = await queryFn();

      if (result && typeof result === "object" && "data" in result && "isFallback" in result) {
        const payload = result.data;
        setData(payload);
        setIsFallback(result.isFallback ?? false);

        if (!payload || (Array.isArray(payload) && payload.length === 0)) {
          setStatus("empty");
        } else {
          setStatus("success");
        }
      } else {
        setData(result);
        setIsFallback(false);
        if (!result || (Array.isArray(result) && result.length === 0)) {
          setStatus("empty");
        } else {
          setStatus("success");
        }
      }
    } catch (err) {
      const msg = ApiError.getFriendlyMessage(err);
      setError(msg);
      setStatus("error");
    }
  }, deps);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return {
    data,
    status,
    isLoading: status === "loading",
    isError: status === "error",
    isEmpty: status === "empty",
    error,
    refetch: executeFetch,
    isFallback,
  };
}
