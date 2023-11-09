export function Option(props) {
  const { item, setInputValue, setAutocompleteValue, setIsOptionsOpen, onChange } = props;

  const handleClick = () => {
    setInputValue('');
    setAutocompleteValue(item);
    setIsOptionsOpen(false);
    onChange({ inputValue: item.value });
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
}
