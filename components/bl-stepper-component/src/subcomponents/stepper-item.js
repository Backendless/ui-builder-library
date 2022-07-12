import { StepTitle } from './step-title';
import { CustomizedStepTitle } from './customized-step-title';
import { StepperLine } from './stepper-line';

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

  if (step.completed) {
    stepperLineClass += ' ' + stepperClassName.lineActive;
  }

  return (
    <div className={stepperClassName.item}>
      {customized ? (
        <CustomizedStepTitle
          stepperClassName={stepperClassName}
          steps={steps}
          currentStep={currentStep}
          stepIndex={stepIndex}
          step={step}
        />
      ) : (
        <StepTitle
          stepperClassName={stepperClassName}
          steps={steps}
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
