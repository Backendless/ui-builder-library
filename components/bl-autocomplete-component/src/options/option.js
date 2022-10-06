export const Option = props => {
  const { item, setInputValue, setAutocompleteValue, setIsOptionsOpen, onAutocompleteChange } = props;

  const handleClick = () => {
    setInputValue('');
    setAutocompleteValue(item);
    setIsOptionsOpen(false);

    if (onAutocompleteChange) {
      onAutocompleteChange({ autocompleteValue: item });
    }
  };

  const onEnterClick = ({ key }) => {
    if (key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div onClick={ handleClick } className="option">
      <span
        tabIndex={ 1 }
        onKeyUp={ onEnterClick }>
        { item.label }
      </span>
    </div>
  );
};
