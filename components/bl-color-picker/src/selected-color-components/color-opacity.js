export function ColorOpacity({ colorPickerRef, alpha, opacityInputVisibility }) {
  const changeAlpha = e => {
    colorPickerRef.current.color.alpha = Math.min(1, Number(e.target.value));
  };

  if (!opacityInputVisibility) {
    return null;
  }

  return (
    <div className="color-opacity">
      <span>ALPHA:</span>
      <input
        type="number"
        min="0"
        max="1"
        step="0.01"
        className="alpha-input"
        value={ alpha }
        onChange={ changeAlpha }
      />
    </div>
  );
}
