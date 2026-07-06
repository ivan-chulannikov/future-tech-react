import { baseApi } from '@/shared/api/baseApi';
import type { AuthResponse } from '../model/types';

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = AuthResponse;
type RegisterRequest = {
    email: string;
    username: string;
    password: string;
    description?: string;
};

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
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiRtk;
