import { Checkmark } from './checkmark';

const { cn } = BackendlessUI.CSSUtils;

const DEFAULT = 'default';

export function Option({ type, option, isOptionSelected, handleSelectValue }) {
  return (
    <div
      onClick={ () => handleSelectValue(option) }
      className={ cn("option", { "option__selected": isOptionSelected }) }>
      { type !== DEFAULT && <Checkmark checked={ isOptionSelected } /> }
      <span className="option__label">{ option.label }</span>
    </div>
  );
};
