import { useMemo, useState, useEffect } from 'react';
import { StepperItem } from './components/stepper-item';
import { useStepperClassName } from './hooks/use-stepper-class-name'

export default function MyCustomComponent({ component, eventHandlers }) {
  const { stepList, display, stepperType, countSteps } = component;
  const { onStepChange } = eventHandlers;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const stepperClassName = useStepperClassName(stepperType);

  useEffect(() => {
    onStepChange();
  }, [currentStep]);

  const steps = useMemo(() => {
    console.log(stepList);
    if (!stepList) {
      console.log('createArray', countSteps);
      return new Array(countSteps).fill(' ');
    }

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

  if (!display) {
    return null;
  }

  return (
    <div className="bl-customComponent-stepper">
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
    </div>
  );
};
