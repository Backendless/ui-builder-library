import { useMemo } from 'react';

const compareCaseInsensitive = (str1 = '', str2 = '') => str1.toLowerCase().includes(str2.toLowerCase());

export const useFilteredOptions = (optionsList, inputValue, hasGroup) => useMemo(() => {
  return optionsList.reduce((acc, item) => {
    if (hasGroup) {
      const filteredChildren = item.children.filter(child => compareCaseInsensitive(child.label, inputValue));

      return filteredChildren.length ? [...acc, { ...item, children: filteredChildren }] : acc;
    }

    return compareCaseInsensitive(item.label, inputValue) ? [...acc, item] : acc;
  }, []);
}, [optionsList, inputValue, hasGroup]);
