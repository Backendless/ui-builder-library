import { useEffect, useRef, useState } from 'react';

import { CardForm } from './card-form';
import { CardPreview } from './card-preview';
import {
  clearCardForm, ensureMeasure, formatCVC, getCardByNumber, validateCardCVC, validateCardExpiry, validateCardNumber,
} from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function CreditCardComponent({ component, eventHandlers }) {
  const {
    display, classList, style, direction, borderWidth, borderStyle, borderColor, cardPreviewVisibility, cvcVisibility,
  } = component;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [focus, setFocus] = useState('');
  const [card, setCard] = useState();

  const creditCardRef = useRef(null);

  useEffect(() => {
    const card = getCardByNumber(cardNumber);

    setCard(card);
  }, [cardNumber]);

  useEffect(() => {
    if (cvc) {
      const value = formatCVC(cvc, card);

      setCVC(value);
    }
  }, [card]);

  const styles = {
    flexDirection: direction,
    borderWidth  : ensureMeasure('border-width', borderWidth),
    borderStyle,
    borderColor,
    ...style,
  };

  Object.assign(component, {
    el            : creditCardRef.current,
    clearForm     : () => clearCardForm(setCardNumber, setExpiry, setCVC, setCardholderName),
    validateNumber: () => validateCardNumber(cardNumber, card),
    validateExpiry: () => validateCardExpiry(expiry),
    validateCVC   : () => validateCardCVC(cvc, card),
  });

  if (!display) {
    return null;
  }

  return (
    <div ref={ creditCardRef } className={ cn('bl-customComponent-creditCard', classList) } style={ styles }>
      { cardPreviewVisibility && (
        <CardPreview
          cardNumber={ cardNumber }
          expiry={ expiry }
          cvc={ cvc }
          focused={ focus }
          name={ cardholderName }
          card={ card }
          cvcVisibility={ cvcVisibility }
        />
      ) }
      <CardForm
        component={ component }
        eventHandlers={ eventHandlers }
        cardNumber={ cardNumber }
        cardholderName={ cardholderName }
        expiry={ expiry }
        cvc={ cvc }
        setCardNumber={ setCardNumber }
        setExpiry={ setExpiry }
        setCVC={ setCVC }
        setCardholderName={ setCardholderName }
        setFocus={ setFocus }
        card={ card }
        cvcVisibility={ cvcVisibility }
      />
    </div>
  );
}
