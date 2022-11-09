import { useMemo } from 'react';

export const useChartData = (goal, progress) => useMemo(() => {
  const fillPercentage = (progress / (goal / 100)).toFixed(2);
  const barFillStyle = { width: `${ fillPercentage > 100 ? 100 : fillPercentage }%` };

  const shownGoal = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
    .format(goal);
  const shownProgress = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
    .format(progress);

  return { shownGoal, shownProgress, barFillStyle };
}, [goal, progress]);
