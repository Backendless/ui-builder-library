import { useState, useRef, useEffect } from 'react';

import { Option } from './option';

export function Options(props) {
  const {
    type,
    options,
    selectValue,
    setSelectValue,
    onSelectValueChange,
  } = props;

  const selectRef = useRef(null);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    const viewPortHeight = window.innerHeight;
    const selectBottom = selectRef.current?.getBoundingClientRect()?.bottom;

    if (selectBottom > viewPortHeight) {
      setMargin(selectBottom - viewPortHeight);
    }
  }, [selectRef])

  const handleSelectValue = option => {
    let newSelectValue;
    const isOptionSelected = selectValue.find(({ objectId }) => objectId === option.objectId);

    if (!isOptionSelected) {
      const selectedItems = [...selectValue, option];

      newSelectValue = type === 'default'
        ? options.filter(item => selectedItems.includes(item))
        : selectedItems;
    } else {
      newSelectValue = selectValue.filter(({ objectId }) => objectId !== isOptionSelected.objectId);
    }

    setSelectValue(newSelectValue);

    if (onSelectValueChange) {
      onSelectValueChange({ selectValue: newSelectValue });
    }
  };

  return (
    <div className="options" style={{ transform: `translateY(-${ margin }px)` }} ref={ selectRef }>
      { options.map(option => {
        const isOptionSelected = selectValue.find(({ objectId }) => objectId === option.objectId);

        return (
          <Option
            key={ option.objectId }
            type={ type }
            option={ option }
            isOptionSelected={ !!isOptionSelected }
            handleSelectValue={ handleSelectValue }
          />
        );
      }) }
    </div>
  );
};
