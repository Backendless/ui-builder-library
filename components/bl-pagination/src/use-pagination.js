import { useMemo } from 'react';

export const DOTS = '...';

export const usePagination = (pageCount, currentPage, siblingCount) => {
  if (pageCount <= 0) {
    throw new Error('The page count must be greater than 0');
  }

  const paginationRange = useMemo(() => {
    if (siblingCount < 0) {
      throw new Error('The sibling count cannot be less than 0');
    }

    const countMainElements = 5;
    const totalPageNumbers = siblingCount + countMainElements;

    if (totalPageNumbers >= pageCount) {
      return range(1, pageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

    const startSiblingIndex = 2;

    const shouldShowLeftDots = leftSiblingIndex > startSiblingIndex;
    const shouldShowRightDots = rightSiblingIndex < pageCount - startSiblingIndex;

    const firstPageIndex = 1;
    const lastPageIndex = pageCount;
    const countMainPages = 3;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = countMainPages + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, pageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = countMainPages + 2 * siblingCount;
      const rightRange = range(pageCount - rightItemCount + 1, pageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [pageCount, siblingCount, currentPage]);

  return paginationRange;
};

const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};
