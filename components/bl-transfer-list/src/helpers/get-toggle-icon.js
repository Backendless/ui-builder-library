import { iconsMap } from './icons';

export const getToggleAllIcon = (isChecked, isIndeterminated) => {
  if (isIndeterminated === 'undefined') {
    return isChecked ? iconsMap.checked : iconsMap.unchecked;
  }
  
  if (isChecked) {
    return iconsMap.checked;
  }
  
  if (isIndeterminated) {
    return iconsMap.indeterminated;
  }
  
  return iconsMap.unchecked;
};