import { iconsMap } from './icons';

export const getToggleAllIcon = (isChecked, isIndeterminated) => {
  if (isIndeterminated === 'undefined') {
    return isChecked ? iconsMap.checked : iconsMap.unchecked;
  } else {
     if (isChecked) {
      return iconsMap.checked;
    } else if (isIndeterminated) {
      return iconsMap.indeterminated;
    } else {
      return iconsMap.unchecked;
    } 
  }
};