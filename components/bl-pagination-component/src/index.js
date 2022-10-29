import { useEffect, useState } from 'react';
import { BackButton, NextButton, FirstPageButton, LastPageButton, PageList } from './buttons';

const { cn } = BackendlessUI.CSSUtils;

export default function Pagination({ component, eventHandlers }) {
  const {
    display,
    classList,
    pageCount,
    siblingCount,
    isNextButtonVisible,
    isPrevButtonVisible,
    isFirstPageButtonVisible,
    isLastPageButtonVisible,
    size,
    variant,
  } = component;
  const { onPageChange, onGoNext, onGoBack, onGoFirst, onGoLast } = eventHandlers;

  const [currentPage, setCurrentPage] = useState(1);

  component.goNextPage = () => {
    if (currentPage !== pageCount) {
      setCurrentPage(state => state + 1);
    }
  };

  component.goPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(state => state - 1);
    }
  };

  component.goFirstPage = () => {
    setCurrentPage(1);
  };

  component.goLastPage = () => {
    setCurrentPage(pageCount);
  };

  useEffect(() => {
    if (siblingCount < 0) {
      throw new Error('The sibling count cannot be less than 0');
    }
  }, [siblingCount]);

  useEffect(() => {
    onPageChange({ currentPage });
  }, [currentPage]);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-pagination', classList) }>
      <div className="pagination">

        { isFirstPageButtonVisible && (
          <FirstPageButton
            onGoFirst={ onGoFirst }
            currentPage={ currentPage }
            paginationSize={ size }
            variant={ variant }
          />
        )}

        { isPrevButtonVisible && (
          <BackButton
            onGoBack={ onGoBack }
            currentPage={ currentPage }
            paginationSize={ size }
            variant={ variant }
          />
        )}

        <PageList
          pageCount={ pageCount }
          currentPage={ currentPage }
          siblingCount={ siblingCount }
          setCurrentPage={ setCurrentPage }
          paginationSize={ size }
          variant={ variant }
        />

        { isNextButtonVisible && (
          <NextButton
            onGoNext={ onGoNext }
            currentPage={ currentPage }
            lastPage={ pageCount }
            paginationSize={ size }
            variant={ variant }
          />
        )}

        { isLastPageButtonVisible && (
          <LastPageButton
            onGoLast={ onGoLast }
            currentPage={ currentPage }
            lastPage={ pageCount }
            paginationSize={ size }
            variant={ variant }
          />
        )}
      </div>
    </div>
  );
}
