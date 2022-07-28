export function MoveSelectedToRight(props) {
  const { left, right, allSelected, leftSelected, setLeft, setRight, setAllSelected, onChange } = props;
  
  const moveSelectedToRight = () => {
    const newRightItems = right.concat(leftSelected);
    const newLeftItems = left.filter(item => !leftSelected.includes(item));

    setRight(newRightItems);
    setLeft(newLeftItems);
    setAllSelected(allSelected.filter(item => !leftSelected.includes(item)));

    if (onChange) {
      onChange({
        leftItems: newLeftItems,
        rightItems: newRightItems,
      });
    }
  };
  
  return (
    <button
      onClick={ moveSelectedToRight }
      disabled={ !leftSelected.length }
      className="control-buttons__item">
      &gt;
    </button>
  );
};
