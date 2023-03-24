import { useEffect, useState } from 'react';

import { classes } from './helpers/class-names';
import { createStepListArray } from './helpers/createStepListArray';
import { StepperItem } from './subcomponents/stepper-item';

const { cn } = BackendlessUI.CSSUtils;

export default function Stepper({ component, eventHandlers }) {
  const { display, classList, stepList, stepperType, countSteps } = component;
  const { onStepChange } = eventHandlers;

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const stepperClassNames = classes[stepperType];

  useEffect(() => {
    onStepChange({ currentStep: currentStep + 1 });
  }, [currentStep]);

  useEffect(() => {
    setSteps(createStepListArray(stepList, countSteps));
  }, [stepList, countSteps]);

  component.goNextStep = () => {
    if (currentStep !== steps.length) {
      setCurrentStep(prev => prev + 1);
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
    setSteps(steps.map(step => ({ ...step, completed: false })));
  };

  component.setStep = nextStep => {
    if (inRange(nextStep, steps)) {
      setCurrentStep(nextStep - 1);
      setSteps(steps => updateCompletedSteps(steps, nextStep));
    } else {
      console.error(
        `Invalid step "${ nextStep }". Please, choose the step in range ${ 1 } - ${ steps.length + 1 }`
      );
    }
  };

  component.getCurrentStep = () => currentStep + 1;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn(stepperClassNames.stepper, classList) }>
      { steps.map((step, index) => (
        <StepperItem
          customized={ stepperType === 'customized' }
          stepperClassNames={ stepperClassNames }
          currentStep={ currentStep }
          steps={ steps }
          stepIndex={ index }
          step={ step }
        />
      )) }
    </div>
  );
}

const inRange = (nextStep, steps) => nextStep <= steps.length + 1 && nextStep > 0;

const updateCompletedSteps = (steps, nextStep) => steps.map((step, index) => {
  const completed = index < nextStep - 1;

  return { ...step, completed };
});
