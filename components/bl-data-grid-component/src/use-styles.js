import { useMemo } from 'react';

const ONLY_NUMERIC_REGEX = /^\d+$/;
const SUFFIX_REGEX = /[a-zA-Z%]+$/;

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

function normalizePropertyValue(value, allowedSuffixes, defaultSuffix) {
  const suffix = value.match(SUFFIX_REGEX);

  if (suffix && allowedSuffixes.includes(suffix[0])) {
    return value;
  }

  if (suffix && !allowedSuffixes.includes(suffix[0])) {
    return parseFloat(value) + defaultSuffix;
  }

  if (ONLY_NUMERIC_REGEX.test(value)) {
    return value + defaultSuffix;
  }
}

function normalizeDimensionValue(value) {
  return normalizePropertyValue(value, ['px', 'rem', 'em', '%', 'cm', 'mm', 'in', 'pt', 'pc', 'vh', 'vw', 'ch', 'vmin', 'vmax'], 'px');
}
