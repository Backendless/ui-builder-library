import { useMemo } from 'react';
import { useActiveClassName } from '../hooks/use-active-class-name'

export const CustomizedStepTitle = (props) => {
  const {
    completedSteps,
    currentStep,
    stepIndex,
    step,
    stepperClassName,
  } = props;

  const { svgIconClass, titleTextClass } = useMemo(() => {
    return useActiveClassName(currentStep, stepIndex, completedSteps, stepperClassName);
  }, [stepIndex, currentStep, completedSteps]);

  return (
    <div className={stepperClassName.stepTitle}>
      {completedSteps.includes(stepIndex)
        ? <CustomizedStepTitleItemCompleted
            stepperClassName={stepperClassName}
            titleTextClass={titleTextClass}
            step={step}
          />
        : <CustomizedStepTitleItem
            svgIconClass={svgIconClass}
            titleTextClass={titleTextClass}
            step={step}
          />
      }
    </div>
  );
};

const CustomizedStepTitleItem = (props) => {
  const {
    svgIconClass,
    titleTextClass,
    step
  } = props;

  return (
    <>
      <div className="step-customized-title__icon-mark-container">
        <div className={svgIconClass}></div>
      </div>
      <span className={titleTextClass}>
        {step}
      </span>
    </>
  );
};

const CustomizedStepTitleItemCompleted = (props) => {
  const {
    stepperClassName,
    titleTextClass,
    step,
   } = props;

  return (
    <>
      <svg
        className={stepperClassName.titleIconComplete}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
      </svg>
      <span className={titleTextClass}>
        {step}
      </span>
    </>
  );
};
