import { useState, useEffect } from 'react'
import { StepperItem } from './subcomponents/stepper-item'
import { useStepperClassName } from './helpers/use-stepper-class-name'
import { useStepList } from './helpers/use-step-list'

export default function Stepper({ component, eventHandlers }) {
  const { display, classList, stepList, stepperType, countSteps } = component
  const { onStepChange } = eventHandlers

  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)

  const stepperClassNames = useStepperClassName(stepperType)
  const stepperClasses = useStepperClasses(stepperClassNames.stepper, classList)

  useEffect(() => {
    onStepChange({ currentStep: currentStep + 1 })
  }, [currentStep])

  useEffect(() => {
    setSteps(useStepList(stepList, countSteps))
  }, [stepList, countSteps])

  component.goNextStep = () => {
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1)
      steps[currentStep].completed = true
    }
  }

  component.goPrevStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(prevCurrent => prevCurrent - 1)
      steps[currentStep - 1].completed = false
    }
  }

  component.resetStep = () => {
    setCurrentStep(0)
    setSteps(steps.map(step => ({ ...step, completed: false })))
  }

  component.setStep = (stepNumber) => {
    setCurrentStep(stepNumber - 1)
    setSteps(steps.map((step, index) => {
      if (index < stepNumber - 1) {
        return { ...step, completed: true }
      } else {
        return { ...step, completed: false }
      }
    }))
  }

  if (!display) {
    return null
  }

  return (
    <div className={ stepperClasses }>
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
  )
};

const useStepperClasses = (stepperClasses, classList) => {
  const classes = [stepperClasses, ...classList]

  return classes.join(' ')
}
