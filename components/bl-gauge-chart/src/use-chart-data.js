import { useEffect, useMemo, useState } from 'react';

export const useChartData = (goal, progress, component) => {
  const [validGoal, setValidGoal] = useState(1);
  const [validProgress, setValidProgress] = useState(0);

  component.getGoal = () => validGoal;
  component.setGoal = goal => setValidGoal(validator.goal(goal));
  component.getProgress = () => validProgress;
  component.setProgress = progress => setValidProgress(validator.progress(progress));

  useEffect(() => {
    setValidGoal(validator.goal(goal));
    setValidProgress(validator.progress(progress));
  }, [goal, progress]);

  return useMemo(() => {
    const progressPercentage = (validProgress / (validGoal / 100)).toFixed(2);
    const progressAngle = (progressPercentage > 100 ? 100 : progressPercentage) / 200;

    const angleFillStyle = { transform: `rotate(${progressAngle}turn)` };

    const shownGoal = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
      .format(validGoal);
    const shownProgress = window.Intl.NumberFormat('en', { maximumFractionDigits: 3, notation: 'compact' })
      .format(validProgress);
    const decorationLetter = validGoal >= 1000 ? shownGoal.charAt(shownGoal.length - 1) : '';

    return { shownGoal, shownProgress, angleFillStyle, progressPercentage, decorationLetter };
  }, [validGoal, validProgress]);
};

const validator = {
  goal: g => g > 0 ? g : 1,
  progress: p => Math.max(0, p),
};
