export const useActiveClassName = (currentStep, stepIndex, completedSteps, stepperClassName) => {
  let svgIconClass = stepperClassName.titleIcon;
  let titleTextClass = stepperClassName.titleText;

  if (stepIndex === currentStep || completedSteps.includes(stepIndex)) {
    svgIconClass += ' ' + stepperClassName.titleIconActive;
    titleTextClass += ' ' + stepperClassName.titleTextActive;
  }

  return { svgIconClass, titleTextClass };
};
