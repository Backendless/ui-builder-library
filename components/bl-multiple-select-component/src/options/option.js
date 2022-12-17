import { Checkmark } from './checkmark';

const { cn } = BackendlessUI.CSSUtils;

export function Option({ type, option, isOptionSelected, handleSelectValue }) {
  return (
    <div
      onClick={ () => handleSelectValue(option) }
      className={ cn("option", { "option__selected": isOptionSelected }) }>
      { type === "checkmark" && <Checkmark checked={ isOptionSelected } /> }
      <span>{ option.label }</span>
    </div>
  );
};
