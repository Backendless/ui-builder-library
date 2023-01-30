import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!isNaN(initialValue)) {
      setKnobValue(initialValue);
    }
  }, [initialValue]);

  Object.assign(component, {
    setValue   : value => setKnobValue(value),
    setReadOnly: readOnly => setKnobReadOnly(readOnly),
    setDisabled: disabled => setKnobDisabled(disabled),
  });

  const handleChange = e => {
    const value = Math.min(e.value, maxValue);

    setKnobValue(value);
    onChange({ value });
  };

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
        valueTemplate={ valueTemplate }
        size={ size }
        valueColor={ valueColor }
        rangeColor={ rangeColor }
        onChange={ e => handleChange(e) }/>
    </div>
  );
}
