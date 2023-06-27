import { useMemo } from 'react';

import { RegexPatterns } from './helpers';

const defaultState = {
  expirationLocaleHeader: 'valid thru',
  namePlaceholder       : 'YOUR NAME HERE',
  issuer                : 'unknown',
  numberLength          : 16,
  numberMaxLength       : 19,
};

const NumberSpaces = { shortFormat: [4, 11], defaultFormat: [4, 9, 14] };

const { cn } = BackendlessUI.CSSUtils;

export function CardPreview(props) {
  const { cardNumber, expiry, cvc, focusedField, name, card, component } = props;
  const { cvcVisibility, cardholderNameFieldVisibility } = component;

  const { creditCardNumber, expirationDate, issuer } = useCardPreview(cardNumber, expiry, card);

  const currentCVC = useMemo(() => {
    return cvcVisibility ? cvc : cvc.replace(RegexPatterns.ALL_DIGITS, '*');
  }, [cvc, cvcVisibility]);

  return (
    <div className="card-container">
      <div
        className={ cn('card', `card-${ issuer }`, { 'card-flipped': focusedField === 'cvc' && issuer !== 'amex' }) }>
        <div className="card-front">
          <div className="card-background"/>
          <div className="issuer"/>
          <div className={ cn('cvc-front', { 'focused': focusedField === 'cvc' }) }>{ currentCVC }</div>
          <div
            className={ cn('card-number', {
              'focused'     : focusedField === 'number',
              'filled'      : creditCardNumber[0] !== '•',
              'number-large': creditCardNumber.replace(RegexPatterns.ALL_SPACES, '').length > 16,
            }) }>
            { creditCardNumber }
          </div>
          { cardholderNameFieldVisibility && (
            <div className={ cn('card-name', { 'focused': focusedField === 'name', 'filled': !!name }) }>
              { name || defaultState.namePlaceholder }
            </div>
          ) }
          <div className={ cn('card-expiry', {
            'focused': focusedField === 'expiry',
            'filled' : expirationDate[0] !== '•',
          }) }>
            <div className="card-expiry-valid">{ defaultState.expirationLocaleHeader }</div>
            <div className="card-expiry-value">{ expirationDate }</div>
          </div>
          <div className="card-chip"/>
        </div>
        <div className="card-back">
          <div className="card-background"/>
          <div className="card-stripe"/>
          <div className="card-signature"/>
          <div className={ cn('card-cvc', { 'focused': focusedField === 'cvc' }) }>{ currentCVC }</div>
          <div className="issuer"/>
        </div>
      </div>
    </div>
  );
}

function useCardPreview(cardNumber, expiry, card) {
  const expirationDate = useMemo(() => {
    const date = expiry || '';
    let month = '';
    let year = '';

    if (date.includes('/')) {
      [month, year] = date.split(' / ');
    } else if (date.length) {
      month = date.slice(0, 2);
      year = date.slice(5, 7);
    }

    while (month.length < 2) {
      month += '•';
    }

    while (year.length < 2) {
      year += '•';
    }

    return `${ month } / ${ year }`;
  }, [expiry]);

  const issuer = useMemo(() => card?.type || defaultState.issuer, [card]);

  const creditCardNumber = useMemo(() => {
    let maxLength = card?.length[card.length.length - 1] || defaultState.numberMaxLength;
    let nextNumber = cardNumber.replace(RegexPatterns.ALL_SPACES, '');
    const initialNumberLength = defaultState.numberLength;

    if (maxLength > initialNumberLength) {
      maxLength = nextNumber.length <= initialNumberLength ? initialNumberLength : maxLength;
    }

    while (nextNumber.length < maxLength) {
      nextNumber += '•';
    }

    const spaceIndexes = maxLength < initialNumberLength ? NumberSpaces.shortFormat : NumberSpaces.defaultFormat;

    for (const index of spaceIndexes) {
      nextNumber = `${ nextNumber.slice(0, index) } ${ nextNumber.slice(index) }`;
    }

    return nextNumber;
  }, [card, cardNumber]);

  return { creditCardNumber, expirationDate, issuer };
}
