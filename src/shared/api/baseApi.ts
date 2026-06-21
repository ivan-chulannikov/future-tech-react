import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'http://localhost:3000';
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints:() => ({})
})