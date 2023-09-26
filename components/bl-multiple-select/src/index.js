import { useState, useEffect, useCallback, useMemo } from 'react';

import { Options } from './options';
import { SelectField } from './select-field';
import { useOnClickOutside, validateOptions, validateValue } from './helpers';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function MultipleSelectComponent({ component, eventHandlers, elRef }) {
  const {
    display, classList, style, disabled, width, placeholder,
    selectAllCheckbox, selectAllLabel, variant, type, value, options
  } = component;
  const { onChange } = eventHandlers;

  const [optionsList, setOptionsList] = useState(validateOptions(options));
  const [isOptionsOpen, setIsOptionsOpen]= useState(false);
  const [selectValue, setSelectValue] = useState(validateValue(value, optionsList));
  const [isSelectActive, setIsSelectActive] = useState(false);

  useActions({ component, optionsList, setOptionsList, selectValue, setSelectValue });

  useEffect(() => {
    setOptionsList(validateOptions(options));
  }, [options]);

  useEffect(() => {
    setSelectValue(validateValue(value, optionsList));
  }, [value, optionsList]);

  const handleRemoveSelectedValue = useCallback((e, label) => {
    e.stopPropagation();

    setSelectValue(prevState => prevState.filter(item => item.label !== label));
  }, []);

  const handleClickOutside = useCallback(() => {
    if (isOptionsOpen) {
      setIsOptionsOpen(false);
    } else {
      setIsSelectActive(false);
    }
  }, [isOptionsOpen]);

  useOnClickOutside(elRef, handleClickOutside);

  const styles = useStyles({ style, width });
  const classes = cn(
    'bl-customComponent-multipleSelect', variant, classList,
    { 'bl-customComponent-multipleSelect--disabled': disabled }
  );

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ styles }
      className={ classes }>
      <SelectField
        type={ type }
        placeholder={ placeholder }
        selectValue={ selectValue }
        isOptionsOpen={ isOptionsOpen }
        isSelectActive={ isSelectActive }
        setIsOptionsOpen={ setIsOptionsOpen }
        setIsSelectActive={ setIsSelectActive }
        handleRemoveSelectedValue={ handleRemoveSelectedValue }
      />
      { isOptionsOpen &&
        <Options
          type={ type }
          options={ optionsList }
          selectValue={ selectValue }
          selectAllLabel={ selectAllLabel }
          selectAllCheckbox={ selectAllCheckbox }
          onChange={ onChange }
          setSelectValue={ setSelectValue }
        />
      }
    </div>
  );
};

function useActions({ component, optionsList, setOptionsList, selectValue, setSelectValue }) {
  Object.assign(component, {
    getOptions: () => optionsList,
    setOptions: options => setOptionsList(validateOptions(options)),
    getValue  : () => selectValue,
    setValue  : value => setSelectValue(validateValue(value, optionsList))
  })
};

function useStyles({ style, width }) {
  return useMemo(() => ({ ...style, width: normalizeDimensionValue(width) }), [style, width]);
}
