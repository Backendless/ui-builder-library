import { useState, useEffect, useRef, useCallback } from 'react';

import { Options } from './options';
import { MultipleSelectField } from './multiple-select-field';
import { useOnClickOutside, useMultipleSelectClassList, validate } from './helpers';

export default function MultipleSelectComponent({ component, eventHandlers }) {
  const { display, classList, disable, options, placeholder, variant, typeOfMultipleSelect } = component;
  const { onMultipleSelectValueChange } = eventHandlers;

  const rootRef = useRef(null);
  const classes = useMultipleSelectClassList({ disable, variant, classList });
  const [optionsList, setOptionsList] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);
  const [isMultipleSelectActive, setIsMultipleSelectActive] = useState(false);

  useEffect(() => {
    setOptionsList(validate(options));
  }, [options])

  const handleClickOutside = useCallback(() => {
    if (!isOptionsOpen) {
      setIsMultipleSelectActive(false);
    } else {
      setIsOptionsOpen(false);
    }
  }, [isOptionsOpen]);

  useOnClickOutside(rootRef, handleClickOutside);

  if (!display) {
    return null;
  }

  return (
    <div ref={ rootRef } className={ classes }>
      <MultipleSelectField
        placeholder={ placeholder }
        isOptionsOpen={ isOptionsOpen }
        multipleSelectValue={ multipleSelectValue }
        typeOfMultipleSelect={ typeOfMultipleSelect }
        isMultipleSelectActive={ isMultipleSelectActive }
        setIsOptionsOpen={ setIsOptionsOpen }
        setIsMultipleSelectActive={ setIsMultipleSelectActive }
      />
      { isOptionsOpen &&
        <Options
          options={ optionsList }
          multipleSelectValue={ multipleSelectValue }
          typeOfMultipleSelect={ typeOfMultipleSelect }
          setMultipleSelectValue={ setMultipleSelectValue }
          onMultipleSelectValueChange={ onMultipleSelectValueChange }
        />
      }
    </div>
  );
};
