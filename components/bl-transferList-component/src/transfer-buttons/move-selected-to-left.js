export function MoveSelectedToLeft(props) {
  const { left, right, allSelected, rightSelected, setLeft, setRight, setAllSelected, onChange } = props;
  
  const moveSelectedToLeft = () => {
    const newLeftItems = left.concat(rightSelected);
    const newRightItems = right.filter(item => !rightSelected.includes(item));

    setLeft(newLeftItems);
    setRight(newRightItems);
    setAllSelected(allSelected.filter(item => !rightSelected.includes(item)));

    if (onChange) {
      onChange({
        rightItems: newRightItems,
        leftItems: newLeftItems,
      });
    }
  };
  
  return (
    <button
      onClick={ moveSelectedToLeft }
      disabled={ !rightSelected.length }
      className="control-buttons__item">
      &lt;
    </button>
  );
};
