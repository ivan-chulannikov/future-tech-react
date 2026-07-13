export const getValidPage = (pageParam: string | null): number => {
    const page = Number(pageParam);
    const isValidPage = Number.isInteger(page) && page > 0;

    if (isValidPage) {
        return page;
    }

    return 1;
};
