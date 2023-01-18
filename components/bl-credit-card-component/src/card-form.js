import { useMemo } from 'react';

import {
  formatCreditCardNumber, formatCVC, formatExpirationDate, getExpirationDate, validateCardDetails,
} from './helpers';

export function CardForm(props) {
  const { cardNumber, cardholderName, expiry, cvc, cvcVisibility, setFocus } = props;
  const {
    submitButtonLabel, cardNumberFieldPlaceholder, cardholderNameFieldPlaceholder,
    expiryFieldPlaceholder, cvcFieldPlaceholder, labelsVisibility,
  } = props.component;

  const {
    handleSubmit, handleNumberChange, handleCardholderNameChange,
    handleExpiryChange, handleCVCChange, onCardFocus, onCardBlur,
  } = useFormActions(props);

  const formFields = useMemo(() => [
    {
      label      : 'Card Number:',
      type       : 'tel',
      name       : 'number',
      placeholder: cardNumberFieldPlaceholder,
      pattern    : '[\\d| ]{16,22}',
      value      : cardNumber,
      onChange   : handleNumberChange,
    },
    {
      label      : 'Name on card:',
      type       : 'text',
      name       : 'name',
      placeholder: cardholderNameFieldPlaceholder,
      pattern    : '[a-z A-Z-]+',
      value      : cardholderName,
      onChange   : handleCardholderNameChange,
    },
    {
      label      : 'Expiration Date:',
      type       : 'tel',
      name       : 'expiry',
      placeholder: expiryFieldPlaceholder,
      pattern    : '\\d\\d / \\d\\d',
      value      : expiry,
      onChange   : handleExpiryChange,
    },
    {
      label      : 'CVC:',
      type       : cvcVisibility ? 'tel' : 'password',
      name       : 'cvc',
      placeholder: cvcFieldPlaceholder,
      pattern    : '\\d{3,4}',
      value      : cvc,
      onChange   : handleCVCChange,
    },
  ], [
    cardNumber, cardNumberFieldPlaceholder, cardholderName, cardholderNameFieldPlaceholder, cvc, cvcFieldPlaceholder,
    cvcVisibility, expiry, expiryFieldPlaceholder, handleCVCChange, handleCardholderNameChange, handleExpiryChange,
    handleNumberChange,
  ]);

  return (
    <form className="payment-form" onSubmit={ handleSubmit } onFocus={ onCardFocus } onBlur={ onCardBlur }>
      { formFields.map((field, index) => (
        <FormField key={ index } labelsVisibility={ labelsVisibility } field={ field } setFocus={ setFocus }/>
      )) }
      <button type="submit" className="submit-button">{ submitButtonLabel }</button>
    </form>
  );
}

function FormField({ labelsVisibility, field, setFocus }) {
  const { label, type, name, placeholder, pattern, value, onChange } = field;

  const handleInputFocus = event => setFocus(event.target.name);

  return (
    <div className="form-field">
      { labelsVisibility && (
        <label className="form-field-label" htmlFor={ name }>{ label }</label>
      ) }
      <input
        type={ type }
        className="form-field-input"
        name={ name }
        placeholder={ placeholder }
        pattern={ pattern }
        value={ value }
        onChange={ onChange }
        onFocus={ handleInputFocus }
        required
      />
    </div>
  );
}

function useFormActions(props) {
  const { onSubmit, onSuccess, onReject, onFocus, onBlur } = props.eventHandlers;
  const {
    setCardNumber, setExpiry, setCVC, setCardholderName, card, cardNumber, cardholderName, expiry, cvc, setFocus,
  } = props;

  const formData = useMemo(() => (
    { cardNumber, cardholderName, expiry, cvc }
  ), [cardNumber, cardholderName, expiry, cvc]);

  const handleNumberChange = event => {
    const value = formatCreditCardNumber(event.target.value, card);

    setCardNumber(value);
  };

  const handleExpiryChange = event => {
    const value = formatExpirationDate(event.target.value);

    setExpiry(value);
  };

  const handleCVCChange = event => {
    const value = formatCVC(event.target.value, card);

    setCVC(value);
  };

  const handleCardholderNameChange = event => setCardholderName(event.target.value);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      validateCardDetails(card, cardNumber, expiry, cvc);

      const expirationDate = getExpirationDate(expiry);

      const cardDetails = {
        cardholderName,
        cardNumber: cardNumber.replace(/ /g, ''),
        expiry    : expirationDate,
        cvc,
      };

      await onSubmit({ cardDetails });

      onSuccess({ cardDetails });
    } catch (error) {
      onReject({ error: error.message });
    }
  };

  const onCardFocus = event => onFocus({ event, formData });
  const onCardBlur = event => {
    onBlur({ event, formData });
    setFocus('');
  };

  return {
    handleSubmit, handleNumberChange, handleCardholderNameChange,
    handleExpiryChange, handleCVCChange, onCardFocus, onCardBlur,
  };
}
