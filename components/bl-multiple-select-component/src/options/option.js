import { Checkmark } from './checkmark';

const { cn } = BackendlessUI.CSSUtils;

export function Option(props) {
  const { type, option, isOptionSelected, handleSelectValue } = props;

  return (
    <div
      onClick={ () => handleSelectValue(option) }
      className={ cn("option", { ['option__selected']: isOptionSelected }) }>
      { type === "checkmark" && <Checkmark isOptionSelected={ isOptionSelected } /> }
      <span>{ option.label }</span>
    </div>
  );
};
