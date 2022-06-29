import { actions } from "../hooks/useTransferList";

export const TransferButtons = ({
  enableMoveAll,
  listState,
  dispatch,
  eventHandlers,
 }) => {
   const { onChange } = eventHandlers;
   const {
     selected,
     leftItems,
     rightItems,
     leftSelected,
     rightSelected,
   } = listState;

   const isMoveAllToRightDisabled = !leftItems.length;
   const isMoveAllToLeftDisabled = !rightItems.length;
   const isMoveSelectedToRightDisabled = !leftSelected.length;
   const isMoveSelectedToLeftDisabled = !rightSelected.length;

  const moveAllToRight = () => {
    if (isMoveAllToRightDisabled) return;

    const newRightItems = rightItems.concat(leftItems);

    dispatch({ type: actions.MOVE_ALL_TO_RIGHT, rightItems: newRightItems });

    if (onChange) {
      onChange({
        leftItems: [],
        rightItems: newRightItems,
      });
    }
  };

  const moveAllToLeft = () => {
    if (isMoveAllToLeftDisabled) return;

    const newLeftItems = leftItems.concat(rightItems);

    dispatch({ type: actions.MOVE_ALL_TO_LEFT, leftItems: newLeftItems });

    if (onChange) {
      onChange({
        rightItems: [],
        leftItems: newLeftItems,
      });
    }
  };

  const moveSelectedToLeft = () => {
    const rightSelected = rightItems.filter(item => (
     selected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newRightItems = rightItems.filter(item => (
      !rightSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newLeftItems = leftItems.concat(rightSelected)

    if (isMoveSelectedToLeftDisabled) return;

    dispatch({
      type: actions.MOVE_SELECTED_TO_LEFT,
      rightSelected,
      rightItems: newRightItems,
      leftItems: newLeftItems,
    });

    if (onChange) {
      onChange({
        rightItems: newRightItems,
        leftItems: newLeftItems,
      });
    }
  };

  const moveSelectedToRight = () => {
    if (isMoveSelectedToRightDisabled) return;

    const leftSelected = leftItems.filter(item => (
      selected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newLeftItems = leftItems.filter(item => (
      !leftSelected.find(({ objectId }) => item.objectId === objectId)
    ));

    const newRightItems = rightItems.concat(leftSelected);

    dispatch({
      type: actions.MOVE_SELECTED_TO_RIGHT ,
      leftSelected,
      leftItems: newLeftItems,
      rightItems: newRightItems,
    });

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
          onClick={moveAllToRight}
          disabled={isMoveAllToRightDisabled}
          className="control-buttons__item">
          ≫
        </button>
      )}
      <button
        onClick={moveSelectedToRight}
        disabled={isMoveSelectedToRightDisabled}
        className="control-buttons__item">
        &gt;
      </button>
      <button
        onClick={moveSelectedToLeft}
        disabled={isMoveSelectedToLeftDisabled}
        className="control-buttons__item">
        &lt;
      </button>
      {enableMoveAll && (
        <button
          onClick={moveAllToLeft}
          disabled={isMoveAllToLeftDisabled}
          className="control-buttons__item">
          ≪
        </button>
      )}
    </div>
  );
};
