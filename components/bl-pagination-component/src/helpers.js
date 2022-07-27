export const paginationStyle = {
  'normal'         : 'button',
  'outline'        : 'button-outline',
  'rounded'        : 'button-rounded',
  'rounded-outline': 'button-rounded-outline'
};

export const useControlButtonClass = (isDisabled, variant, paginationSize) => {
  const classes = ['pagination__control-button', variant];

  if (isDisabled) {
    classes.push('pagination__control-button--disabled');
  }

  if (paginationSize) {
    classes.push(`${ variant }--${ paginationSize }`);
  }

  return classes.join(' ');
};

export const useButtonSvgClass = (size) => {
  const classes = ['pagination__control-button-svg'];

  if (size) {
    classes.push(`pagination__control-button-svg--${ size }`);
  }

  return classes.join(' ');
};

export const usePageButtonListClass = (currentPage, page, variant, paginationSize) => {
  const classes = ['pagination__page-button', variant];

  if (currentPage === page) {
    classes.push(`${ variant }--selected`);
  }

  if (paginationSize) {
    classes.push(`${ variant }--${ paginationSize }`);
  }

  return classes.join(' ');
};

export const usePaginationClasses = (classList) => {
  const classes = ['bl-customComponent-pagination'];

  classes.push(classList);

  return classes.join(' ');
};

export const useDotsClasses = (paginationSize) => {
  const classes = ['pagination__page-dots'];

  if (paginationSize) {
    classes.push(`pagination__page-dots--${ paginationSize }`);
  }

  return classes.join(' ');
};
