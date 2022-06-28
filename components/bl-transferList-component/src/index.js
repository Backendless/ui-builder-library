import { validate } from './utils/validate';
import { useTransferList } from './hooks/useTransferList';

import { List, ControlButtons } from './components';

export default function TransferListComponent({ component }) {
  const { display, listType, leftItems, rightItems } = component;

  const parsedLeftItems = validate(leftItems);
  const parsedRightItems = validate(rightItems);
  const [listState, dispatch] = useTransferList(parsedLeftItems, parsedRightItems);

  if (!display) {
     return null;
  }

  return (
    <div className="bl-customComponent-transferList">
      <List
        title="Choices"
        enableSelectAll={listType === "enhanced"}
        items={listState.leftItems}
        selected={listState.leftSelected}
        dispatch={dispatch}
      />
      <ControlButtons
        enableMoveAll={listType !== "enhanced"}
        listState={listState}
        dispatch={dispatch}
      />
      <List
        title="Chosen"
        enableSelectAll={listType === "enhanced"}
        items={listState.rightItems}
        selected={listState.rightSelected}
        dispatch={dispatch}
      />
    </div>
  );
};
