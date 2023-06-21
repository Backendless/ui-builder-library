import { useMemo, useState } from 'react';

import { Elements } from './lib/react-stripe.umd.min.js';
import { loadStripe } from './lib/stripe.min';
import { PaymentStatus } from './payment-components/payment-status';
import { PaymentForm } from './payment-form';

const { cn } = BackendlessUI.CSSUtils;

function useStripeAPI(publishableKey) {
  return useMemo(() => (
    loadStripe(publishableKey).catch(error => {
      console.error(error);

      return null;
    })
  ), [publishableKey]);
}

export default function StripePaymentComponent({ component, eventHandlers, settings, elRef }) {
  const { display, classList, style } = component;
  const { publishableKey } = settings;

  const [transactionDetails, setTransactionDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = useStripeAPI(publishableKey);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-stripe-payment', classList) } style={ style }>
      <Elements stripe={ stripePromise }>
        <PaymentForm
          component={ component }
          eventHandlers={ eventHandlers }
          setIsLoading={ setIsLoading }
          setTransactionDetails={ setTransactionDetails }
          publishableKey={ publishableKey }
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
