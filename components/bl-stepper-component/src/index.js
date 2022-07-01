import React, { useMemo, useState } from 'react';
import { StepperItem } from './components/StepperItem';
import { useStepperClassName } from './hooks/useStepperClassName';

export default function MyCustomComponent({ component, eventHandlers }) {
  const { stepList, display, stepperType } = component;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const stepperClassName = useStepperClassName(stepperType);

  const steps = useMemo(() => {
    if (typeof stepList === 'string') {
      return stepList.split(',');
    }

    return stepList;
  }, [stepList]);

  component.goNextStep = () => {
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1);
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  };

  component.goPrevStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(prevCurrent => prevCurrent - 1);
      setCompletedSteps(prevCompletedSteps => prevCompletedSteps.filter(step => step !== currentStep - 1));
    }
  };

  component.resetStep = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  if (!steps || !display) {
    return null;
  }

  return (
    <div className={stepperClassName.stepper}>
      {steps.map((step, index) => (
        <StepperItem
          customized={stepperType === 'customized'}
          stepperClassName={stepperClassName}
          completedSteps={completedSteps}
          currentStep={currentStep}
          steps={steps}
          stepIndex={index}
          step={step}
        />
      ))}
    </div>
  );
};
