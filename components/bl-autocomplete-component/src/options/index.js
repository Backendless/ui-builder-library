import { useRef, useState } from 'react';

import { useOptionsPlacement } from '../helpers';
import { Option } from './option';

export const Options = props => {
  const {
    optionsList,
    autocompleteHeight,
    setInputValue,
    setAutocompleteValue,
    setIsOptionsOpen,
    onAutocompleteChange,
  } = props;
  const optionsRef = useRef();
  const [optionsPlacement, setOptionsPlacement] = useState('bottom');
  
  const useOptionsPlacementProps = {
    optionsRef,
    autocompleteHeight,
    setOptionsPlacement,
  };
  
  useOptionsPlacement(useOptionsPlacementProps);
  const optionsStyle = getOptionsStyle(optionsPlacement);

  return (
    <div
      ref={ optionsRef }
      style={ optionsStyle }
      className="options">
      {optionsList.length ? (
        optionsList.map(item => (
          <Option
            key={ item.label }
            item={ item }
            setInputValue={ setInputValue }
            setIsOptionsOpen={ setIsOptionsOpen }
            setAutocompleteValue={ setAutocompleteValue }
            onAutocompleteChange={ onAutocompleteChange }
          />
        ))
      ) : (
        <div className="option">
          No options
        </div>
      )}
    </div>
  );
};

const getOptionsStyle = optionsPlacement => {
  const margin = optionsPlacement === 'top' ? 'marginBottom' : 'marginTop';
  
  return {
    inset: optionsPlacement === 'top'
      ? 'auto auto 0 0'
      : '0 auto auto 0',
    [margin]: '55px',
  };
};
