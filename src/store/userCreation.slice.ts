import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserSchema, type CreateUserType } from "../schemas/user.schema";
import { api } from "../services/api";
import { AxiosError } from "axios";

interface UserCreationState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: UserCreationState = {
    loading: false,
    error: null,
    success: false,
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async (payload: CreateUserType, { rejectWithValue }) => {
        try {
            const response = await api.user.createUser(payload);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data?.message || error.message);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
)

const userCreationSlice = createSlice({
    name: 'userCreation',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null
            state.success = false;
        })
        builder.addCase(createUser.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = false;
        })
    }
})

export const { resetState } = userCreationSlice.actions;

export default userCreationSlice.reducer;