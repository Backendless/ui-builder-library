import { useEffect } from 'react';
import { useIMask } from './lib/react-imask.min';

const { cn } = BackendlessUI.CSSUtils;

export default function InputWithMask({ component, eventHandlers }) {
  const { style, display, classList, maskType, mask, placeholder, placeholderChar, lazy } = component;
  const { onChangeValue, onValidate } = eventHandlers;

  const options = {
    mask    : preparedMask(maskType, mask),
    placeholderChar,
    lazy,
    validate: (value, mask) => onValidate({ value, mask })
  };
  const { ref, value } = useIMask(options);

  useEffect(() => {
    onChangeValue({ value });
  }, [value]);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-inputWithMask', 'form-input', classList) } style={style}>
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

const preparedMask = (maskType, mask) => {
  if ((maskType === 'String' || maskType === 'Number') && mask) {
    return mask;
  }

  if (maskType === 'RegExp') {
    return new RegExp(mask);
  }

  return eval(maskType);
};
