import { useState, useEffect, useRef, useMemo } from 'react';

import { Option } from './option';

export function Options({ type, options, selectValue, setSelectValue, onChange }) {
  const selectRef = useRef(null);
  const [margin, setMargin] = useState(0);
  
  useEffect(() => {
    const viewPortHeight = window.innerHeight;
    const selectBottom = selectRef.current?.getBoundingClientRect()?.bottom;
    
    if (selectBottom > viewPortHeight) {
      setMargin(selectBottom - viewPortHeight);
    }
  }, [])
  
  const handleSelectValue = option => {
    let newSelectValue;
    const isOptionSelected = selectValue.find(({ objectId }) => objectId === option.objectId);

    if (isOptionSelected) {
      newSelectValue = selectValue.filter(({ objectId }) => objectId !== isOptionSelected.objectId);
    } else {
      const selectedItems = [...selectValue, option];
      
      newSelectValue = type === 'default'
        ? options.filter(item => selectedItems.includes(item))
        : selectedItems;
    }
    
    setSelectValue(newSelectValue);
    
    if (onChange) {
      onChange({ selectValue: newSelectValue });
    }
  };
  
  const selectedValuesMap = useMemo(() => {
    return selectValue.reduce((m, { objectId }) => ({...m, [objectId]: 1 }), {});
  }, [selectValue]);

  return (
    <div style={{ transform: `translateY(-${ margin }px)` }} className="options" ref={ selectRef }>
      { options.map(option => (
        <Option
          key={ option.objectId }
          type={ type }
          option={ option }
          isOptionSelected={ selectedValuesMap[option.objectId] }
          handleSelectValue={ handleSelectValue }
        />
      )) }
    </div>
  );
};
