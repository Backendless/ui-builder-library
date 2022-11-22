import { useState, useRef } from 'react';

import { Option } from './option';

import { useOptionsPlacement } from '../helpers';

const { cn } = BackendlessUI.CSSUtils;

export function Options(props) {
  const {
    optionList, emptyOptionsLabel, autocompleteHeight, setInputValue, setAutocompleteValue, setIsOptionsOpen, onChange
  } = props;

  const optionsContainerRef = useRef(null);
  const [optionsPlacement, setOptionsPlacement] = useState('bottom');

  useOptionsPlacement({ optionsContainerRef, autocompleteHeight, setOptionsPlacement });

  if(!optionList.length) {
    return (
      <div className="options" ref={ optionsContainerRef }>
        <div className="option">
          { emptyOptionsLabel }
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ optionsContainerRef }
      className={ cn('options', { ['options__placement-top']: optionsPlacement === 'top' }) }>
      { optionList.map(item => (
        <Option
          key={ item.value }
          item={ item }
          setInputValue={ setInputValue }
          setIsOptionsOpen={ setIsOptionsOpen }
          setAutocompleteValue={ setAutocompleteValue }
          onChange={ onChange }
        />
      )) }
    </div>
  );
};
