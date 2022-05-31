export default function ChangeColorButton(props) {
  const { signaturePad, component, eventHandlers } = props;

  const changeColor = e => {
    const color = e.target.value;

    signaturePad.penColor = color;

    if (eventHandlers.onChangeColor) {
      eventHandlers.onChangeColor({ color });
    }
  };

  return (
    <label
      style={{
        display: component.penColor ? 'none' : 'inline-block',
      }}
    >
      {/*SHOULD BE
      { component.changeColorButtonLabel }*/}
      { component.changeColorButtonLabel || 'Change color' }
      <input
        type="color"
        onChange={ changeColor }
      />
    </label>
  );
}
