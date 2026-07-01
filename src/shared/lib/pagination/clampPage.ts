export const clampPage = (page: number, totalPages: number): number => {
  const lastPage = Math.max(totalPages, 1);

  if (page > lastPage) {
    return lastPage;
  }

  return page;
};