import { DOTS } from './use-pagination';
import { useControlButtonClass, usePageButtonListClass, useDotsClasses } from './helpers';
import { FirstPageButtonSvg, LastPageButtonSvg, NextArrowSvg, BackArrowSvg } from './buttons-svg';

export function BackButton(props) {
  const { onGoBack, isPrevButton, currentPage, paginationSize, variant } = props;
  const isDisabled = currentPage === 1;

  const classes = useControlButtonClass(isDisabled, variant, paginationSize);

  if (!isPrevButton) {
    return null;
  }

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoBack }
    >
      <BackArrowSvg size={ paginationSize }/>
    </button>
  );
}

export function NextButton(props) {
  const { onGoNext, isNextButton, currentPage, lastPage, paginationSize, variant } = props;
  const isDisabled = currentPage === lastPage;

  const classes = useControlButtonClass(isDisabled, variant, paginationSize);

  if (!isNextButton) {
    return null;
  }

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoNext }
    >
      <NextArrowSvg size={ paginationSize }/>
    </button>
  );
}

export function FirstPageButton(props) {
  const { isFirstPageButton, onGoFirst, currentPage, paginationSize, variant } = props;
  const isDisabled = currentPage === 1;

  const classes = useControlButtonClass(isDisabled, variant, paginationSize);

  if (!isFirstPageButton) {
    return null;
  }

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoFirst }
    >
      <FirstPageButtonSvg size={ paginationSize }/>
    </button>
  );
}

export function LastPageButton(props) {
  const { isLastPageButton, onGoLast, currentPage, lastPage, paginationSize, variant } = props;
  const isDisabled = currentPage === lastPage;

  const classes = useControlButtonClass(isDisabled, variant, paginationSize);

  if (!isLastPageButton) {
    return null;
  }

  return (
    <button
      className={ classes }
      type="button"
      disabled={ isDisabled }
      onClick={ onGoLast }
    >
      <LastPageButtonSvg size={ paginationSize }/>
    </button>
  );
}

export function PageButtonList(props) {
  const { pages, currentPage, setCurrentPage, paginationSize, variant } = props;
  const dotsClasses = useDotsClasses(paginationSize);

  return (
    <ul className="pagination__button-list">
      { pages.map((page) => {
        if (page === DOTS) {
          return (
            <li>
              <div className={ dotsClasses }>{ DOTS }</div>
            </li>
          );
        }

        return (
          <li>
            <button
              type="button"
              className={ usePageButtonListClass(currentPage, page, variant, paginationSize) }
              onClick={ () => setCurrentPage(page) }
            >
              { page }
            </button>
          </li>
        );
      }) }
    </ul>
  );
}
