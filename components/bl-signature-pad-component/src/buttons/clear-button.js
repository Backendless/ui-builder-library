export function ClearButton({ signaturePadRef, component, eventHandlers }) {
  const { clearButtonLabel } = component;
  const { onClearClick } = eventHandlers;

  const clear = () => {
    signaturePadRef.current.clear();

    if (onClearClick) {
      onClearClick();
    }
  };

  return (
    <button className="clear-button" onClick={ clear }>
      { clearButtonLabel }
    </button>
  );
}
