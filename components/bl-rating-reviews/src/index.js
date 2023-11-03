import { useMemo } from 'react';

import { calculateAverage, calculatePercent, calculateTotalReviews, prepareReviewData } from './helpers';
import { ViewsMap } from './views';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function RatingReviews({ component, eventHandlers, elRef }) {
  const {
    ratingReviewsData, color, iconType, iconSize, width, view, localizations, style, classList, display
  } = component;

  const processedData = useMemo(() => prepareReviewData(ratingReviewsData, color), [ratingReviewsData, color]);
  const totalReviews = useMemo(() => calculateTotalReviews(processedData), [processedData]);
  const average = useMemo(() => calculateAverage(processedData), [processedData]);
  const maxValue = processedData.length;

  const Review = ViewsMap[view];

  const styles = useMemo(() => ({
    width: normalizeDimensionValue(width),
    ...style,
  }), [style, width]);

  Object.assign(component, {
    getAverage : () => average,
    getPercents: () => processedData.map(({ value }) => Math.round(calculatePercent(value, totalReviews))),
    getTotal   : () => totalReviews,
  });

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-customer-reviews', classList) } style={ styles }>
      <Review
        color={ color }
        maxValue={ maxValue }
        average={ average }
        reviewData={ processedData }
        iconType={ iconType }
        iconSize={ `${ iconSize }px` }
        totalReviews={ totalReviews }
        localizations={ localizations }
        eventHandlers={ eventHandlers }
      />
    </div>
  );
}
