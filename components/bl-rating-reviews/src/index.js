import { useMemo } from 'react';

import { calculateAverage, calculatePercent,calculateTotalReviews, prepareReviewData } from './helpers';
import ViewsMap from './views';

const { cn, normalizeDimensionValue, normalizePropertyValue } = BackendlessUI.CSSUtils;

export default function CustomUIComponent({ component, eventHandlers, elRef }) {
  const { ratingData, color, iconSize, width, view, localizations, style, classList } = component;

  const processedData = prepareReviewData(ratingData, color);

  const maxValue = useMemo(() => processedData.length, [processedData.length]);
  const totalReviews = useMemo(() => calculateTotalReviews(processedData), [processedData]);
  const average = useMemo(() => calculateAverage(processedData), [processedData]);
  const processedIconSize = normalizePropertyValue(iconSize, ['px'], 'px');

  const Review = ViewsMap[view];

  const styles = useMemo(() => ({
    width: normalizeDimensionValue(width),
    ...style,
  }), [style]);

  Object.assign(component, {
    getAverage: () => average,
    getPercents: () => processedData.map(el => Math.round(calculatePercent(el.value, totalReviews))),
    getTotal: () => totalReviews,
  });

  return (
    <div ref={ elRef } className={ cn('bl-cutomComponent-customer-reviews', classList) } style={ styles }>
      <Review
        color={ color }
        maxValue={ maxValue }
        average={ average }
        reviewData={ processedData }
        iconSize={ processedIconSize }
        totalReviews={ totalReviews }
        localizations={ localizations }
        eventHandlers={ eventHandlers }/>
    </div>
  );
};
