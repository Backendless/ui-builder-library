export function ChangeColorButton({ signaturePad, component, eventHandlers }) {
  const { penColor, changeColorButtonLabel } = component;
  const { onChangeColor } = eventHandlers;

  const changeColor = React.useCallback(
    e => {
      const color = e.target.value;

      signaturePad.penColor = color;

      if (onChangeColor) {
        onChangeColor({ color });
      }
    },
    [onChangeColor, signaturePad]
  );

  if (penColor !== '') {
    return null;
  }

  return (
    <label className="change-color-button">
      {/*Waiting for BKNDLSS-28470, SHOULD BE
      { changeColorButtonLabel }*/}
      { changeColorButtonLabel || 'Change color' }
      <input
        type="color"
        onChange={ changeColor }
      />
    </label>
  );
}
