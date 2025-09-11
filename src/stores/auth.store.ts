import { create } from 'zustand';
import { LoginSchema, LoginType } from "@/lib/user/user.schema";
import { api } from "@/services/api";

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  initialized: boolean;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginType) => Promise<void>;
  resetAuthState: () => void;
  setToken: (token: string) => void;
  markInitialized: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  success: false,
  initialized: false,
  token: null,
  isAuthenticated: false,
  login: async (payload: LoginType) => {
    set({ loading: true, error: null, success: false });
    try {
      LoginSchema.parse(payload);
      const response = await api.auth.login(payload);
      const data = response.data ?? response;
      if (!data.token) {
        throw new Error("Token não fornecido pela API");
      }
      set({ loading: false, success: true, token: data.token, isAuthenticated: true });
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Erro ao fazer login";
      set({ loading: false, error: message, success: false, token: null, isAuthenticated: false });
    }
  },
  resetAuthState: () => {
    set({ loading: false, error: null, success: false, token: null, isAuthenticated: false });
  },
  setToken: (token: string) => {
    set({ token, isAuthenticated: Boolean(token) });
    localStorage.setItem("token", token);
  },
  markInitialized: () => {
    set({ initialized: true });
  },
  logout: () => {
    set({ token: null, success: false, error: null, loading: false, isAuthenticated: false });
    localStorage.removeItem("token");
  },
}));
