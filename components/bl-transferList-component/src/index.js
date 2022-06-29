import { useMemo } from 'react';

import { validate } from './utils/validate';
import { useTransferList } from './hooks/useTransferList';

import { List, TransferButtons } from './components';

export default function TransferListComponent({ component, eventHandlers }) {
  const {
    display,
    listType,
    leftItems,
    rightItems,
    iconColor,
    classList,
  } = component;

  const parsedLeftItems = validate(leftItems);
  const parsedRightItems = validate(rightItems);
  const [listState, dispatch] = useTransferList(parsedLeftItems, parsedRightItems);

  if (!display) {
    return null;
  }

  const classes = useMemo(() => {
    const arr = ['bl-customComponent-transferList', ...classList];

    return arr.join(' ');
  }, [classList]);

  return (
    <div className={classes}>
      <List
        title="Choices"
        iconColor={iconColor}
        enableSelectAll={listType === "enhanced"}
        items={listState.leftItems}
        selected={listState.leftSelected}
        dispatch={dispatch}
      />
      <TransferButtons
        enableMoveAll={listType !== "enhanced"}
        listState={listState}
        dispatch={dispatch}
        eventHandlers={eventHandlers}
      />
      <List
        title="Chosen"
        iconColor={iconColor}
        enableSelectAll={listType === "enhanced"}
        items={listState.rightItems}
        selected={listState.rightSelected}
        dispatch={dispatch}
      />
    </div>
  );
};
