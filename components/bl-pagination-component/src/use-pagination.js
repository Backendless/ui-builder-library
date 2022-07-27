import { useMemo } from 'react';

export const DOTS = '...';

export const usePagination = (countPages, currentPage, siblingCount) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= countPages) {
      return range(1, countPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, countPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < countPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = countPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, countPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(countPages - rightItemCount + 1, countPages);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [countPages, siblingCount, currentPage]);

  return paginationRange;
};

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};
