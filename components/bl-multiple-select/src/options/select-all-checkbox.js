import { Checkmark } from './checkmark';

export function SelectAllCheckbox({ label, options, isAllOptionsSelected, setSelectValue, onChange }) {
  const handleSelectAll = () => {
    const newSelectValue = isAllOptionsSelected ? [] : options;

    setSelectValue(newSelectValue);
    onChange({ selectValue: newSelectValue });
  };

  return (
    <div
      onClick={ handleSelectAll }
      className="select-all-checkbox">
      <Checkmark checked={ isAllOptionsSelected } />
      <span>{ label }</span>
    </div>
  );
};
