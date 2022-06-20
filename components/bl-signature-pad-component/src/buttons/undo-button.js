export function UndoButton({ signaturePadRef, component, eventHandlers }) {
  const { undoButtonLabel } = component;
  const { onUndoClick } = eventHandlers;

  const undo = () => {
    const data = signaturePadRef.current.toData();

    if (data) {
      data.pop();
      signaturePadRef.current.fromData(data);
    }

    if (onUndoClick) {
      onUndoClick();
    }
  };

  return (
    <button className="undo-button" onClick={ undo }>
      { undoButtonLabel }
    </button>
  );
}
