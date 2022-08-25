import { StepTitle } from './step-title'
import { StepperLine } from './stepper-line'

const { cn } = BackendlessUI.CSSUtils

export function StepperItem(props) {
  const { customized, currentStep, steps, stepIndex, step, stepperClassNames } = props

  return (
    <div className={ stepperClassNames.item }>
      <StepTitle
        customized={ customized }
        stepperClassNames={ stepperClassNames }
        steps={ steps }
        currentStep={ currentStep }
        stepIndex={ stepIndex }
        step={ step }
      />

      <StepperLine
        stepIndex={ stepIndex }
        steps={ steps }
        stepperLineClass={ cn(stepperClassNames.line, { 'active': step.completed && customized}) }
      />
    </div>
  )
}
