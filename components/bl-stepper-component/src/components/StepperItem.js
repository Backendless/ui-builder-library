import { StepTitle } from './StepTitle';
import { CustomizedStepTitle } from './CustomizedStepTitle';

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
      {stepIndex !== steps.length - 1 && (
        <span className={customized ? stepperLineClass : stepperClassName.line}></span>
      )}
    </div>
  )
}
