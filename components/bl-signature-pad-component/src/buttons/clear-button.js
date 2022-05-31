export default function ClearButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const onClearClick = () => {
    signaturePad.clear();

    if (eventHandlers.onClearClick) {
      eventHandlers.onClearClick();
    }
  };

  return (
    <button
      onClick={ onClearClick }
    >
      {/*SHOULD BE
      { component.clearButtonLabel }*/}
      { component.clearButtonLabel || 'Clear' }
    </button>
  );
}
