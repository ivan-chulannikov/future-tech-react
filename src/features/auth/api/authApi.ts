import { authApi } from '@/shared/api/baseApi';

type LoginRequest = {
    username: string;
    password: string;
};

type LoginResponse = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
};
type RegisterRequest = {
    email: string;
    username: string;
    password: string;
};

type RegisterResponse = {
    id: number;
    email: string;
    username: string;
    createdAt: string;
};
export const authApiRtk = authApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
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
