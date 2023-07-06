import { useMemo } from 'react';

export const useChartData = (goal, progress, isHorizontal) => useMemo(() => {
  const fillPercentage = (progress / (goal / 100)).toFixed(2);
  const barFillStyle = { [isHorizontal ? 'width' : 'height']: `${ Math.min(fillPercentage, 100) }%` };

  const shownGoal = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
    .format(goal);
  const shownProgress = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
    .format(progress);

  return { shownGoal, shownProgress, barFillStyle };
}, [goal, progress]);
