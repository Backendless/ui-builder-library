export function UndoButton({ signaturePad, component, eventHandlers }) {
  const { undoButtonLabel } = component;
  const { onUndoClick } = eventHandlers;

  const undo = () => {
    const data = signaturePad.toData();

    if (data) {
      data.pop();
      signaturePad.fromData(data);
    }

    if (onUndoClick) {
      onUndoClick();
    }
  };

  return (
    <button
      className="undo-button"
      onClick={ undo }
    >
      {/*Waiting for BKNDLSS-28470, SHOULD BE
      { undoButtonLabel }*/}
      { undoButtonLabel || 'Undo' }
    </button>
  );
}
