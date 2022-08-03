import { Checkmark } from './checkmark';

const { cn } = BackendlessUI.CSSUtils;

export function Option(props) {
  const { option, isOptionSelected, typeOfMultipleSelect, handleMultipleSelectValue } = props;
  
  return (
    <div
      onClick={ () => handleMultipleSelectValue(option) }
      className={ cn("option", { ['option__selected']: isOptionSelected }) }>
      { typeOfMultipleSelect === "checkmark" && <Checkmark isOptionSelected={ isOptionSelected } /> }
      <span>{ option.label }</span>
    </div>
  );
};
