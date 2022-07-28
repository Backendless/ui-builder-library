export function MoveAllToLeft(props) {
  const { left, right, setLeft, setRight, onChange } = props;
  
  const moveAllToLeft = () => {
    const newLeftItems = left.concat(right);

    setRight([]);
    setLeft(newLeftItems);

    if (onChange) {
      onChange({
        rightItems: [],
        leftItems: newLeftItems,
      });
    }
  };
  
  return (
    <button disabled={ !right.length } onClick={ moveAllToLeft } className="control-buttons__item">≪</button>
  );
};
