import { useCallback, useEffect, useState } from 'react';

import primereact from './lib/core';

const { Knob } = primereact.knob;

const { cn } = BackendlessUI.CSSUtils;

export default function KnobComponent({ component, eventHandlers }) {
  const {
    initialValue, readOnly, disabled, maxValue, minValue, step, dial, valueTemplate, size, valueColor, rangeColor,
    display, classList, style,
  } = component;
  const { onChange } = eventHandlers;

  const [knobValue, setKnobValue] = useState(0);
  const [knobReadOnly, setKnobReadOnly] = useState(!!readOnly);
  const [knobDisabled, setKnobDisabled] = useState(!!disabled);

  useEffect(() => {
    if (maxValue < 0) {
      console.error('Maximum value must be greater than zero.');
    }
  }, [maxValue]);

  useEffect(() => {
    setKnobReadOnly(!!readOnly);
  }, [readOnly]);

  useEffect(() => {
    setKnobDisabled(!!disabled);
  }, [disabled]);

  useEffect(() => {
    if (!isNaN(initialValue)) {
      setKnobValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    setKnobValue(ensureRange(knobValue, minValue, maxValue));
  }, [knobValue, minValue, maxValue]);

  Object.assign(component, {
    setValue   : value => setKnobValue(value),
    getValue   : () => knobValue,
    setReadOnly: readOnly => setKnobReadOnly(readOnly),
    setDisabled: disabled => setKnobDisabled(disabled),
  });

  const handleChange = useCallback(e => {
    const value = parseFloat(Math.min(e.value, maxValue).toFixed(2));

    setKnobValue(value);
    onChange({ value });
  }, [maxValue]);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-Knob', classList) } style={ style }>
      <Knob
        value={ knobValue }
        readOnly={ knobReadOnly }
        disabled={ knobDisabled }
        max={ Math.max(maxValue, 0) }
        min={ minValue }
        step={ step }
        strokeWidth={ dial }
        valueTemplate={ validateTemplate(valueTemplate) }
        size={ size }
        valueColor={ valueColor }
        rangeColor={ rangeColor }
        onChange={ e => handleChange(e) }/>
    </div>
  );
}

const validateTemplate = template => {
  if (typeof template === 'string' && template.includes('{value}')) {
    return template;
  }

  console.error(`Invalid template pattern: ${ template }.`);

  return '{value}';
};

const ensureRange = (v, min, max) => Math.max(min, Math.min(v, max));
