import { useMemo } from 'react';

export const useChartData = (goal, progress) => useMemo(() => {
  const progressPercentage = (progress / (goal / 100)).toFixed(2);
  const progressAngle = (progressPercentage > 100 ? 100 : progressPercentage) / 200;

  const angleFillStyle = { transform: `rotate(${progressAngle}turn)` };

  const shownGoal = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
    .format(goal);
  const shownProgress = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
    .format(progress);

  return { shownGoal, shownProgress, angleFillStyle, progressPercentage };
}, [goal, progress]);
