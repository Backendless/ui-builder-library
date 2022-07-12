import { useState, useEffect } from 'react';
import { StepperItem } from './subcomponents/stepper-item';
import { useStepperClassName } from './helpers/use-stepper-class-name';
import { useStepList } from './helpers/use-step-list';

export default function MyCustomComponent({ component, eventHandlers }) {
  const { stepList, display, stepperType, countSteps } = component;
  const { onStepChange } = eventHandlers;

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const stepperClassName = useStepperClassName(stepperType);

  useEffect(() => {
    onStepChange();
  }, [currentStep]);

  useEffect(() => {
    setSteps(useStepList(stepList, countSteps));
  }, [stepList, countSteps]);

  component.goNextStep = () => {
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1);
      steps[currentStep].completed = true;
    }
  };

  component.goPrevStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(prevCurrent => prevCurrent - 1);
      steps[currentStep - 1].completed = false;
    }
  };

  component.resetStep = () => {
    setCurrentStep(0);
    setSteps(steps.map(step => ({...step, completed: false})));
  };

  component.goStep = (inputStep) => {
    setCurrentStep(inputStep - 1);
    setSteps(steps.map((step, index) => {
      if (index < inputStep - 1) {
        return {...step, completed: true};
      } else {
        return {...step, completed: false};
      }
    }));
  };

  if (!display) {
    return null;
  }

  return (
    <div className={stepperClassName.stepper}>
      {steps.map((step, index) => (
        <StepperItem
          customized={stepperType === 'customized'}
          stepperClassName={stepperClassName}
          currentStep={currentStep}
          steps={steps}
          stepIndex={index}
          step={step}
        />
      ))}
    </div>
  );
};
