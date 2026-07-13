import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { clampPage } from './clampPage';

export const useNormalizePaginationPage = (
    currentPage: number,
    totalPagesFromResponse?: number,
) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = searchParams.get('page');

    useEffect(() => {
        if (totalPagesFromResponse === undefined) {
            return;
        }

        const normalizedPage = clampPage(currentPage, totalPagesFromResponse);

        if (pageParam !== String(normalizedPage)) {
            setSearchParams(
                (prevParams) => {
                    const nextParams = new URLSearchParams(prevParams);

                    nextParams.set('page', String(normalizedPage));

                    return nextParams;
                },
                { replace: true },
            );
        }
    }, [currentPage, pageParam, totalPagesFromResponse, setSearchParams]);
};
