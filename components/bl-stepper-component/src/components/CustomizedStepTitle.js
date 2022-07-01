export const CustomizedStepTitle = ({
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
            className={stepperClassName.titleIconComplete}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CheckIcon"
          >
            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
          </svg>
          <span className={stepperClassName.titleText + ' ' + stepperClassName.titleTextActive}>
            {step}
          </span>
        </>
      ) : (
        <>
          <div className="step-customized-title__icon-mark-container">
            <div className={svgIconClass}></div>
          </div>
          <span className={titleTextClass}>
            {step}
          </span>
        </>
      )}
    </div>
  );
};
