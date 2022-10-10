import { useState, useEffect } from 'react';
import { RadioButton } from './radio-button';

const { cn } = BackendlessUI.CSSUtils;

export default function RadioButtonsListComponent({ component, eventHandlers }) {
  const { classList, style, display, disabled, options, checkedValue } = component;
  const { onChange } = eventHandlers;

  const [optionsList, setOptionsList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  component.getValue = () => selectedValue;
  component.setValue = value => { setSelectedValue(value) };
  component.getOptions = () => optionsList;
  component.setOptions = options => { setOptionsList(options) };

  useEffect(() => {
    setOptionsList(validate(options));
    setSelectedValue(checkedValue);
  }, [options, checkedValue]);

  const handleChange = value => {
    const newSelectedValue = optionsList.find(item => item.value === value);

    setSelectedValue(value);

    if (onChange) {
      onChange({ value: newSelectedValue });
    }
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-radioButtonsList", classList, { disabled }) } style={ style }>
      { optionsList.map(({ label, value }) => (
        <RadioButton
          key={ value }
          isChecked={ value === selectedValue }
          label={ label }
          value={ value }
          handleChange={ handleChange }
        />
      )) }
    </div>
  );
}

const validate = arr => {
  if (!arr || !Array.isArray(arr)) {
    return [];
  }

  return arr;
};
