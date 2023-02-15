import { useEffect, useState, useCallback } from 'react';

import primereact from './lib/core';

const { Knob } = primereact.knob;

const { cn } = BackendlessUI.CSSUtils;

export default function KnobComponent({ component, eventHandlers }) {
  const {
    initialValue, readOnly, disabled, maxValue, minValue, step, dial, valueTemplate, size, valueColor, rangeColor,
    display, classList, setValue, setReadOnly, setDisabled, style
  } = component;
  const { onChange } = eventHandlers;

  const [knobValue, setKnobValue] = useState(0);
  const [knobReadOnly, setKnobReadOnly] = useState(!!readOnly);
  const [knobDisabled, setKnobDisabled] = useState(!!disabled);
  const [template, setTemplate] = useState('{value}');

  useEffect(() => {
    setKnobReadOnly(!!readOnly);
  }, [readOnly]);

  useEffect(() => {
    setKnobDisabled(!!readOnly);
  }, [disabled]);

  useEffect(() => {
    if (!isNaN(initialValue)) {
      setKnobValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    setTemplate(templateHandler(valueTemplate));
  }, [valueTemplate]);

  Object.assign(component, {
    setValue   : value => setKnobValue(value),
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
        max={ maxValue }
        min={ minValue }
        step={ step }
        strokeWidth={ dial }
        valueTemplate={ template }
        size={ size }
        valueColor={ valueColor }
        rangeColor={ rangeColor }
        onChange={ e => handleChange(e) }/>
    </div>
  );
}

const templateHandler = template => {
  if (typeof template == 'string') {
    if (template.includes('{value}')) {
      return template;
    }
  }

  console.error('Wrong template pattern!');

  return '{value}';
};
