export const TransferButtons = props => {
  const {
    enableMoveAll,
    allSelected,
    left,
    right,
    leftSelected,
    rightSelected,
    setAllSelected,
    setLeft,
    setRight,
    eventHandlers,
  } = props;

  const { onChange } = eventHandlers;

  const isMoveAllToRightDisabled = !left.length;
  const isMoveAllToLeftDisabled = !right.length;
  const isMoveSelectedToRightDisabled = !leftSelected.length;
  const isMoveSelectedToLeftDisabled = !rightSelected.length;

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

  const moveSelectedToLeft = () => {
    const rightSelected = right.filter(item => (
      allSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newRightItems = right.filter(item => (
      !rightSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newLeftItems = left.concat(rightSelected);

    const newAllSelected = allSelected.filter(item => (
      !rightSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    setLeft(newLeftItems);
    setRight(newRightItems);
    setAllSelected(newAllSelected);

    if (onChange) {
      onChange({
        rightItems: newRightItems,
        leftItems: newLeftItems,
      });
    }
  };

  const moveSelectedToRight = () => {
    const leftSelected = left.filter(item => (
      allSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newLeftItems = left.filter(item => (
      !leftSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newRightItems = right.concat(leftSelected);

    const newAllSelected = allSelected.filter(item => (
      !leftSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    setRight(newRightItems);
    setLeft(newLeftItems);
    setAllSelected(newAllSelected);

    if (onChange) {
      onChange({
        leftItems: newLeftItems,
        rightItems: newRightItems,
      });
    }
  };

  return (
    <div className="control-buttons">
      {enableMoveAll && (
        <button
          onClick={ moveAllToRight }
          disabled={ isMoveAllToRightDisabled }
          className="control-buttons__item">
          ≫
        </button>
      )}
      <button
        onClick={ moveSelectedToRight }
        disabled={ isMoveSelectedToRightDisabled }
        className="control-buttons__item">
        &gt;
      </button>
      <button
        onClick={ moveSelectedToLeft }
        disabled={ isMoveSelectedToLeftDisabled }
        className="control-buttons__item">
        &lt;
      </button>
      {enableMoveAll && (
        <button
          onClick={ moveAllToLeft }
          disabled={ isMoveAllToLeftDisabled }
          className="control-buttons__item">
          ≪
        </button>
      )}
    </div>
  );
};
