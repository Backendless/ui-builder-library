export const StepTitle = ({
  completedSteps,
  currentStep,
  stepIndex,
  step,
  stepperClassName,
}) => {
  let svgIconClass = stepperClassName.titleIcon;
  let titleTextClass = stepperClassName.titleText;

  if (stepIndex === currentStep) {
    svgIconClass += ' ' + stepperClassName.titleIconActive;
    titleTextClass += ' ' + stepperClassName.titleTextActive;
  }

  return (
    <div className={stepperClassName.stepTitle}>
      {completedSteps.includes(stepIndex) ? (
        <>
          <svg
            className={stepperClassName.titleIcon + ' ' + stepperClassName.titleIconActive}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CheckCircleIcon"
          >
            <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
          </svg>
          <span className={stepperClassName.titleText + ' ' + stepperClassName.titleTextActive}>
            {step}
          </span>
        </>
      ) : (
        <>
          <svg
            className={svgIconClass}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="12"></circle>
            <text
              className={stepperClassName.titleIconText}
              x="12"
              y="12"
              text-anchor="middle"
              dominant-baseline="central"
            >
              {stepIndex + 1}
            </text>
          </svg>
          <span className={titleTextClass}>
            {step}
          </span>
        </>
      )}
    </div>
  );
};
