import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService, UserProfile, LoginPayload, RegisterPayload } from "@/services/auth.service";
import { getAccessToken, removeAccessToken } from "@/lib/api-axios";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginPayload) => Promise<UserProfile>;
  register: (payload: RegisterPayload) => Promise<UserProfile>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  hasPermission: (module: string, action?: string) => boolean;
  hasRole: (roles: string | string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (credentials: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const user = await AuthService.login(credentials);
          set({ user, isAuthenticated: true, isLoading: false, error: null });
          return user;
        } catch (err: any) {
          set({ isLoading: false, error: err.message || "Failed to log in" });
          throw err;
        }
      },

      register: async (payload: RegisterPayload) => {
        set({ isLoading: true, error: null });
        try {
          const user = await AuthService.register(payload);
          set({ user, isAuthenticated: true, isLoading: false, error: null });
          return user;
        } catch (err: any) {
          set({ isLoading: false, error: err.message || "Failed to register" });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await AuthService.logout();
        } finally {
          removeAccessToken();
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },

      checkAuth: async () => {
        const token = getAccessToken();
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        try {
          const user = await AuthService.getCurrentUser();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          removeAccessToken();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),

      hasRole: (roles: string | string[]) => {
        const currentUser = get().user;
        if (!currentUser) return false;
        const roleArray = Array.isArray(roles) ? roles : [roles];
        return roleArray.includes(currentUser.role);
      },

      hasPermission: (moduleName: string, actionName?: string) => {
        const currentUser = get().user;
        if (!currentUser) return false;

        // Admin has full permissions
        if (currentUser.role === "ADMIN") return true;

        const perms = currentUser.permissions;
        if (!perms) return true; // Default allow if unconfigured

        if (Array.isArray(perms)) {
          const required = actionName ? `${moduleName}:${actionName}` : moduleName;
          return perms.includes(required) || perms.includes("*");
        } else if (typeof perms === "object") {
          const actions = perms[moduleName];
          if (!actions) return false;
          if (!actionName) return actions.length > 0;
          return actions.includes(actionName) || actions.includes("*");
        }

        return true;
      },
    }),
    {
      name: "ramanayam-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
