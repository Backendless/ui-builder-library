import { useEffect, useReducer, useState } from 'react';

import { CardForm } from './card-form';
import { CardPreview } from './card-preview';
import { formatCVC, getCardByNumber, validateCardCVC, validateCardExpiry, validateCardNumber } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

const initialFormState = { cardNumber: '', expiry: '', cvc: '', cardholderName: '', focusedField: null };

export default function CreditCardComponent({ component, eventHandlers, elRef }) {
  const { display, classList, style, direction, cardPreviewVisibility, cvcVisibility } = component;

  const [card, setCard] = useState();
  const [formState, setFormState] = useObjectState(initialFormState);

  const { cardNumber, expiry, cvc, cardholderName, focusedField } = formState;

  useEffect(() => {
    const card = getCardByNumber(cardNumber);

    setCard(card);
  }, [cardNumber]);

  useEffect(() => {
    if (cvc) {
      const value = formatCVC(cvc, card);

      setFormState({ cvc: value });
    }
  }, [card]);

  const styles = { flexDirection: direction, ...style };

  Object.assign(component, {
    clearForm     : () => setFormState(initialFormState),
    validateNumber: () => validateCardNumber(cardNumber, card),
    validateExpiry: () => validateCardExpiry(expiry),
    validateCVC   : () => validateCardCVC(cvc, card),
  });

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-creditCard', classList) } style={ styles }>
      { cardPreviewVisibility && (
        <CardPreview
          cardNumber={ cardNumber }
          expiry={ expiry }
          cvc={ cvc }
          focusedField={ focusedField }
          name={ cardholderName }
          card={ card }
          cvcVisibility={ cvcVisibility }
        />
      ) }
      <CardForm
        component={ component }
        eventHandlers={ eventHandlers }
        formState={ formState }
        setFormState={ setFormState }
        card={ card }
      />
    </div>
  );
}

function useObjectState(initialState) {
  initialState = useState(initialState)[0];

  return useReducer((state, patch) => {
    const changes = typeof patch === 'function' ? patch(state) : patch;

    const changed = Object.entries(changes).some(([key, value]) => state[key] !== value);

    return changed ? { ...state, ...changes } : state;
  }, initialState || {});
}
