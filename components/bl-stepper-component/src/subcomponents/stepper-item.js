import { StepTitle } from './step-title'
import { CustomizedStepTitle } from './customized-step-title'
import { StepperLine } from './stepper-line'

export function StepperItem(props) {
  const { customized, currentStep, steps, stepIndex, step, stepperClassNames } = props
  const classes = useLineClasses(stepperClassNames, step.completed, customized)
  const Step = customized ? CustomizedStepTitle : StepTitle

  return (
    <div className={ stepperClassNames.item }>
      <Step
        stepperClassNames={ stepperClassNames }
        steps={ steps }
        currentStep={ currentStep }
        stepIndex={ stepIndex }
        step={ step }
      />

      <StepperLine
        stepIndex={ stepIndex }
        steps={ steps }
        stepperLineClass={ classes }
      />
    </div>
  )
}

const useLineClasses = (stepperClassNames, completed, customized) => {
  const classes = [stepperClassNames.line]

  if (completed && customized) {
    classes.push(stepperClassNames.lineActive)
  }

  return classes.join(' ')
}
