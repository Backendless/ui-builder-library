import { StepTitle } from './step-title';
import { CustomizedStepTitle } from './customized-step-title';
import { StepperLine } from './stepper-line'

export const StepperItem = ({
  customized,
  completedSteps,
  currentStep,
  steps,
  stepIndex,
  step,
  stepperClassName,
}) => {
  let stepperLineClass = stepperClassName.line;

  if (completedSteps.includes(stepIndex)) {
    stepperLineClass += ' ' + stepperClassName.lineActive;
  }

  return (
    <div className={stepperClassName.item}>
      {customized ? (
        <CustomizedStepTitle
          stepperClassName={stepperClassName}
          completedSteps={completedSteps}
          currentStep={currentStep}
          stepIndex={stepIndex}
          step={step}
        />
      ) : (
        <StepTitle
          stepperClassName={stepperClassName}
          completedSteps={completedSteps}
          currentStep={currentStep}
          stepIndex={stepIndex}
          step={step}
        />
      )}

      <StepperLine
        stepIndex={stepIndex}
        steps={steps}
        stepperLineClass={customized ? stepperLineClass : stepperClassName.line}
      />
    </div>
  );
};
