import { useSearchParams } from 'react-router-dom';

import { getValidPage } from './getValidPage';

export const usePaginationParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = searchParams.get('page');
    const currentPage = getValidPage(pageParam);

    const handlePageChange = (page: number) => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);

            nextParams.set('page', String(page));

            return nextParams;
        });
    };

    return {
        currentPage,
        handlePageChange,
    };
};
