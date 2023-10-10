import { useRef, useState } from 'react';

import { useOptionsPlacement } from '../helpers';
import { GroupedOptions } from './grouped-options';
import { Option } from './option';

const { cn } = BackendlessUI.CSSUtils;

export function Options(props) {
  const {
    hasGroup, optionsList, emptyOptionsLabel, autocompleteHeight,
    setInputValue, setAutocompleteValue, setIsOptionsOpen, onChange,
  } = props;

  const optionsContainerRef = useRef(null);
  const [optionsPlacement, setOptionsPlacement] = useState('bottom');

  useOptionsPlacement({ optionsContainerRef, autocompleteHeight, setOptionsPlacement });

  if (!optionsList.length) {
    return (
      <div className="options" ref={ optionsContainerRef }>
        <div className="option">
          { emptyOptionsLabel }
        </div>
      </div>
    );
  }

  const OptionComponent = hasGroup ? GroupedOptions : Option;

  return (
    <div
      ref={ optionsContainerRef }
      className={ cn('options', { ['options__placement-top']: optionsPlacement === 'top' }) }>
      { optionsList.map(item => (
        <OptionComponent
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
}
