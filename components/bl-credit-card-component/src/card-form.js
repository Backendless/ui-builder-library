import { useMemo } from 'react';

import {
  formatCreditCardNumber, formatCVC, formatExpirationDate, getExpirationDate, RegexPatterns, validateCardDetails,
} from './helpers';

export function CardForm(props) {
  const { setFormState } = props;
  const { submitButtonLabel, labelsVisibility } = props.component;

  const { handleSubmit, onCardFocus, onCardBlur } = useFormActions(props);

  const formFields = useFormFields(props);

  return (
    <form className="payment-form" onSubmit={ handleSubmit } onFocus={ onCardFocus } onBlur={ onCardBlur }>
      { formFields.map((field, index) => (
        <FormField
          key={ index }
          labelsVisibility={ labelsVisibility }
          field={ field }
          setFormState={ setFormState }
        />
      )) }
      <button type="submit" className="submit-button">{ submitButtonLabel }</button>
    </form>
  );
}

function FormField({ labelsVisibility, field, setFormState }) {
  const { label, type, name, placeholder, pattern, value, onChange } = field;

  const handleInputFocus = event => setFormState({ focusedField: event.target.name });

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

function useFormFields(props) {
  const { cardNumber, cardholderName, expiry, cvc, cvcVisibility } = props;
  const {
    cardNumberFieldPlaceholder, cardholderNameFieldPlaceholder, expiryFieldPlaceholder, cvcFieldPlaceholder,
  } = props.component;

  const { handleNumberChange, handleCardholderNameChange, handleExpiryChange, handleCVCChange } = useFormActions(props);

  const cardNumberField = useMemo(() => ({
    label      : 'Card Number:',
    type       : 'tel',
    name       : 'number',
    placeholder: cardNumberFieldPlaceholder,
    pattern    : '[\\d| ]{16,22}',
    value      : cardNumber,
    onChange   : handleNumberChange,
  }), [cardNumber, cardNumberFieldPlaceholder, handleNumberChange]);

  const cardholderNameField = useMemo(() => ({
    label      : 'Name on card:',
    type       : 'text',
    name       : 'name',
    placeholder: cardholderNameFieldPlaceholder,
    pattern    : '[a-z A-Z-]+',
    value      : cardholderName,
    onChange   : handleCardholderNameChange,
  }), [cardholderName, cardholderNameFieldPlaceholder, handleCardholderNameChange]);

  const expiryField = useMemo(() => ({
    label      : 'Expiration Date:',
    type       : 'tel',
    name       : 'expiry',
    placeholder: expiryFieldPlaceholder,
    pattern    : '\\d\\d / \\d\\d',
    value      : expiry,
    onChange   : handleExpiryChange,
  }), [expiry, expiryFieldPlaceholder, handleExpiryChange]);

  const cvcField = useMemo(() => ({
    label      : 'CVC:',
    type       : cvcVisibility ? 'tel' : 'password',
    name       : 'cvc',
    placeholder: cvcFieldPlaceholder,
    pattern    : '\\d{3,4}',
    value      : cvc,
    onChange   : handleCVCChange,
  }), [cvc, cvcFieldPlaceholder, cvcVisibility, handleCVCChange]);

  return [cardNumberField, cardholderNameField, expiryField, cvcField];
}

function useFormActions(props) {
  const { onSubmit, onSuccess, onReject, onFocus, onBlur } = props.eventHandlers;
  const { setFormState, card, cardNumber, cardholderName, expiry, cvc } = props;

  const formData = useMemo(() => (
    { cardNumber, cardholderName, expiry, cvc }
  ), [cardNumber, cardholderName, expiry, cvc]);

  const handleNumberChange = event => {
    const value = formatCreditCardNumber(event.target.value, card);

    setFormState({ cardNumber: value });
  };

  const handleExpiryChange = event => {
    const value = formatExpirationDate(event.target.value);

    setFormState({ expiry: value });
  };

  const handleCVCChange = event => {
    const value = formatCVC(event.target.value, card);

    setFormState({ cvc: value });
  };

  const handleCardholderNameChange = event => setFormState({ cardholderName: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      validateCardDetails(card, cardNumber, expiry, cvc);

      const expirationDate = getExpirationDate(expiry);

      const cardDetails = {
        cardholderName,
        cardNumber: cardNumber.replace(RegexPatterns.ALL_SPACES, ''),
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
    setFormState({ focusedField: '' });
  };

  return {
    handleSubmit, handleNumberChange, handleCardholderNameChange,
    handleExpiryChange, handleCVCChange, onCardFocus, onCardBlur,
  };
}
