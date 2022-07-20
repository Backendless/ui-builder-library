import { useMemo } from 'react'
import { useActiveClassName } from '../helpers/use-active-class-name'
import { StepTitleContent } from './step-title-content'

export function StepTitle(props) {
  const { steps, currentStep, stepIndex, step, stepperClassNames } = props

  const { svgIconClass, titleTextClass } = useMemo(() => {
    return useActiveClassName(currentStep, stepIndex, steps, stepperClassNames)
  }, [stepIndex, currentStep, steps])

  return (
    <div className={ stepperClassNames.stepTitle }>
      { step.completed
        ? <StepTitleItemCompleted
          svgIconClass={ svgIconClass }
          titleTextClass={ titleTextClass }
          step={ step }
        />
        : <StepTitleItem
          svgIconClass={ svgIconClass }
          titleTextClass={ titleTextClass }
          stepperClassNames={ stepperClassNames }
          step={ step }
          stepIndex={ stepIndex }
        />
      }
    </div>
  )
}

function StepTitleItem(props) {
  const { svgIconClass, stepperClassNames, titleTextClass, step, stepIndex } = props

  return (
    <>
      <svg
        className={ svgIconClass }
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="12"></circle>
        <text
          className={ stepperClassNames.titleIconText }
          x="12"
          y="12"
          text-anchor="middle"
          dominant-baseline="central"
        >
          { stepIndex + 1 }
        </text>
      </svg>
      <StepTitleContent
        titleTextClass={ titleTextClass }
        content={ step.content }
      />
    </>
  )
}

function StepTitleItemCompleted(props) {
  const { svgIconClass, titleTextClass, step } = props

  return (
    <>
      <svg
        className={ svgIconClass }
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
      </svg>
      <StepTitleContent
        titleTextClass={ titleTextClass }
        content={ step.content }
      />
    </>
  )
}
