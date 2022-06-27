import { useCallback } from 'react';

export function ChangeColorButton({ signaturePadRef, component, eventHandlers }) {
  const { penColor, changeColorButtonLabel } = component;
  const { onChangeColor } = eventHandlers;

  const changeColor = useCallback(e => {
    const color = e.target.value;

    signaturePadRef.current.penColor = color;

    if (onChangeColor) {
      onChangeColor({ color });
    }
  }, [onChangeColor, signaturePadRef]);
  
  if (!!penColor) {
    return null;
  }

  return (
    <label className="change-color-button">
      { changeColorButtonLabel }
      <input type="color" onChange={ changeColor }/>
    </label>
  );
}
