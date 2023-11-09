import { useState } from 'react';

import { useElements, useStripe } from '../lib/react-stripe.umd.min';

const Errors = {
  SERVICE_UNAVAILABLE: 'Service not found',
  PLUGIN_UNAVAILABLE : (
    'Service not found. Make sure to install the Stripe Integration Plugin from the Backendless marketplace.'
  ),
  KEY_UNAVAILABLE    : (
    'The component is not properly configured. Make sure to add Stripe\'s Publishable key in the SETTINGS tab.'
  ),
};

export function useCardElement(eventHandlers, setIsLoading, setTransactionDetails, formRef, publishableKey) {
  const { onSuccessEvent, onRejectEvent, onFocusEvent, onBlurEvent, onChangeEvent } = eventHandlers;

  const [errorMessage, setErrorMessage] = useState(() => publishableKey ? '' : Errors.KEY_UNAVAILABLE);
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
        onSuccessEvent({ transaction });
      })
      .catch(error => {
        const errorMessage = error.message;

        setErrorMessage(errorMessage === Errors.SERVICE_UNAVAILABLE ? Errors.PLUGIN_UNAVAILABLE : errorMessage);
        setIsLoading(false);
        onRejectEvent({ errorMessage });
      });
  };

  const onCardFocus = () => onFocusEvent();
  const onCardBlur = () => onBlurEvent();

  const onCardChange = event => {
    const cardCondition = event;
    const error = cardCondition.error;

    setErrorMessage(error ? error.message : '');
    setIsCardValid(cardCondition.complete);
    onChangeEvent({ cardCondition });
  };

  return { handleSubmit, onCardChange, onCardFocus, onCardBlur, errorMessage, disabled, elements };
}
