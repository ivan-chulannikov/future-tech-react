const API_URL = 'http://localhost:3000';
const AUTH_API_URL = 'http://localhost:4000';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: () => ({}),
});
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_API_URL,
    }),
    endpoints: () => ({}),
});
