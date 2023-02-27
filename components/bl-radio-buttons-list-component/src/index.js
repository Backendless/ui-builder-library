import { useState, useEffect, useMemo } from 'react';

import { RadioButton } from './components';

const { cn } = BackendlessUI.CSSUtils;

export default function RadioButtonsListComponent({ component, eventHandlers, elRef }) {
  const { classList, style, display, disabled, options, value } = component;
  const { onChange } = eventHandlers;

  const [optionsList, setOptionsList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const classes = useMemo(() => (
    cn(
      "bl-customComponent-radioButtonsList", classList,
      { "bl-customComponent-radioButtonsList--disabled": disabled }
    )
  ), [classList, disabled]);

  component.getValue = () => selectedValue;
  component.setValue = value => setSelectedValue(value);
  component.getOptions = () => optionsList;
  component.setOptions = options => setOptionsList(validate(options));

  useEffect(() => {
    setOptionsList(validate(options));
    setSelectedValue(value);
  }, [options, value]);

  const handleChange = value => {
    setSelectedValue(value);
    onChange({ value });
  };

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ style }
      className={ classes }>
      { optionsList.map(({ label, value, disabled }) => (
        <RadioButton
          key={ value }
          checked={ value === selectedValue }
          label={ label }
          value={ value }
          disabled={ disabled || false }
          handleChange={ handleChange }
        />
      )) }
    </div>
  );
}

const validate = arr => Array.isArray(arr) ? arr : [];
