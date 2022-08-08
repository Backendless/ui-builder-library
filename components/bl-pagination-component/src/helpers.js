const { cn } = BackendlessUI.CSSUtils;

export const useControlButtonClasses = (isDisabled, variant, paginationSize) => {
  return cn('pagination__control-button', variant, {
    'pagination__control-button--disabled': isDisabled,
    [`${ variant }--${ paginationSize }`] : paginationSize
  });
};

export const usePageListClasses = (currentPage, page, variant, paginationSize) => {
  return cn('pagination__page-button', variant, {
    [`${ variant }--selected`]           : currentPage === page,
    [`${ variant }--${ paginationSize }`]: paginationSize
  });
};
