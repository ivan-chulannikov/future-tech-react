import { baseApi } from '@/shared/api/baseApi';
import type { AuthResponse } from '../model/types';

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = AuthResponse;

type RegisterResponse = AuthResponse;
export const authApiRtk = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        register: builder.mutation<RegisterResponse, FormData>({
            query: (formData) => ({
                url: '/register',
                method: 'POST',
                body: formData,
            }),
        }),
        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'POST',
            }),
        }),
        logoutRequest: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogoutRequestMutation,
} = authApiRtk;
