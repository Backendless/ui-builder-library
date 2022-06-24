import { useTransferList } from './hooks/useTransferList';

import ControlButtons from './components/ControlButtons';
import List from './components/List';

export default function TransferListComponent({ component }) {
  const { listType, leftItems, rightItems } = component;

  const parsedLeftItems = leftItems.split(',');
  const parsedRightItems= rightItems.split(',');
  const [listState, dispatch] = useTransferList(parsedLeftItems, parsedRightItems);

  return (
    <div className="bl-customComponent-transferList">
      <List
        title="Choices"
        enableSelectAll={listType === 'enhanced'}
        items={listState.leftItems}
        selected={listState.leftSelected}
        dispatch={dispatch}
      />
      <ControlButtons
        enableMoveAll={listType !== 'enhanced'}
        listState={listState}
        dispatch={dispatch}
      />
      <List
        title="Chosen"
        enableSelectAll={listType === 'enhanced'}
        items={listState.rightItems}
        selected={listState.rightSelected}
        dispatch={dispatch}
      />
    </div>
  );
};
