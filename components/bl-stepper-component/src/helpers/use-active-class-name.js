export const useActiveClassName = (currentStep, stepIndex, steps, stepperClassName) => {
  let svgIconClass = stepperClassName.titleIcon;
  let titleTextClass = stepperClassName.titleText;

  if (stepIndex === currentStep || steps[stepIndex].completed) {
    svgIconClass += ' ' + stepperClassName.titleIconActive;
    titleTextClass += ' ' + stepperClassName.titleTextActive;
  }

  return { svgIconClass, titleTextClass };
};
