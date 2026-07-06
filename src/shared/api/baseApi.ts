import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:4000';

type BaseApiState = {
    auth: {
        accessToken: string | null;
    };
};

export const baseApi = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        credentials: 'include',

        prepareHeaders: (headers, { getState }) => {
            const state = getState() as BaseApiState;

            const { accessToken } = state.auth;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            return headers;
        },
    }),

    tagTypes: ['SavedPosts'],

    endpoints: () => ({}),
});