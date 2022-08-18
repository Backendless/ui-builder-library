import { useEffect, useRef, useState } from 'react';

import { useCardElement } from './helpers/use-card-element';
import { CardElement } from './lib/react-stripe.umd.min';
import { BillingDetails } from './payment-components/billing-details';
import { PaymentAmount } from './payment-components/payment-amount';

export function PaymentForm(props) {
  const { component, eventHandlers, setIsLoading, setTransactionDetails } = props;
  const { amount, currency } = component;

  const [cardElementColor, setCardElementColor] = useState('inherit');
  const cardElementRef = useRef(null);
  const formRef = useRef(null);

  const {
    handleSubmit,
    onCardChange,
    onCardFocus,
    onCardBlur,
    errorMessage,
    isDisabled,
    elements,
  } = useCardElement(eventHandlers, setIsLoading, setTransactionDetails, formRef);

  const cardElementStyles = {
    base: {
      fontSize       : '16px',
      backgroundColor: 'transparent',
      color          : cardElementColor,
    },
  };

  const cardElementOptions = {
    iconStyle     : 'solid',
    style         : cardElementStyles,
    hidePostalCode: true,
  };

  useEffect(() => {
    const color = getComputedStyle(cardElementRef.current).color;

    setCardElementColor(color);
  }, []);

  component.clearCard = () => elements.getElement('card').clear();
  component.blurCard = () => elements.getElement('card').blur();
  component.focusCard = () => elements.getElement('card').focus();

  return (
    <form ref={ formRef } onSubmit={ handleSubmit }>
      <BillingDetails component={ component }/>
      <div className="wrapper" ref={ cardElementRef }>
        <span>Card details</span>
        <CardElement
          id="card-element"
          options={ cardElementOptions }
          onFocus={ onCardFocus }
          onBlur={ onCardBlur }
          onChange={ onCardChange }
        />
      </div>
      <PaymentAmount component={ component }/>
      <button type="submit" disabled={ isDisabled }>{ `Pay ${ amount || 0 } ${ currency || '' }` }</button>
      { errorMessage && <span className="payment-error">{ errorMessage }</span> }
    </form>
  );
}
