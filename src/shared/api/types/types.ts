export type PaginatedResponse<T> = {
    data: T[];
    page: number;
    limit: number;
    total: number;
    pages: number;
};
export type BaseApiState = {
    auth: {
        accessToken: string | null;
    };
};
