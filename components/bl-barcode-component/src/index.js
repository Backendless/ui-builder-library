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
  const { classList, display, style } = component;
  const { onClick, onMouseOver, onMouseOut } = eventHandlers;

  const barcodeRef = useRef(null);

  useBarcodeLibrary(component, barcodeRef);

  const styles = {
    display: !display && 'none',
    ...style,
  };

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-barcode', classList) } style={ styles }>
      <img
        ref={ barcodeRef }
        onClick={ event => onClick({ event }) }
        onMouseOver={ event => onMouseOver({ event }) }
        onMouseOut={ event => onMouseOut({ event }) }
      />
    </div>
  );
}

function useBarcodeLibrary(component, barcodeRef) {
  const {
    format, value, lineColor, background, valueVisibility, barWidth, height, margin,
    font, fontSize, fontOptions, label, labelAlign, labelPosition, labelMargin,
  } = component;

  const options = useMemo(() => ({
    width       : barWidth,
    text        : label,
    textAlign   : labelAlign,
    textPosition: labelPosition,
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
    if (value) {
      JsBarcode(barcodeRef.current, value, { ...options, valid: onValidate });
    } else {
      barcodeRef.current.removeAttribute('src');
    }
  }, [value]);
}
