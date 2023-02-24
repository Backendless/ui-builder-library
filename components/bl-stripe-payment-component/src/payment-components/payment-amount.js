import { useRef } from 'react';

import { validatePaymentAmount } from '../payment-form';

export function PaymentAmount({ component, amount }) {
  const { minAmount, fixedAmount, currency, amountDecimalPlaces } = component;
  const amountRef = useRef(null);

  const changeAmount = e => {
    component.amount = validatePaymentAmount(e.target.value, amountDecimalPlaces);
    amountRef.current.value = amount;
  };

  return (
    <div className="payment-amount">
      <label htmlFor="amount">Payment amount</label>
      <div className="amount">
        <input
          type="number"
          ref={ amountRef }
          name="amount"
          min={ minAmount || 0 }
          step="0.01"
          value={ amount }
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
