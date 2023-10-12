import { useEffect, useRef, useState } from 'react';

import { CardElement } from './lib/react-stripe.umd.min';

import { useCardElement } from './helpers/use-card-element';
import { BillingDetails } from './payment-components/billing-details';
import { PaymentAmount, useAmountPattern } from './payment-components/payment-amount';

export function PaymentForm(props) {
  const { component, eventHandlers, setIsLoading, setTransactionDetails, publishableKey } = props;
  const { amount, currency, amountDecimalPlaces } = component;

  const [cardElementColor, setCardElementColor] = useState('inherit');
  const [paymentAmount, setPaymentAmount] = useState(amount);

  const cardElementRef = useRef(null);
  const formRef = useRef(null);
  const amountPattern = useAmountPattern(amountDecimalPlaces, { strictEnding: false });

  useEffect(() => {
    if (paymentAmount !== amount) {
      const validAmount = String(amount).match(amountPattern)[0];

      setPaymentAmount(validAmount);
    }
  }, [amount]);

  const {
    handleSubmit, onCardChange, onCardFocus, onCardBlur, errorMessage, disabled, elements,
  } = useCardElement(eventHandlers, setIsLoading, setTransactionDetails, formRef, publishableKey);

  const cardElementOptions = getCardElementOptions(cardElementColor);

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
      <PaymentAmount component={ component } paymentAmount={ paymentAmount } setPaymentAmount={ setPaymentAmount }/>
      <button type="submit" disabled={ disabled }>{ `Pay ${ paymentAmount || 0 } ${ currency || '' }` }</button>
      { errorMessage && <span className="payment-error">{ errorMessage }</span> }
    </form>
  );
}

function getCardElementOptions(cardElementColor) {
  const cardElementStyles = {
    base: {
      fontSize       : '16px',
      backgroundColor: 'transparent',
      color          : cardElementColor,
    },
  };

  return {
    iconStyle     : 'solid',
    style         : cardElementStyles,
    hidePostalCode: true,
  };
}
