import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, AuthResponse } from './types';

const initialState: AuthState = {
    user: null,
    accessToken: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },

        logout: () => initialState,
    },
});
export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
