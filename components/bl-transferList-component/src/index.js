import { useState, useMemo, useEffect } from 'react';

import { List } from './list';
import { TransferButtons } from './transfer-buttons';
import { validate, getMapFromObjectsArray } from './helpers';

const ENHANCED = 'enhanced';
const { cn } = BackendlessUI.CSSUtils;

export default function TransferListComponent({ component, eventHandlers }) {
  const { display, classList, style, disabled, listType,
    leftListItems, rightListItems, leftListTitle, rightListTitle
  } = component;

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [allSelected, setAllSelected] = useState([]);

  useEffect(() => {
    setLeft(validate(leftListItems));
    setRight(validate(rightListItems));
  }, [leftListItems, rightListItems])

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
    <div
      className={
        cn('bl-customComponent-transferList', classList, { 'bl-customComponent-transferList--disabled': disabled })
      }
      style={ style }>
      <List
        enableSelectAll={ listType === ENHANCED }
        items={ left }
        title={ leftListTitle }
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
        enableSelectAll={ listType === ENHANCED }
        items={ right }
        title={ rightListTitle }
        selected={ rightSelected }
        allSelected={ allSelected }
        setAllSelected={ setAllSelected }
      />
    </div>
  );
};
