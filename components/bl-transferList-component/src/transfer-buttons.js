export const TransferButtons = props => {
  const { left, right, leftSelected, rightSelected, enableMoveAll } = props;

  const { moveAllToRight, moveAllToLeft, moveSelectedToLeft, moveSelectedToRight } = useTransferActions(props);

  return (
    <div className="control-buttons">
      { enableMoveAll &&
        <button
          onClick={ moveAllToRight }
          disabled={ !left.length }
          className="control-buttons__item">
          { MoveIcons.DOUBLE_RIGHT }
        </button>
      }
      <button
        onClick={ moveSelectedToRight }
        disabled={ !leftSelected.length }
        className="control-buttons__item">
        { MoveIcons.RIGHT }
      </button>
      <button
        onClick={ moveSelectedToLeft }
        disabled={ !rightSelected.length }
        className="control-buttons__item">
        { MoveIcons.LEFT }
      </button>
      { enableMoveAll &&
        <button
          onClick={ moveAllToLeft }
          disabled={ !right.length }
          className="control-buttons__item">
          { MoveIcons.DOUBLE_LEFT }
        </button>
      }
    </div>
  );
};

const MoveIcons = {
  LEFT: '<',
  DOUBLE_LEFT: '≪',
  RIGHT: '>',
  DOUBLE_RIGHT: '≫',
};

const useTransferActions = props => {
  const {
    allSelected,
    left,
    right,
    setAllSelected,
    setLeft,
    setRight,
    eventHandlers,
  } = props;

  const { onChange } = eventHandlers;

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

  return {
    moveAllToRight,
    moveAllToLeft,
    moveSelectedToLeft,
    moveSelectedToRight,
  };
};
