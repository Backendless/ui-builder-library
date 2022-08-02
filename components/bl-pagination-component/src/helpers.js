import { useMemo } from 'react';

export const paginationStyle = {
  'normal'         : 'button',
  'outline'        : 'button-outline',
  'rounded'        : 'button-rounded',
  'rounded-outline': 'button-rounded-outline'
};

export const useControlButtonClass = (isDisabled, variant, paginationSize) => useMemo(() => {
  const classes = ['pagination__control-button', variant];

  if (isDisabled) {
    classes.push('pagination__control-button--disabled');
  }

  if (paginationSize) {
    classes.push(`${ variant }--${ paginationSize }`);
  }

  return classes.join(' ');
}, [isDisabled, variant, paginationSize]);

export const usePageButtonListClass = (currentPage, page, variant, paginationSize) => useMemo(() => {
  const classes = ['pagination__page-button', variant];

  if (currentPage === page) {
    classes.push(`${ variant }--selected`);
  }

  if (paginationSize) {
    classes.push(`${ variant }--${ paginationSize }`);
  }

  return classes.join(' ');
}, [currentPage, page, variant, paginationSize]);
