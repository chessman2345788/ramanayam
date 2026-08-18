"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiError } from "@/lib/api/apiError";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN" | "STAFF" | "VENDOR" | "CUSTOMER";
  avatar?: string;
  permissions?: string[];
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permissionId: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>({
    id: "adm_1",
    name: "Pandit Rajesh Sharma",
    email: "rajesh.admin@ramanayam.com",
    role: "SUPER_ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    permissions: ["*"],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function verifyAdminSession() {
      const token = localStorage.getItem("ramanayam_admin_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await ApiClient.get<AdminUser>("/auth/me");
        if (res.success && res.data) {
          setUser(res.data);
        }
      } catch (err) {
        console.warn("Admin session verification offline/unauthenticated:", ApiError.getFriendlyMessage(err));
      } finally {
        setIsLoading(false);
      }
    }

    verifyAdminSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.post<{ user: AdminUser; accessToken: string }>("/auth/login", {
        email,
        password,
      });

      if (res.data?.accessToken) {
        localStorage.setItem("ramanayam_admin_token", res.data.accessToken);
        setUser(res.data.user);
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await ApiClient.post("/auth/logout");
    } catch (err) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem("ramanayam_admin_token");
      setUser(null);
    }
  };

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false;
    if (user.role === "SUPER_ADMIN" || user.permissions?.includes("*")) return true;
    return user.permissions?.includes(permissionId) ?? false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
