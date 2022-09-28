import { useState } from 'react';

import { Elements } from './lib/react-stripe.umd.min.js';
import { loadStripe } from './lib/stripe.min';
import { PaymentStatus } from './payment-components/payment-status';
import { PaymentForm } from './payment-form';

const { cn } = BackendlessUI.CSSUtils;

export default function StripePaymentComponent({ component, eventHandlers }) {
  const { display, classList, publishableKey, style } = component;

  const [transactionDetails, setTransactionDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // SHOULD BE publishableKey from UI Builder SETTINGS
  const [stripePromise, setStripePromise] = useState(() => {
    return loadStripe(publishableKey);
  });

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-stripe-payment', classList) } style={ style }>
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
