export function PaymentStatus({ transactionDetails, isLoading, setTransactionDetails }) {
  const paymentStatusVisibility = isLoading || transactionDetails.id;

  if (!paymentStatusVisibility) {
    return null;
  }

  const payAgain = () => {
    setTransactionDetails({});
  };

  return (
    <div className="payment-status">
      { transactionDetails.id && (
        <div className="completed-payment">
          <div className="transaction-details">
            <span>Payment { transactionDetails.status }</span>
            <span className="transaction-id">Transaction id: { transactionDetails.id }</span>
          </div>
          <button type="button" onClick={ payAgain }>Go to another payment</button>
        </div>
      )}
      { isLoading && (<span className="spinner"></span>) }
    </div>
  );
}
