const ControlButtons = ({
  enableMoveAll,
  listState,
  dispatch,
 }) => {
   const isMoveAllToRightDisabled = !listState.leftItems.length;
   const isMoveAllToLeftDisabled = !listState.rightItems.length;
   const isMoveSelectedToRightDisabled = !listState.leftSelected.length;
   const isMoveSelectedToLeftDisabled = !listState.rightSelected.length;

  const moveAllToRight = () => {
    if (isMoveAllToRightDisabled) return;

    dispatch({ type: 'moveAllToRight' });
  };

  const moveAllToLeft = () => {
    if (isMoveAllToLeftDisabled) return;

      dispatch({ type: 'moveAllToLeft' });
  };

  const moveSelectedToLeft = () => {
    if (isMoveSelectedToLeftDisabled) return;

    dispatch({ type: 'moveSelectedToLeft' });
  };

  const moveSelectedToRight = () => {
    if (isMoveSelectedToRightDisabled) return;

    dispatch({ type: 'moveSelectedToRight' });
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

export default ControlButtons;
