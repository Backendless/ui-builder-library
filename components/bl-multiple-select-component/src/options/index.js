import { useState, useEffect, useRef, useMemo } from 'react';

import { Option } from './option';
import { SelectAllCheckbox } from './select-all-checkbox';

export function Options(props) {
  const { type, options, selectValue, selectAllCheckbox, selectAllLabel, setSelectValue, onChange } = props;
  const selectRef = useRef(null);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    const viewPortHeight = window.innerHeight;
    const selectBottom = selectRef.current?.getBoundingClientRect()?.bottom;

    if (selectBottom > viewPortHeight) {
      setMargin(selectBottom - viewPortHeight);
    }
  }, []);

  const selectedValuesMap = useMemo(() => {
    return selectValue.reduce((m, { objectId }) => ({ ...m, [objectId]: 1 }), {});
  }, [selectValue]);

  const isAllOptionsSelected = useMemo(() => options.length === Object.keys(selectedValuesMap).length, [selectedValuesMap]);

  const handleSelectAll = () => {
    const newSelectValue = isAllOptionsSelected ? [] : options;

    setSelectValue(newSelectValue);
    onChange({ selectValue: newSelectValue });
  };

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
    onChange({ selectValue: newSelectValue });
  };

  return (
    <div style={{ transform: `translateY(-${ margin }px)` }} className="options" ref={ selectRef }>
      { selectAllCheckbox &&
        <SelectAllCheckbox
          label={ selectAllLabel }
          isAllOptionsSelected={ isAllOptionsSelected }
          handleSelectAll={ handleSelectAll }
        />
      }
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
