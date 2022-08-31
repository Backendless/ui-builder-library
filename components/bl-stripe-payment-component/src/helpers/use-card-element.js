import { useState } from 'react';

import { useElements, useStripe } from '../lib/react-stripe.umd.min';

export function useCardElement(eventHandlers, setIsLoading, setTransactionDetails, formRef) {
  const { onSuccessEvent, onRejectEvent, onFocusEvent, onBlurEvent, onChangeEvent } = eventHandlers;

  const [errorMessage, setErrorMessage] = useState('');
  const [isCardValid, setIsCardValid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const disabled = !stripe || !elements || !isCardValid;

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const formField = event.target;
    const billingDetails = {
      'address_city'   : formField?.city?.value,
      'address_country': formField?.country?.value,
      'address_line1'  : formField?.address?.value,
      'address_zip'    : formField?.zip?.value,
      'address_state'  : formField?.state?.value,
      'name'           : formField?.name?.value,
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

  return { handleSubmit, onCardChange, onCardFocus, onCardBlur, errorMessage, disabled, elements };
}
