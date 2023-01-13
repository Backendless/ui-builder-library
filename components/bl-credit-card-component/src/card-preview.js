import { useMemo } from 'react';

const InitialCardProps = {
  expirationLocaleHeader: 'valid thru',
  namePlaceholder       : 'YOUR NAME HERE',
  issuer                : 'unknown',
  numberLength          : 16,
  numberMaxLength       : 19,
};

const NumberSpaces = { shortFormat: [4, 11], defaultFormat: [4, 9, 14] };

const { cn } = BackendlessUI.CSSUtils;

export function CardPreview(props) {
  const { cardNumber, expiry, cvc, focused, name, visibility, card } = props;

  const { creditCardNumber, expirationDate, issuer } = useCardPreview(cardNumber, expiry, card);

  if (!visibility) {
    return null;
  }

  return (
    <div className="card-container">
      <div className={ cn('card', `card-${ issuer }`, { 'card-flipped': focused === 'cvc' && issuer !== 'amex' }) }>
        <div className="card-front">
          <div className="card-background"/>
          <div className="issuer"/>
          <div className={ cn('cvc-front', { 'focused': focused === 'cvc' }) }>{ cvc }</div>
          <div
            className={ cn('card-number', {
              'focused'     : focused === 'number',
              'filled'      : creditCardNumber[0] !== '•',
              'number-large': creditCardNumber.replace(/ /g, '').length > 16,
            }) }>
            { creditCardNumber }
          </div>
          <div className={ cn('card-name', { 'focused': focused === 'name', 'filled': !!name }) }>
            { name || InitialCardProps.namePlaceholder }
          </div>
          <div className={ cn('card-expiry', {
            'focused': focused === 'expiry',
            'filled' : expirationDate[0] !== '•',
          }) }>
            <div className="card-expiry-valid">{ InitialCardProps.expirationLocaleHeader }</div>
            <div className="card-expiry-value">{ expirationDate }</div>
          </div>
          <div className="card-chip"/>
        </div>
        <div className="card-back">
          <div className="card-background"/>
          <div className="card-stripe"/>
          <div className="card-signature"/>
          <div className={ cn('card-cvc', { 'focused': focused === 'cvc' }) }>{ cvc }</div>
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

  const issuer = useMemo(() => card?.type || InitialCardProps.issuer, [card]);

  const creditCardNumber = useMemo(() => {
    let maxLength = card?.length[card.length.length - 1] || InitialCardProps.numberMaxLength;
    let nextNumber = cardNumber.replace(/ /g, '');
    const initialNumberLength = InitialCardProps.numberLength;

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
