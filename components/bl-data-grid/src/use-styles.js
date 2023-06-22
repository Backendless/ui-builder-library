import { useMemo } from 'react';

const ONLY_NUMERIC_REGEX = /^\d+$/;

export const useStyles = (style, width, height) => useMemo(() => {
  const validStyles = validateStyles({ width, height });

  return { ...style, ...validStyles, flexShrink: 0 };
}, [style, width, height]);

const validateStyles = dimensions => {
  return Object.entries(dimensions).reduce((acc, [propertyName, value]) => {
    if (ONLY_NUMERIC_REGEX.test(value)) {
      console.warn(`${propertyName} automatically changed (${value} -> ${value}px) as it is an invalid CSS value.`);

      return { ...acc, [propertyName]: `${ value }px` };
    }

    if (CSS.supports(propertyName, value)) {
      return { ...acc, [propertyName]: value };
    }

    console.error(`Property ${ propertyName } has wrong value!`);

    return acc;
  }, {});
};
