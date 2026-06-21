import type { PaginationProps } from './types/types';

const getPaginationItems = (currentPage: number, totalPages: number) => {
  const pages: Array<number | 'dots-left' | 'dots-right'> = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push('dots-left');
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push('dots-right');
  }

  pages.push(totalPages);

  return pages;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <nav className={`${className} pagination`} aria-label="Pagination">
      <button
        type="button"
        className="pagination__button pagination__button--control"
        disabled={isFirstPage}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      <ul className="pagination__list">
        {paginationItems.map((item) => {
          if (typeof item !== 'number') {
            return (
              <li className="pagination__item" key={item}>
                <span className="pagination__dots">...</span>
              </li>
            );
          }

          const isActive = item === currentPage;

          return (
            <li className="pagination__item" key={item}>
              <button
                type="button"
                className={`pagination__button ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handlePageChange(item)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="pagination__button pagination__button--control"
        disabled={isLastPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};