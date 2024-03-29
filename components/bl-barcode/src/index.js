import { useCallback, useEffect, useMemo, useRef } from 'react';

import './lib/barcode.min';

const { cn } = BackendlessUI.CSSUtils;

const FontOptions = {
  UNSET      : 'unset',
  BOLD       : 'bold',
  ITALIC     : 'italic',
  BOLD_ITALIC: 'boldItalic',
};

const FontOptionsMap = {
  [FontOptions.UNSET]      : '',
  [FontOptions.BOLD]       : 'bold',
  [FontOptions.ITALIC]     : 'italic',
  [FontOptions.BOLD_ITALIC]: 'bold italic',
};

export default function BarcodeComponent({ component, eventHandlers, elRef }) {
  const { classList, display, style, value } = component;
  const { onClick, onMouseOver, onMouseOut } = eventHandlers;

  const barcodeRef = useRef(null);

  useBarcodeLibrary(component, barcodeRef);

  component.setValue = value => component.value = value;

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-barcode', classList) } style={ style }>
      { value && (
        <svg
          ref={ barcodeRef }
          onClick={ event => onClick({ event }) }
          onMouseOver={ event => onMouseOver({ event }) }
          onMouseOut={ event => onMouseOut({ event }) }
        />
      ) }
    </div>
  );
}

function useBarcodeLibrary(component, barcodeRef) {
  const {
    format, value, lineColor, background, valueVisibility, barWidth, height, margin,
    font, fontSize, fontOptions, label, labelAlign, labelPosition, labelMargin, display,
  } = component;

  const options = useMemo(() => ({
    width       : barWidth,
    text        : label,
    textAlign   : labelAlign,
    textPosition: valueVisibility && labelPosition,
    textMargin  : labelMargin,
    displayValue: valueVisibility,
    fontOptions : FontOptionsMap[fontOptions],
    format, lineColor, background, margin, font, fontSize, height,
  }), [
    background, barWidth, valueVisibility, font, fontOptions, fontSize, format,
    height, lineColor, margin, label, labelAlign, labelMargin, labelPosition,
  ]);

  const onValidate = useCallback(valid => {
    if (!valid) {
      console.error(`"${ value }" is not a valid value for the ${ format } barcode format.`);
    }
  }, [value, format]);

  useEffect(() => {
    if (!barcodeRef.current) {
      return;
    }

    window.JsBarcode(barcodeRef.current, value, { ...options, valid: onValidate });
  }, [value, options, display]);
}
