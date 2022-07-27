import { Checkmark } from './checkmark';

export const Option = props => {
  const { option, isOptionSelected, typeOfMultipleSelect, handleMultipleSelectValue } = props;

  const optionClassList = () => {
    const classList = ['option'];

    if (isOptionSelected) {
      classList.push('option__selected');
    }

    return classList.join(' ');
  };

  return (
    <div onClick={ () => handleMultipleSelectValue(option) } className={ optionClassList() }>
      { typeOfMultipleSelect === 'checkmark' && <Checkmark isOptionSelected={ isOptionSelected } /> }
      <span>{ option.label }</span>
    </div>
  );
};
