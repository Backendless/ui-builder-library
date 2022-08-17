import { useRef, useState } from 'react';

import { Option } from './option';

import { generateId } from '../helpers';
import { useOptionsPlacement } from '../helpers';

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

  useOptionsPlacement({ optionsRef, autocompleteHeight, setOptionsPlacement });

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
    <div ref={ optionsRef } className={ cn('options', { ['options__placement-top']: optionsPlacement === 'top' }) }>
      { optionList.map(item => {
        const optionId = useMemo(() => generateId(), []);

        return (
          <Option
            key={ optionId }
            item={ item }
            setInputValue={ setInputValue }
            setIsOptionsOpen={ setIsOptionsOpen }
            setAutocompleteValue={ setAutocompleteValue }
            onAutocompleteChange={ onAutocompleteChange }
          />
        );
      }) }
    </div>
  );
};
