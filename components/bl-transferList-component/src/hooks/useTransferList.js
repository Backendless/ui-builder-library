import { useMemo, useReducer } from 'react';

export const actions = {
  SELECT_ITEMS: 'SELECT_ITEMS',
  UNSELECT_ITEMS: 'UNSELECT_ITEMS',
  MOVE_ALL_TO_LEFT: 'MOVE_ALL_TO_LEFT',
  MOVE_ALL_TO_RIGHT: 'MOVE_ALL_TO_RIGHT',
  MOVE_SELECTED_TO_LEFT: 'MOVE_SELECTED_TO_LEFT',
  MOVE_SELECTED_TO_RIGHT: 'MOVE_SELECTED_TO_RIGHT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_ITEMS:
      const selectedItems = action.items.filter(item => !state.selected.includes(item))

      return {
        ...state,
        selected: state.selected.concat(selectedItems),
      };
    case actions.UNSELECT_ITEMS:
      return {
        ...state,
        selected: state.selected.filter(item => !action.items.includes(item)),
      };
    case actions.MOVE_ALL_TO_RIGHT:
      return {
        ...state,
        leftItems: [],
        rightItems: action.rightItems,
      };
    case actions.MOVE_ALL_TO_LEFT:
      return {
        ...state,
        rightItems: [],
        leftItems: action.leftItems,
      };
    case actions.MOVE_SELECTED_TO_LEFT:
      return {
        ...state,
        selected: state.selected.filter(item => (
          !action.rightSelected.find(({ objectId }) => item.objectId === objectId)
        )),
        leftItems: action.leftItems,
        rightItems: action.rightItems,
      };
    case actions.MOVE_SELECTED_TO_RIGHT:
      return {
        ...state,
        selected: state.selected.filter(item => (
          !action.leftSelected.find(({ objectId }) => item.objectId === objectId)
        )),
        rightItems: action.rightItems,
        leftItems: action.leftItems,
      };

    default:
      return state;
  };
};

const init = ({
  leftItems = [],
  rightItems = [],
}) => ({
  leftItems,
  rightItems,
  selected: [],
});

export const useTransferList = (leftItems, rightItems) => {
  const [state, dispatch] = useReducer(reducer, { leftItems, rightItems }, init);

  const listState = useMemo(() => {
    const leftSelected = state.leftItems.filter(item => state.selected.includes(item));
    const rightSelected = state.rightItems.filter(item => state.selected.includes(item));

    return {
      ...state,
      leftSelected,
      rightSelected,
    };
  }, [state]);

  return [listState, dispatch]
};
