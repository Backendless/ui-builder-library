import { useMemo } from 'react';

export const useRatingClassList = (disabled, classList) => {
  const classes = useMemo(() => {
    const listClassesOf = ['bl-customComponent-rating', ...classList];
    
    if (disabled) {
      listClassesOf.push('disabled');
    }
    
    return listClassesOf.join(' ');
  }, [classList, disabled]);
  
  return classes;
};
