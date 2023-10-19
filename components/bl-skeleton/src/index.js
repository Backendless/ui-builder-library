import { useMemo } from 'react';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function Skeleton({ component }) {
  const { style, display, classList, variant, width, height, animation, margin } = component;

  const validMargin = useMemo(() => margin.split(' ').map(item => normalizeDimensionValue(item)).join(' '), [margin]);

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-skeleton',  variant, animation, classList) }
      style={{ width: normalizeDimensionValue(width), height: normalizeDimensionValue(height), margin: validMargin, ...style }}>
    </div>
  );
}
