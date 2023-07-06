import { MoveAllToLeft } from './move-all-to-left';
import { MoveAllToRight } from './move-all-to-right';
import { MoveSelectedToLeft } from './move-selected-to-left';
import { MoveSelectedToRight } from './move-selected-to-right';

export function TransferButtons(props) {
    const {
      left,
      right,
      allSelected,
      leftSelected,
      rightSelected,
      enableMoveAll,
      setLeft,
      setRight,
      setAllSelected,
      eventHandlers,
    } = props;

  const { onChange } = eventHandlers;

  return (
    <div className="control-buttons">
      { enableMoveAll &&
        <MoveAllToRight
          left={ left }
          right={ right }
          setLeft={ setLeft }
          setRight={ setRight }
          onChange={ onChange }
        />
      }
      <MoveSelectedToRight
        left={ left }
        right={ right }
        allSelected={ allSelected }
        leftSelected={ leftSelected }
        setLeft={ setLeft }
        setRight={ setRight }
        setAllSelected={ setAllSelected }
        onChange={ onChange }
      />
      <MoveSelectedToLeft
        left={ left }
        right={ right }
        allSelected={ allSelected }
        rightSelected={ rightSelected }
        setLeft={ setLeft }
        setRight={ setRight }
        setAllSelected={ setAllSelected }
        onChange={ onChange }
      />
      { enableMoveAll &&
        <MoveAllToLeft
          left={ left }
          right={ right }
          setLeft={ setLeft }
          setRight={ setRight }
          onChange={ onChange }
        />
      }
    </div>
  );
};
