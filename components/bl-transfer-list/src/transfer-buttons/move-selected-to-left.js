import { getMapFromObjectsArray } from '../helpers';

export function MoveSelectedToLeft(props) {
  const { left, right, allSelected, rightSelected, setLeft, setRight, setAllSelected, onChange } = props;
  
  const moveSelectedToLeft = () => {
    const newLeftItems = left.concat(rightSelected);
    const rightSelectedMap = getMapFromObjectsArray(rightSelected);
    const newRightItems = right.filter(({ objectId }) => !rightSelectedMap[objectId]);

    setLeft(newLeftItems);
    setRight(newRightItems);
    setAllSelected(allSelected.filter(({ objectId }) => !rightSelectedMap[objectId]));

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
