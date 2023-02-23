import { useMemo } from 'react';

export function PaymentAmount({ component, paymentAmount, setPaymentAmount }) {
  const { minAmount, fixedAmount, currency, amountDecimalPlaces } = component;

  const amountPattern = useMemo(() => {
    return new RegExp('^[0-9]*(\\.[0-9]{0,' + amountDecimalPlaces + '})?$');
  }, [amountDecimalPlaces]);

  const changeAmount = event => {
    const amount = event.target.value;
    const valid = amountPattern.test(amount);

    if (valid) {
      setPaymentAmount(amount);
      component.amount = amount;
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
          value={ paymentAmount }
          onChange={ changeAmount }
          placeholder="0"
          readOnly={ fixedAmount }
          required
        />
        { currency && <span>{ currency }</span> }
      </div>
    </div>
  );
}
