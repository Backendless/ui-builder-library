import { useMemo } from 'react';

import { getShortDate } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export function Header({ startDate, endDate, daysAmount, daysAmountVisibility, resetButtonDisabled, handleReset }) {
  const start = useMemo(() => getShortDate(startDate), [startDate]);
  const end = useMemo(() => getShortDate(endDate), [endDate]);

  return (
    <div className="header">
      <div className="header__info">
        <span>{ `${ start } - ${ end }` }</span>
        { daysAmountVisibility &&
          <span className="header__info-days-amount">Amount: { daysAmount }</span>
        }
      </div>
      <button
        onClick={ handleReset }
        disabled={ resetButtonDisabled }
        className={ cn('header__button-reset', { 'header__button-reset--disabled': resetButtonDisabled }) }>
        Reset
      </button>
    </div>
  );
}
