import { useState, useEffect, useRef, useCallback } from 'react';

import { Options } from './options';
import { SelectField } from './select-field';
import { useOnClickOutside, validate } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function MultipleSelectComponent({ component, eventHandlers }) {
  const { display, classList, disable, options, placeholder, variant, type } = component;
  const { onSelectValueChange } = eventHandlers;

  const rootRef = useRef(null);
  const [optionsList, setOptionsList] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [selectValue, setSelectValue] = useState([]);
  const [isSelectActive, setIsSelectActive] = useState(false);

  useEffect(() => {
    setOptionsList(validate(options));
  }, [options])

  const handleClickOutside = useCallback(() => {
    if (!isOptionsOpen) {
      setIsSelectActive(false);
    } else {
      setIsOptionsOpen(false);
    }
  }, [isOptionsOpen]);

  useOnClickOutside(rootRef, handleClickOutside);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ rootRef }
      className={ cn('bl-customComponent-multipleSelect', variant, ...classList, { disable }) }>
      <SelectField
        type={ type }
        placeholder={ placeholder }
        selectValue={ selectValue }
        isOptionsOpen={ isOptionsOpen }
        isSelectActive={ isSelectActive }
        setIsOptionsOpen={ setIsOptionsOpen }
        setIsSelectActive={ setIsSelectActive }
      />
      { isOptionsOpen &&
        <Options
          type={ type }
          options={ optionsList }
          selectValue={ selectValue }
          onSelectValueChange={ onSelectValueChange }
          setSelectValue={ setSelectValue }
        />
      }
    </div>
  );
};
