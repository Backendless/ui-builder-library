import { useMemo } from 'react';

const ONLY_NUMERIC_REGEX = /^[\d.,]+$/;

export function PaymentAmount({ component, paymentAmount, setPaymentAmount }) {
  const { minAmount, fixedAmount, currency, amountDecimalPlaces } = component;

  const amountPattern = useAmountPattern(amountDecimalPlaces, { strictEnding: true });

  const changeAmount = event => {
    const amount = event.target.value;
    const valid = amountPattern.test(amount);

    if (valid) {
      setPaymentAmount(amount);
      component.amount = amount;
    }
  };

  const validateInput = event => {
    const valid = ONLY_NUMERIC_REGEX.test(event.data);

    if (!valid) {
      event.preventDefault();
    }
  };

  return (
    <div className="payment-amount">
      <label htmlFor="amount">Payment amount</label>
      <div className="amount">
        <input
          type="number"
          name="amount"
          min={ minAmount || 0 }
          step="0.01"
          inputMode="decimal"
          value={ paymentAmount }
          onChange={ changeAmount }
          onBeforeInput={ validateInput }
          placeholder="0"
          readOnly={ fixedAmount }
          required
        />
        { currency && <span>{ currency }</span> }
      </div>
    </div>
  );
}

export function useAmountPattern(amountDecimalPlaces, options) {
  const { strictEnding } = options;

  return useMemo(() => {
    const endCharacter = strictEnding ? '$' : '';

    return new RegExp('^[0-9]*(\\.[0-9]{0,' + amountDecimalPlaces + '})?' + endCharacter);
  }, [amountDecimalPlaces, strictEnding]);
}
