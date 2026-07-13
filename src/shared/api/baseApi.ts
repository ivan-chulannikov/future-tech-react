import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { AuthResponse } from '@/features/auth/model/types';
import type { RootState } from '@/app/store/store';
import { logout, setCredentials } from '@/features/auth/model/authSlice';

const API_URL = 'http://localhost:4000';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshResult = await rawBaseQuery(
            {
                url: 'refresh',
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const response = refreshResult.data as AuthResponse;

            api.dispatch(setCredentials(response));

            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
            api.dispatch(baseApi.util.resetApiState());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Posts', 'SavedPosts', 'Comments'],
    endpoints: () => ({}),
});
