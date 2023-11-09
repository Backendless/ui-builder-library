export function MoveAllToRight(props) {
  const { left, right, setLeft, setRight, onChange } = props;

  const moveAllToRight = () => {
    const newRightItems = right.concat(left);

    setLeft([]);
    setRight(newRightItems);

    if (onChange) {
      onChange({
        leftItems: [],
        rightItems: newRightItems,
      });
    }
  };

  return (
    <button disabled={ !left.length } onClick={ moveAllToRight } className="control-buttons__item">≫</button>
  );
}
