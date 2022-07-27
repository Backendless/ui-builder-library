import { useEffect, useState } from 'react';
import { usePagination } from './use-pagination';
import { usePaginationClasses, paginationStyle } from './helpers';
import { BackButton, NextButton, FirstPageButton, LastPageButton, PageButtonList } from './subcomponents';

export default function Pagination({ component, eventHandlers }) {
  const {
    display,
    classList,
    countPages,
    siblingCount,
    isNextButton,
    isPrevButton,
    isFirstPageButton,
    isLastPageButton,
    size,
    variant,
  } = component;
  const { onCurrentPageChange, onGoNext, onGoBack, onGoFirst, onGoLast } = eventHandlers;

  const [currentPage, setCurrentPage] = useState(1);

  const pages = usePagination(countPages, currentPage, siblingCount);
  const paginationClasses = usePaginationClasses(classList);

  component.goNextPage = () => {
    if (currentPage !== countPages) {
      setCurrentPage(state => state + 1);
    }
  };

  component.goPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(state => state - 1);
    }
  };

  component.goFirstPage = () => {
    setCurrentPage(pages[0]);
  };

  component.goLastPage = () => {
    setCurrentPage(pages[pages.length - 1]);
  };

  useEffect(() => {
    onCurrentPageChange({ currentPage });
  }, [currentPage]);

  if (!display) {
    return null;
  }

  return (
    <div className={ paginationClasses }>
      <div className="pagination">
        <FirstPageButton
          isFirstPageButton={ isFirstPageButton }
          onGoFirst={ onGoFirst }
          currentPage={ currentPage }
          paginationSize={ size }
          variant={ paginationStyle[variant] }
        />

        <BackButton
          onGoBack={ onGoBack }
          isPrevButton={ isPrevButton }
          currentPage={ currentPage }
          paginationSize={ size }
          variant={ paginationStyle[variant] }
        />

        <PageButtonList
          pages={ pages }
          currentPage={ currentPage }
          setCurrentPage={ setCurrentPage }
          paginationSize={ size }
          variant={ paginationStyle[variant] }
        />

        <NextButton
          onGoNext={ onGoNext }
          isNextButton={ isNextButton }
          currentPage={ currentPage }
          lastPage={ countPages }
          paginationSize={ size }
          variant={ paginationStyle[variant] }
        />

        <LastPageButton
          isLastPageButton={ isLastPageButton }
          onGoLast={ onGoLast }
          currentPage={ currentPage }
          lastPage={ countPages }
          paginationSize={ size }
          variant={ paginationStyle[variant] }
        />
      </div>
    </div>
  );
}
