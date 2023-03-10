import { useMemo } from 'react';

export const useStyles = (style, width, height) => useMemo(() => {
  const validStyles = validateStyles({ width, height });

  return {
    ...style,
    ...validStyles,
  };
}, [style, width, height]);

const validateStyles = styles => {
  return Object.entries(styles).reduce((acc, [propertyName, value]) => {
    if (CSS.supports(propertyName, value)) {
      return {
        ...acc,
        [propertyName]: value,
      };
    }

    console.error(`Property ${propertyName} has wrong value!`);

    return {
      ...acc,
      [propertyName]: 0,
    };
  }, {});
};
