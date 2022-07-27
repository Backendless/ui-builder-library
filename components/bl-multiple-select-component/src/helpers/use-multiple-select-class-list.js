import { useMemo } from 'react';

export const useMultipleSelectClassList = props => {
  const { disable, variant, classList } = props;

  return useMemo(() => {
    const classes = ['bl-customComponent-multipleSelect', variant, ...classList];

    if (disable) {
      classes.push('disable');
    }

    return classes.join(' ');
  }, [classList, disable, variant]);
};
