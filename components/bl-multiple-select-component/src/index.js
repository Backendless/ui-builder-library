import { useCallback, useEffect, useRef, useState } from 'react';

import { useMultipleSelectClassList, useOnClickOutside, validate } from './helpers';
import { MultipleSelectField } from './multiple-select-field';
import { Options } from './options';

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

    if (isOptionsOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [options, isOptionsOpen]);

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
    <div
      ref={ rootRef }
      className={ classes }>
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
}
