import { useRef, useState } from 'react';

import { useOptionsPlacement } from '../helpers';
import { Option } from './option';

const { cn } = BackendlessUI.CSSUtils;

export const Options = props => {
  const {
    optionList,
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
  
  if(!optionList.length) {
    return (
      <div className="options">
        <div className="option">
          No options
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ optionsRef }
      className={ cn('options', { ['options__placement-top']: optionsPlacement === 'top' }) }>
      { optionList.map(item => (
        <Option
          key={ item.label }
          item={ item }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
          onAutocompleteChange={ onAutocompleteChange }
        />
      )) }
    </div>
  );
};
