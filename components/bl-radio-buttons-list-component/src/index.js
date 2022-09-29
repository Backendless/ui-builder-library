import { useState, useEffect } from 'react';
import { RadioButton } from './radio-button';

const { cn } = BackendlessUI.CSSUtils;

export default function RadioButtonsListComponent({ component, eventHandlers }) {
  const { classList, style, display, disabled, buttonsList } = component;
  const { onChange } = eventHandlers;

  const [radioButtons, setRadioButtons] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  
  useEffect(() => {
    setRadioButtons(validate(buttonsList));
  }, [buttonsList])
  
  const handleChange = objectId => {
    const newSelectedValue = radioButtons.find(item => item.objectId === objectId);
    
    setSelectedValue(newSelectedValue);
    
    if (onChange) {
      onChange({ value: newSelectedValue });
    }
  }
  
  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-radioButtonsList", classList, { disabled }) } style={ style }>
      { radioButtons.map(({ objectId, label, value }) => (
        <RadioButton
          key={ objectId }
          id={ objectId }
          isSelected={ value === selectedValue?.value }
          label={ label }
          value={ value }
          handleChange={ handleChange }
        />
      )) }
    </div>
  );
}

const validate = arr => {
  if(!arr) {
    return [];
  }
  
  if (!arr[0].hasOwnProperty('objectId')) {
    return arr.map(item => ({
      ...item,
      objectId: BackendlessUI.UUID.short(),
    }));
  }
  
  return arr;
}
