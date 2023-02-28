import { useEffect, useMemo } from 'react';
import useIMask from './react-imask';

const { cn } = BackendlessUI.CSSUtils;

const MaskTypes = {
  NUMBER: 'Number',
  STRING: 'String',
  REGEX : 'RegExp'
};

export default function InputWithMask({ component, eventHandlers, elRef }) {
  const { style, display, classList, maskType, mask, placeholder, placeholderChar, lazy } = component;
  const { onChangeValue, onValidate } = eventHandlers;

  const options = {
    mask   : preparedMask(maskType, mask),
    placeholderChar,
    lazy,
    prepare: (value, mask) => {
      const result = onValidate({ value, mask });

      return result === undefined ? value : result;
    }
  };
  const { ref, value } = useIMask(options);

  useEffect(() => {
    onChangeValue({ value });
  }, [value]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-inputWithMask', 'form-input', classList) } style={ style }>
      <input
        type="text"
        ref={ ref }
        id="input-with-mask"
        placeholder={ placeholder }
        className="form-input__input"
      />
      { placeholder && (
        <label htmlFor="input-with-mask" className="form-input__placeholder">{ placeholder }</label>
      ) }
    </div>
  );
}

const preparedMask = (maskType, mask) => useMemo(() => {
  if ((maskType === MaskTypes.STRING || maskType === MaskTypes.NUMBER) && mask) {
    return mask;
  }

  if (maskType === MaskTypes.REGEX) {
    try {
      return new RegExp(mask);
    } catch (err) {
      console.error(err);
    }
  }

  return eval(maskType);
}, [mask, maskType]);
