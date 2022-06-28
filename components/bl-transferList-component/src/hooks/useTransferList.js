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
        rightItems: state.rightItems.concat(state.leftItems),
      };
    case actions.MOVE_ALL_TO_LEFT:
      return {
        ...state,
        rightItems: [],
        leftItems: state.leftItems.concat(state.rightItems),
      };
    case actions.MOVE_SELECTED_TO_LEFT:
      const rightSelected = state.rightItems.filter(item => (
        state.selected.find(({ objectId }) => item.objectId === objectId)
      ));

      return {
        ...state,
        selected: state.selected.filter(item => (
          !rightSelected.find(({ objectId }) => item.objectId === objectId)
        )),
        leftItems: state.leftItems.concat(rightSelected),
        rightItems: state.rightItems.filter(item => (
          !rightSelected.find(({ objectId }) => item.objectId === objectId)
        )),
      };
    case actions.MOVE_SELECTED_TO_RIGHT:
      const leftSelected = state.leftItems.filter(item => (
        state.selected.find(({ objectId }) => item.objectId === objectId)
      ));

      return {
        ...state,
        selected: state.selected.filter(item => (
          !leftSelected.find(({ objectId }) => item.objectId === objectId)
        )),
        rightItems: state.rightItems.concat(leftSelected),
        leftItems: state.leftItems.filter(item => (
          !leftSelected.find(({ objectId }) => item.objectId === objectId)
        )),
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
