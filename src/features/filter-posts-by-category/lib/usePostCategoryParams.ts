import { useSearchParams } from 'react-router-dom';

const ALL_CATEGORY_ID = 'all';

export const usePostCategoryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeCategoryId = searchParams.get('category') ?? ALL_CATEGORY_ID;

    const handleCategoryChange = (categoryId: string) => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);

            if (categoryId === ALL_CATEGORY_ID) {
                nextParams.delete('category');
            } else {
                nextParams.set('category', categoryId);
            }

            nextParams.set('page', '1');

            return nextParams;
        });
    };

    return {
        activeCategoryId,
        handleCategoryChange,
    };
};