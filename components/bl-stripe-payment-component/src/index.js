import { useMemo, useRef, useState } from 'react';

import { Elements } from './lib/react-stripe.umd.min.js';
import { loadStripe } from './lib/stripe.min';
import { PaymentStatus } from './payment-components/payment-status';
import { PaymentForm } from './payment-form';

const { cn } = BackendlessUI.CSSUtils;

function useStripeAPI(publishableKey) {
  return useMemo(() => loadStripe(publishableKey), [publishableKey]);
}

export default function StripePaymentComponent({ component, eventHandlers, settings }) {
  const { display, classList, style } = component;
  const { publishableKey } = settings;

  const [transactionDetails, setTransactionDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const stripePaymentRef = useRef(null);

  const stripePromise = useStripeAPI(publishableKey);

  component.el = stripePaymentRef.current;

  if (!display) {
    return null;
  }

  return (
    <div ref={ stripePaymentRef } className={ cn('bl-customComponent-stripe-payment', classList) } style={ style }>
      <Elements stripe={ stripePromise }>
        <PaymentForm
          component={ component }
          eventHandlers={ eventHandlers }
          setIsLoading={ setIsLoading }
          setTransactionDetails={ setTransactionDetails }
        />
      </Elements>
      <PaymentStatus
        transactionDetails={ transactionDetails }
        setTransactionDetails={ setTransactionDetails }
        isLoading={ isLoading }
      />
    </div>
  );
}
