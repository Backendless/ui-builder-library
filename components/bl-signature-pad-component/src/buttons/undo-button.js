export default function UndoButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const onUndoClick = () => {
    const data = signaturePad.toData();

    if (data) {
      data.pop();
      signaturePad.fromData(data);
    }

    if (eventHandlers.onUndoClick) {
      eventHandlers.onUndoClick();
    }
  };

  return (
    <button
      onClick={ onUndoClick }
    >
      {/*SHOULD BE
      { component.undoButtonLabel }*/}
      { component.undoButtonLabel || 'Undo' }
    </button>
  );
}
