import { useState } from 'react';

import { useElements, useStripe } from '../lib/react-stripe.umd.min';

export function useCardElement(eventHandlers, setIsLoading, setTransactionDetails, formRef) {
  const { onSuccessEvent, onRejectEvent, onFocusEvent, onBlurEvent, onChangeEvent } = eventHandlers;

  const [errorMessage, setErrorMessage] = useState('');
  const [isCardValid, setIsCardValid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const isDisabled = !stripe || !elements || !isCardValid;

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const formField = event.target;
    const billingDetails = {
      'address_city'   : formField.city ? formField.city.value : undefined,
      'address_country': formField.country ? formField.country.value : undefined,
      'address_line1'  : formField.address ? formField.address.value : undefined,
      'address_zip'    : formField.zip ? formField.zip.value : undefined,
      'address_state'  : formField.state ? formField.state.value : undefined,
      'name'           : formField.name ? formField.name.value : undefined,
    };

    const cardElement = elements.getElement('card');

    const { token, error } = await stripe.createToken(cardElement, billingDetails);

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);

      return;
    }

    const chargeData = {
      token : token.id,
      amount: formField.amount.value * 100,
    };

    Backendless.CustomServices.invoke('Stripe', 'charge', chargeData)
      .then(transaction => {
        setTransactionDetails({ id: transaction.id, status: transaction.status });
        cardElement.clear();
        formRef.current.reset();
        setIsLoading(false);

        if (onSuccessEvent) {
          onSuccessEvent({ transaction });
        }
      })
      .catch(error => {
        const errorMessage = error.message;

        setErrorMessage(errorMessage);
        setIsLoading(false);

        if (onRejectEvent) {
          onRejectEvent({ errorMessage });
        }
      });
  };

  const onCardChange = event => {
    const cardCondition = event;
    const error = cardCondition.error;

    setErrorMessage(error ? error.message : '');
    setIsCardValid(cardCondition.complete);

    if (onChangeEvent) {
      onChangeEvent({ cardCondition });
    }
  };

  const onCardFocus = () => {
    if (onFocusEvent) {
      onFocusEvent();
    }
  };

  const onCardBlur = () => {
    if (onBlurEvent) {
      onBlurEvent();
    }
  };

  return { handleSubmit, onCardChange, onCardFocus, onCardBlur, errorMessage, isDisabled, elements };
}
