import { useMemo } from 'react'
import { useActiveClassName } from '../helpers/use-active-class-name'
import { StepTitleContent } from './step-title-content'

export function CustomizedStepTitle(props) {
  const { steps, currentStep, stepIndex, step, stepperClassNames } = props

  const { svgIconClass, titleTextClass } = useMemo(() => {
    return useActiveClassName(currentStep, stepIndex, steps, stepperClassNames)
  }, [stepIndex, currentStep, steps])

  return (
    <div className="stepper-alternative-label__step-alternative-label-title step-alternative-label-title">
      { step.completed
        ? <CustomizedStepTitleItemCompleted
          titleTextClass={ titleTextClass }
          step={ step }
        />
        : <CustomizedStepTitleItem
          svgIconClass={ svgIconClass }
          titleTextClass={ titleTextClass }
          step={ step }
        />
      }
    </div>
  )
}

function CustomizedStepTitleItem(props) {
  const { svgIconClass, titleTextClass, step } = props

  return (
    <>
      <div className="step-customized-title__icon-mark-container">
        <div className={ svgIconClass }></div>
      </div>
      <StepTitleContent
        titleTextClass={ titleTextClass }
        content={ step.content }
      />
    </>
  )
}

function CustomizedStepTitleItemCompleted(props) {
  const { titleTextClass, step } = props

  return (
    <>
      <svg
        className="step-customized-title__icon-complete"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
      </svg>
      <StepTitleContent
        titleTextClass={ titleTextClass }
        content={ step.content }
      />
    </>
  )
}
