import { Checkmark } from './checkmark';

const { cn } = BackendlessUI.CSSUtils;

const CHECKMARK = 'checkmark';

export function Option({ type, option, isOptionSelected, handleSelectValue }) {
  return (
    <div
      onClick={ () => handleSelectValue(option) }
      className={ cn("option", { "option__selected": isOptionSelected }) }>
      { type === CHECKMARK && <Checkmark checked={ isOptionSelected } /> }
      <span className="option__label">{ option.label }</span>
    </div>
  );
};
