import { iconsMap } from './icons';

export const getToggleAllIcon = (isAllChecked, isIndeterminated) => {
  if (isAllChecked) {
    return iconsMap.checked;
  } else if (isIndeterminated) {
    return iconsMap.indeterminated;
  } else {
    return iconsMap.unchecked;
  }
};
