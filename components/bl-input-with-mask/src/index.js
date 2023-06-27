import { useEffect, useMemo, useState } from 'react';

import { Fieldset } from './fieldset';
import { Input } from './input';
import { Placeholder } from './placeholder';
import useIMask from './react-imask';

const { cn } = BackendlessUI.CSSUtils;

const MaskTypes = {
  NUMBER: 'Number',
  STRING: 'String',
  REGEX : 'RegExp',
};

export default function InputWithMask({ component, eventHandlers, elRef }) {
  const { style, display, classList, maskType, mask, placeholder, placeholderChar, lazy } = component;
  const { onChangeValue, onValidate, onComplete } = eventHandlers;

  const [isFocused, setIsFocused] = useState(false);

  const options = {
    mask           : usePreparedMask(maskType, mask),
    placeholderChar: placeholderChar || '_',
    lazy,
    prepare        : (value, mask) => {
      const result = onValidate({ value, mask });

      return result === undefined ? value : result;
    },
  };
  const { ref, value } = useIMask(options, { onComplete: (value, mask) => onComplete({ value, mask }) });

  useEffect(() => {
    onChangeValue({ value });
  }, [value]);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      className={ cn('bl-customComponent-input-with-mask', 'bl-customComponent-input-with-mask--filled', classList) }
      style={ style }>
      <div className="input-with-mask">
        <Placeholder
          value={ value }
          isFocused={ isFocused }
          placeholder={ placeholder }
          htmlFor="input_field"
        />

        <div className="input-with-mask__text-field">
          <Input
            ref={ ref }
            htmlFor="input_field"
            eventHandlers={ eventHandlers }
            setIsFocused={ setIsFocused }
          />
          <Fieldset
            placeholder={ placeholder }
            value={ value }
            isFocused={ isFocused }
          />
        </div>
      </div>
    </div>
  );
}

const usePreparedMask = (maskType, mask) => useMemo(() => {
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
