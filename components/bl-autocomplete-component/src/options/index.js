import { useRef, useState } from 'react';

import { useOptionsPlacement } from '../helpers';
import { Option } from './option';

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

  const optionsClasses = () => {
    const classes = ['options'];

    if (optionsPlacement === 'top') {
      classes.push('options__placement-top');
    }

    return classes.join(' ');
  };

  return (
    <div
      ref={ optionsRef }
      className={ optionsClasses() }>
      { optionList.length ? (
        optionList.map(item => (
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
      ) }
    </div>
  );
};
