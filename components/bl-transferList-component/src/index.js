import { useState, useMemo, useEffect } from 'react';

import { List } from './list';
import { TransferButtons } from './transfer-buttons';
import { validate, getMapFromObjectsArray } from './helpers';

const ENHANCED = 'enhanced';
const { cn } = BackendlessUI.CSSUtils;

export default function TransferListComponent({ component, eventHandlers }) {
  const { display, classList, style, disabled, listType, leftItems, rightItems } = component;

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [allSelected, setAllSelected] = useState([]);

  useEffect(() => {
    setLeft(validate(leftItems));
    setRight(validate(rightItems));
  }, [leftItems, rightItems])

  const allSelectedMap = useMemo(() => getMapFromObjectsArray(allSelected), [allSelected]);

  const leftSelected = useMemo(() => {
    return left.filter(({ objectId }) => allSelectedMap[objectId]);
  }, [left, allSelectedMap]);

  const rightSelected = useMemo(() => {
    return right.filter(({ objectId }) => allSelectedMap[objectId])
  }, [right, allSelectedMap]);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-transferList', classList, { disabled }) } style={ style }>
      <List
        title="Choices"
        enableSelectAll={ listType === ENHANCED }
        items={ left }
        selected={ leftSelected }
        allSelected={ allSelected }
        setAllSelected={ setAllSelected }
      />
      <TransferButtons
        enableMoveAll={ listType !== ENHANCED }
        allSelected={ allSelected }
        left={ left }
        right={ right }
        leftSelected={ leftSelected }
        rightSelected={ rightSelected }
        setAllSelected={ setAllSelected }
        setLeft={ setLeft }
        setRight={ setRight }
        eventHandlers={ eventHandlers }
      />
      <List
        title="Chosen"
        enableSelectAll={ listType === ENHANCED }
        items={ right }
        selected={ rightSelected }
        allSelected={ allSelected }
        setAllSelected={ setAllSelected }
      />
    </div>
  );
};
