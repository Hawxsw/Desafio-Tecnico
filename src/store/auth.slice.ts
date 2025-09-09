import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginSchema, type LoginType } from "../schemas/user.schema";
import { api } from "../services/api";

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  token: null,
};

export const login = createAsyncThunk<
  { token: string },
  LoginType,
  {
    rejectValue: string;
  }
>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      LoginSchema.parse(payload);

      const response = await api.auth.login(payload);

      const data = response.data ?? response;

      if (!data.token) {
        throw new Error("Token não fornecido pela API");
      }

      return { token: data.token };
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Erro ao fazer login";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.token = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.success = false;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.loading = false;
          state.error = null;
          state.success = true;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro inesperado";
        state.success = false;
        state.token = null;
      });
  },
});

export const { resetAuthState, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
