import { create } from 'zustand';
import { LoginSchema, LoginType } from "@/lib/user/user.schema";
import { api } from "@/services/api";

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;
  login: (payload: LoginType) => Promise<void>;
  resetAuthState: () => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  success: false,
  token: typeof window !== 'undefined' ? localStorage.getItem("token") : null,
  login: async (payload: LoginType) => {
    set({ loading: true, error: null, success: false });
    try {
      LoginSchema.parse(payload);
      const response = await api.auth.login(payload);
      const data = response.data ?? response;
      if (!data.token) {
        throw new Error("Token não fornecido pela API");
      }
      set({ loading: false, success: true, token: data.token });
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Erro ao fazer login";
      set({ loading: false, error: message, success: false, token: null });
    }
  },
  resetAuthState: () => {
    set({ loading: false, error: null, success: false, token: null });
  },
  setToken: (token: string) => {
    set({ token });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ token: null, success: false, error: null, loading: false });
    localStorage.removeItem("token");
  },
}));
