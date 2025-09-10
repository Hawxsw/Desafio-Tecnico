import { create } from 'zustand';
import { AxiosError } from "axios";
import { CreateUserType } from "@/lib/user/user.schema";
import { api } from "@/services/api";

interface UserCreationState {
    loading: boolean;
    error: string | null;
    success: boolean;
    createUser: (payload: CreateUserType) => Promise<void>;
    resetState: () => void;
}

export const useUserStore = create<UserCreationState>((set) => ({
    loading: false,
    error: null,
    success: false,
    createUser: async (payload: CreateUserType) => {
        set({ loading: true, error: null, success: false });
        try {
            await api.user.createUser(payload);
            set({ loading: false, success: true });
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || error.message;
                set({ loading: false, error: errorMessage, success: false });
            } else {
                set({ loading: false, error: 'An unexpected error occurred', success: false });
            }
        }
    },
    resetState: () => {
        set({ loading: false, error: null, success: false });
    }
}));
