import { useMemo } from 'react';

export const useStyles = (style, width, height) => useMemo(() => {
  const validStyles = validateStyles({ width, height });

  return { ...style, ...validStyles, flexShrink: 0 };
}, [style, width, height]);

const validateStyles = dimensions => {
  const validDimensions = validateDimensions(dimensions);

  return Object.entries(validDimensions).reduce((acc, [propertyName, value]) => {
    if (CSS.supports(propertyName, value)) {
      return { ...acc, [propertyName]: value };
    }

    console.error(`Property ${ propertyName } has wrong value!`);

    return acc;
  }, {});
};

const validateDimensions = dimensions => {
  return Object.entries(dimensions).reduce((acc, [propertyName, value]) => {
    if (!value) {
      console.error(`Property ${ propertyName } has wrong value!`);

      return acc;
    }

    if (value.includes("%")) {
      return { ...acc, [propertyName]: `${ parseFloat(value) }%` };
    }

    return { ...acc, [propertyName]: `${ parseFloat(value) }px` };
  }, {});
};
