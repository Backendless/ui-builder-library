export const paginationStyle = {
  'normal'         : 'button',
  'outline'        : 'button-outline',
  'rounded'        : 'button-rounded',
  'rounded-outline': 'button-rounded-outline'
};

export const useControlButtonClass = (isDisabled, variant, paginationSize) => {
  const classes = ['pagination__control-button', variant];

  classes.push(isDisabled ? 'pagination__control-button--disabled' : '');
  classes.push(paginationSize ? `${ variant }--${ paginationSize }` : '');

  return classes.join(' ').trim();
};

export const useButtonSvgClass = (size) => {
  const classes = ['pagination__control-button-svg'];

  classes.push(size ? `pagination__control-button-svg--${ size }` : '');

  return classes.join(' ').trim();
};

export const usePageButtonListClass = (currentPage, page, variant, paginationSize) => {
  const classes = ['pagination__page-button', variant];

  classes.push(currentPage === page ? `${ variant }--selected` : '');
  classes.push(paginationSize ? `${ variant }--${ paginationSize }` : '');

  return classes.join(' ').trim();
};

export const usePaginationClasses = (classList) => {
  const classes = ['bl-customComponent-pagination'];

  classes.push(classList);

  return classes.join(' ');
};

export const useDotsClasses = (paginationSize) => {
  const classes = ['pagination__page-dots'];

  classes.push(paginationSize ? `pagination__page-dots--${ paginationSize }` : '');

  return classes.join(' ').trim();
};
