import { DOTS, usePagination } from './use-pagination';
import { useControlButtonClasses, usePageListClasses } from './helpers';
import { ArrowNextIcon, ArrowBackIcon, FirstPageIcon, LastPageIcon } from './buttons-svg';

const { cn } = BackendlessUI.CSSUtils;

export function BackButton(props) {
  const { onGoBack, currentPage, paginationSize, variant } = props;
  const isDisabled = currentPage === 1;

  const classes = useControlButtonClasses(isDisabled, variant, paginationSize);

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoBack }>
      <ArrowBackIcon size={ paginationSize }/>
    </button>
  );
}

export function NextButton(props) {
  const { onGoNext, currentPage, lastPage, paginationSize, variant } = props;
  const isDisabled = currentPage === lastPage;

  const classes = useControlButtonClasses(isDisabled, variant, paginationSize);

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoNext }>
      <ArrowNextIcon size={ paginationSize }/>
    </button>
  );
}

export function FirstPageButton(props) {
  const { onGoFirst, currentPage, paginationSize, variant } = props;
  const isDisabled = currentPage === 1;

  const classes = useControlButtonClasses(isDisabled, variant, paginationSize);

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoFirst }>
      <FirstPageIcon size={ paginationSize }/>
    </button>
  );
}

export function LastPageButton(props) {
  const { onGoLast, currentPage, lastPage, paginationSize, variant } = props;
  const isDisabled = currentPage === lastPage;

  const classes = useControlButtonClasses(isDisabled, variant, paginationSize);

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoLast }>
      <LastPageIcon size={ paginationSize }/>
    </button>
  );
}

export function PageList(props) {
  const { pageCount, siblingCount, currentPage, setCurrentPage, paginationSize, variant } = props;
  const pages = usePagination(pageCount, currentPage, siblingCount);

  return (
    <ul className="pagination__button-list">
      { pages.map((page) => {
        const classes = usePageListClasses(currentPage, page, variant, paginationSize);

        if (page === DOTS) {
          return (
            <li>
              <div className={ cn('pagination__dots', { [`pagination__dots--${ paginationSize }`]: paginationSize }) }>
                { DOTS }
              </div>
            </li>
          );
        }

        return (
          <li>
            <button
              type="button"
              className={ classes }
              onClick={ () => setCurrentPage(page) }>
              { page }
            </button>
          </li>
        );
      }) }
    </ul>
  );
}
