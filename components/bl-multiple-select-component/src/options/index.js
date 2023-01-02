import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { Option } from './option';
import { SelectAllCheckbox } from './select-all-checkbox';

const DEFAULT = 'default';

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
    return selectValue.reduce((m, { value }) => ({ ...m, [value]: 1 }), {});
  }, [selectValue]);

  const isAllOptionsSelected = useMemo(() => options.length === Object.keys(selectedValuesMap).length, [selectedValuesMap]);

  const handleSelectValue = useCallback((option) => {
    let newSelectValue;
    const isOptionSelected = selectValue.find(({ value }) => value === option.value);

    if (isOptionSelected) {
      newSelectValue = selectValue.filter(({ value }) => value !== isOptionSelected.value);
    } else {
      const selectedItems = [...selectValue, option];
      const selectedItemsMap = selectedItems.reduce((acc, item) => ({ ...acc, [item.value]: 1 }), {});

      newSelectValue = type === DEFAULT
        ? options.filter(item => selectedItemsMap[item.value])
        : selectedItems;
    }

    setSelectValue(newSelectValue);
    onChange({ selectValue: newSelectValue });
  }, [selectValue]);

  return (
    <div style={{ transform: `translateY(-${ margin }px)` }} className="options" ref={ selectRef }>
      { selectAllCheckbox &&
        <SelectAllCheckbox
          label={ selectAllLabel }
          options={ options }
          isAllOptionsSelected={ isAllOptionsSelected }
          setSelectValue={ setSelectValue }
          onChange={ onChange }
        />
      }
      { options.map(option => (
        <Option
          key={ option.value }
          type={ type }
          option={ option }
          isOptionSelected={ selectedValuesMap[option.value] }
          handleSelectValue={ handleSelectValue }
        />
      )) }
    </div>
  );
};
