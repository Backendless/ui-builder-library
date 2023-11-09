import { getMapFromObjectsArray } from '../helpers';

export function MoveSelectedToRight(props) {
  const { left, right, allSelected, leftSelected, setLeft, setRight, setAllSelected, onChange } = props;

  const moveSelectedToRight = () => {
    const newRightItems = right.concat(leftSelected);
    const leftSelectedMap = getMapFromObjectsArray(leftSelected);
    const newLeftItems = left.filter(({ objectId }) => !leftSelectedMap[objectId]);

    setRight(newRightItems);
    setLeft(newLeftItems);
    setAllSelected(allSelected.filter(({ objectId }) => !leftSelectedMap[objectId]));

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
}

