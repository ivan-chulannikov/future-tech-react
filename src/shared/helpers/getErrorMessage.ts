import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
export const getErrorMessage = (error: unknown) => {
    if (!error) {
        return null;
    }

    const fetchError = error as FetchBaseQueryError;

    if (
        typeof fetchError.data === 'object' &&
        fetchError.data !== null &&
        'message' in fetchError.data
    ) {
        return String(fetchError.data.message);
    }

    return 'Something went wrong';
};
