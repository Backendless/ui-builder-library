import { useMemo } from 'react';
import { useActiveClassName } from '../hooks/use-active-class-name'

export const StepTitle = (props) => {
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
        ? <StepTitleItemCompleted
            svgIconClass={svgIconClass}
            titleTextClass={titleTextClass}
            step={step}
          />
        : <StepTitleItem
            svgIconClass={svgIconClass}
            titleTextClass={titleTextClass}
            stepperClassName={stepperClassName}
            step={step}
            stepIndex={stepIndex}
          />
      }
    </div>
  );
};

const StepTitleItem = (props) => {
  const {
    svgIconClass,
    stepperClassName,
    titleTextClass,
    step,
    stepIndex,
  } = props;

  return (
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
  );
};

const StepTitleItemCompleted = (props) => {
  const { svgIconClass, titleTextClass, step } = props;

  return (
    <>
      <svg
        className={svgIconClass}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
      </svg>
      <span className={titleTextClass}>
        {step}
      </span>
    </>
  );
};
