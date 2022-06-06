export function ClearButton({ signaturePad, component, eventHandlers }) {
  const { clearButtonLabel } = component;
  const { onClearClick } = eventHandlers;

  const clear = () => {
    signaturePad.clear();

    if (onClearClick) {
      onClearClick();
    }
  };

  return (
    <button
      className="clear-button"
      onClick={ clear }
    >
      {/*Waiting for BKNDLSS-28470, SHOULD BE
      { clearButtonLabel }*/}
      { clearButtonLabel || 'Clear' }
    </button>
  );
}
