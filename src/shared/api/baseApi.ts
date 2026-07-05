const API_URL = 'http://localhost:4000';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store/store';
export const baseApi = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        credentials: 'include',

        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;

            const accessToken = state.auth.accessToken;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            return headers;
        },
    }),

    tagTypes: ['SavedPosts'],

    endpoints: () => ({}),
});
