import { useEffect, useMemo, useState } from 'react';

import moment from './moment.min';
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
    style, display, classList, maskType, mask, definitions, displayChar, placeholder, placeholderChar, lazy, variant,
    blocks, scaleNumber, initValue, min, max, thousandsSeparator, padFractionalZeros, normalizeZeros, radix, overwrite,
    maskEnum, eager, autofix, from, to, skipInvalid, mapToRadix, customOptions, dynamicMask, dateFormat,
  } = component;

  const { onChangeValue, onValidate, onComplete } = eventHandlers;

  const [isFocused, setIsFocused] = useState(false);

  const options = useMemo(() => {
    const options = {
      mask              : dynamicMask ? preparedDynamicMask(dynamicMask) : preparedMask(maskType, mask),
      blocks            : blocks && prepareBlocks(blocks),
      min               : Number(min),
      max               : Number(max),
      from,
      to,
      thousandsSeparator: thousandsSeparator || '',
      padFractionalZeros,
      normalizeZeros,
      radix             : radix || '',
      mapToRadix        : mapToRadix && mapToRadix.split(''),
      definitions,
      scale             : scaleNumber,
      overwrite         : OverwriteMap[overwrite],
      displayChar       : displayChar || '',
      placeholderChar   : placeholderChar || '_',
      autofix           : AutofixMap[autofix],
      skipInvalid,
      lazy,
      eager             : EagerMap[eager],
      prepare           : (value, mask) => {
        const result = onValidate({ value, mask });

        return result === undefined ? value : result;
      },
    };

    if (maskType === 'Enum') {
      Object.assign(options, {
        enum: maskEnum && maskEnum.split(',').map(item => item.trim()),
      });
    }

    if (maskType === 'Date') {
      Object.assign(options, {
        pattern: dateFormat,
        format : date => moment(date).format(dateFormat),
        parse  : str => moment(str, dateFormat),
        min    : min && new Date(min),
        max    : max && new Date(max),
      });
    }

    return options;
  }, [autofix, blocks, dateFormat, definitions, displayChar, dynamicMask, eager, from, lazy, mapToRadix, mask,
    maskEnum, maskType, max, min, normalizeZeros, onValidate, overwrite, padFractionalZeros, placeholderChar,
    radix, scaleNumber, skipInvalid, thousandsSeparator, to]);

  const {
    ref: inputRef, value, setUnmaskedValue, unmaskedValue,
  } = useIMask(customOptions || options, { onComplete: (value, mask) => onComplete({ value, mask }) });

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

const preparedDynamicMask = dynamicMask => dynamicMask.map(mask => {
  const options = {
    ...mask,
    mask      : preparedMask(mask.maskType, mask.mask),
    blocks    : mask.blocks && prepareBlocks(mask.blocks),
    eager     : EagerMap[mask?.eager],
    mapToRadix: mask.mapToRadix && mask.mapToRadix.split(''),
    overwrite : OverwriteMap[mask?.overwrite],
    autofix   : AutofixMap[mask?.autofix],
  };

  if (mask.maskType === 'Enum') {
    Object.assign(options, {
      enum: mask.maskEnum && mask.maskEnum.split(',').map(item => item.trim()),
    });
  }

  if (mask.maskType === 'Date') {
    Object.assign(options, {
      pattern: mask.dateFormat,
      format : date => moment(date).format(mask.dateFormat),
      parse  : str => moment(str, mask.dateFormat),
      min    : mask.min && new Date(mask.min),
      max    : mask.max && new Date(mask.max),
    });
  }

  return options;
});

const preparedMask = (maskType, mask) => {
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
    preparedBlocks[item.name] = { ...item.block, mask: preparedMask(item.block.maskType, item.block.mask) };
  });

  return preparedBlocks;
};

