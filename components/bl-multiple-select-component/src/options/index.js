import { useEffect, useRef, useState } from 'react';

import { Option } from './option';

export const Options = props => {
  const {
    options,
    multipleSelectValue,
    typeOfMultipleSelect,
    setMultipleSelectValue,
    onMultipleSelectValueChange,
  } = props;

  const multipleSelectRef = useRef(null);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    const viewPortHeight = window.innerHeight;
    const multipleSelectBottom = multipleSelectRef.current?.getBoundingClientRect()?.bottom;

    if (multipleSelectBottom > viewPortHeight) {
      setMargin(multipleSelectBottom - viewPortHeight);
    }
  }, [multipleSelectRef]);

  const handleMultipleSelectValue = option => {
    let newMultipleSelectValue;
    const isOptionSelected = multipleSelectValue.find(({ objectId }) => objectId === option.objectId);

    if (!isOptionSelected) {
      const selectedItems = [...multipleSelectValue, option];

      newMultipleSelectValue = typeOfMultipleSelect === 'default'
        ? options.filter(item => selectedItems.includes(item))
        : selectedItems;
    } else {
      newMultipleSelectValue = multipleSelectValue.filter(({ objectId }) => objectId !== isOptionSelected.objectId);
    }

    setMultipleSelectValue(newMultipleSelectValue);

    if (onMultipleSelectValueChange) {
      onMultipleSelectValueChange({ multipleSelectValue: newMultipleSelectValue });
    }
  };

  return (
    <div className="options" style={{ transform: `translateY(-${margin}px)` }} ref={ multipleSelectRef }>
      { options.map(option => {
        const isOptionSelected = multipleSelectValue.some(({ objectId }) => objectId === option.objectId);

        return (
          <Option
            key={ option.objectId }
            option={ option }
            isOptionSelected={ !!isOptionSelected }
            typeOfMultipleSelect={ typeOfMultipleSelect }
            handleMultipleSelectValue={ handleMultipleSelectValue }
          />
        );
      }) }
    </div>
  );
};
