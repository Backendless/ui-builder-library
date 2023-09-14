import { useEffect, useMemo, useState } from 'react';

import { customParseFormat, dayjs } from './day.min';
import { IMask, useIMask } from './react-imask';
import { Fieldset, Input, Placeholder } from './subcomponent';

const { cn } = BackendlessUI.CSSUtils;

const MaskTypes = {
  Number,
  String,
  RegExp: 'RegExp',
  Enum  : IMask.MaskedEnum,
  Range : IMask.MaskedRange,
  Date,
};

const OverwriteMap = {
  no   : false,
  yes  : true,
  shift: 'shift',
};

const EagerMap = {
  no    : false,
  yes   : true,
  append: 'append',
  remove: 'remove',
};

const AutofixMap = {
  no : false,
  yes: true,
  pad: 'pad',
};

export default function InputWithMask({ component, eventHandlers, elRef }) {
  const {
    style, display, classList, initValue, variant, placeholder, dynamicMask, maskType, mask, blocks, min, max,
    from, to, thousandsSeparator, padFractionalZeros, normalizeZeros, radix, mapToRadix, definitions, scaleNumber,
    overwrite, displayChar, placeholderChar, autofix, skipInvalid, lazy, eager, dateFormat, maskEnum,
  } = component;
  const { onChangeValue, onValidate, onComplete } = eventHandlers;

  const [isFocused, setIsFocused] = useState(false);

  const options = useMemo(() => ({
    ...prepareOptions({
      dynamicMask, maskType, mask, blocks, min, max, from, to, thousandsSeparator, padFractionalZeros, normalizeZeros,
      radix, mapToRadix, definitions, scaleNumber, overwrite, displayChar, placeholderChar, autofix, skipInvalid, lazy,
      eager, dateFormat, maskEnum,
    }),
    prepare: (value, mask) => {
      const result = onValidate({ value, mask });

      return result === undefined ? value : result;
    },
  }), [dynamicMask, maskType, mask, blocks, min, max, from, to, thousandsSeparator, padFractionalZeros, normalizeZeros,
    radix, mapToRadix, definitions, scaleNumber, overwrite, displayChar, placeholderChar, autofix, skipInvalid, lazy,
    eager, dateFormat, maskEnum]);

  const {
    ref: inputRef, value, setUnmaskedValue, unmaskedValue,
  } = useIMask(options, { onComplete: (value, mask) => onComplete({ value, mask }) });

  useEffect(() => setUnmaskedValue(initValue || ''), [initValue]);
  useEffect(() => onChangeValue({ value, unmaskedValue }), [value, unmaskedValue]);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      className={ cn(
        'bl-customComponent-input-with-mask',
        `bl-customComponent-input-with-mask--${ variant }`,
        classList
      ) }
      style={ style }>
      <div className={ cn('input-with-mask', { 'input-with-mask--focused': isFocused || value }) }>
        <Placeholder
          value={ value }
          isFocused={ isFocused }
          placeholder={ placeholder }
          htmlFor="input_field"
        />

        <div className={ cn('input-with-mask__text-field', { 'input-with-mask__text-field--focused': isFocused }) }>
          <Input
            inputRef={ inputRef }
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

const prepareDynamicMask = dynamicMask => dynamicMask.map(mask => prepareOptions(mask));

const prepareMask = (maskType, mask) => {
  if (maskType === MaskTypes.RegExp) {
    try {
      return new RegExp(mask);
    } catch (err) {
      console.error(err);
    }
  }

  return mask || MaskTypes[maskType];
};

const prepareBlocks = blocks => {
  const preparedBlocks = {};

  blocks.forEach(item => {
    preparedBlocks[item.name] = prepareOptions(item.block);
  });

  return preparedBlocks;
};

const prepareOptions = settings => {
  const {
    dynamicMask, maskType, mask, blocks, min, max, from, to, thousandsSeparator, padFractionalZeros, normalizeZeros,
    radix, mapToRadix, definitions, scaleNumber, overwrite, displayChar, placeholderChar, autofix, skipInvalid, lazy,
    eager, dateFormat, maskEnum,
  } = settings;

  const options = {
    mask              : dynamicMask ? prepareDynamicMask(dynamicMask) : prepareMask(maskType, mask),
    min               : Number(min),
    max               : Number(max),
    from,
    to,
    thousandsSeparator: thousandsSeparator || '',
    padFractionalZeros: !!padFractionalZeros,
    normalizeZeros    : !!normalizeZeros,
    scale             : scaleNumber || 2,
    overwrite         : OverwriteMap[overwrite],
    displayChar       : displayChar || '',
    placeholderChar   : placeholderChar || '_',
    autofix           : AutofixMap[autofix],
    skipInvalid       : !!skipInvalid,
    lazy              : !!lazy,
    eager             : EagerMap[eager],
    definitions       : definitions || {},
    mapToRadix        : mapToRadix ? mapToRadix.split('') : [],
    ...(!!radix && { radix }),
    ...(!!blocks && { blocks: prepareBlocks(blocks) }),
    ...(maskType === 'Enum' && !!maskEnum && { enum: maskEnum.split(',').map(item => item.trim()) }),
  };

  if (maskType === 'Date') {
    dayjs.extend(customParseFormat);

    Object.assign(options, {
      pattern: dateFormat,
      format : date => dayjs(date).format(dateFormat),
      parse  : str => dayjs(str, dateFormat),
      min    : min && new Date(min),
      max    : max && new Date(max),
    });
  }

  return options;
};
