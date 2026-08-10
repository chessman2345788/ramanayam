import { axiosClient, setAccessToken, removeAccessToken } from "@/lib/api-axios";

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string | null;
  role: string;
  accountStatus?: string;
  profileImage?: string | null;
  avatarUrl?: string | null;
  permissions?: string[] | Record<string, string[]>;
}

export interface AuthResponseData {
  user: UserProfile;
  accessToken: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const AuthService = {
  login: async (credentials: LoginPayload): Promise<UserProfile> => {
    const res = await axiosClient.post("/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    const data: AuthResponseData = res.data?.data || res.data;
    const user = data.user;
    const accessToken = data.accessToken;

    if (accessToken) {
      setAccessToken(accessToken, credentials.rememberMe ?? true);
    }

    return {
      ...user,
      name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
    };
  },

  register: async (payload: RegisterPayload): Promise<UserProfile> => {
    const res = await axiosClient.post("/auth/register", payload);
    const data: AuthResponseData = res.data?.data || res.data;
    const user = data.user;
    const accessToken = data.accessToken;

    if (accessToken) {
      setAccessToken(accessToken, true);
    }

    return {
      ...user,
      name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
    };
  },

  logout: async (): Promise<void> => {
    try {
      await axiosClient.post("/auth/logout");
    } catch {
      // Ignore logout API errors
    } finally {
      removeAccessToken();
    }
  },

  getCurrentUser: async (): Promise<UserProfile> => {
    const res = await axiosClient.get("/auth/me");
    const user = res.data?.data?.user || res.data?.user || res.data;
    return {
      ...user,
      name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
    };
  },

  forgotPassword: async (email: string): Promise<string> => {
    const res = await axiosClient.post("/auth/forgot-password", { email });
    return res.data?.message || res.data || "Password reset instructions sent.";
  },

  resetPassword: async (token: string, newPassword: string): Promise<string> => {
    const res = await axiosClient.post("/auth/reset-password", { token, newPassword });
    return res.data?.message || res.data || "Password reset successfully.";
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<string> => {
    const res = await axiosClient.post("/auth/change-password", { oldPassword, newPassword });
    return res.data?.message || res.data || "Password changed successfully.";
  },
};
