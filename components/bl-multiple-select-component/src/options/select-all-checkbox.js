import { Checkmark } from './checkmark';

export function SelectAllCheckbox({ label, isAllOptionsSelected, handleSelectAll }) {
  return (
    <div
      onClick={ handleSelectAll }
      className="select-all-checkbox">
      <Checkmark isOptionSelected={ isAllOptionsSelected } />
      <span>{ label }</span>
    </div>
  );
};
