import { useMemo, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'selectItems':
      const selectedItems = action.items.filter(item => !state.selected.includes(item))

      return {
        ...state,
        selected: state.selected.concat(selectedItems),
      };
    case 'unselectItems':
      return {
        ...state,
        selected: state.selected.filter(item => !action.items.includes(item)),
      };
    case 'moveAllToRight':
      return {
        ...state,
        leftItems: [],
        rightItems: state.rightItems.concat(state.leftItems),
      };
    case 'moveAllToLeft':
      return {
        ...state,
        rightItems: [],
        leftItems: state.leftItems.concat(state.rightItems),
      };
    case 'moveSelectedToLeft':
      const rightSelected = state.rightItems.filter(item => state.selected.includes(item))

      return {
        ...state,
        selected: state.selected.filter(item => !rightSelected.includes(item)),
        leftItems: state.leftItems.concat(rightSelected),
        rightItems: state.rightItems.filter(item => !rightSelected.includes(item)),
      };
    case 'moveSelectedToRight':
      const leftSelected = state.leftItems.filter(item => state.selected.includes(item))

      return {
        ...state,
        selected: state.selected.filter(item => !leftSelected.includes(item)),
        rightItems: state.rightItems.concat(leftSelected),
        leftItems: state.leftItems.filter(item => !leftSelected.includes(item)),
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
