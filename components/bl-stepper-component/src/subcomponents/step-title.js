import { StepTitleContent } from './step-title-content'

const { cn } = BackendlessUI.CSSUtils

export function StepTitle(props) {
  const { steps, currentStep, stepIndex, step, stepperClassNames, customized } = props

  const isActive = stepIndex === currentStep || steps[stepIndex].completed

  return (
    <div className={ stepperClassNames.stepTitle }>
      { customized ? (
        <StepCustomizedTitleIcon step={ step } isActive={ isActive }/>
      ) : (
        <StepTitleIcon
          isActive={ isActive }
          stepperClassNames={ stepperClassNames }
          step={ step }
          stepIndex={ stepIndex }
        />
      ) }

      <StepTitleContent
        titleTextClass={ cn(stepperClassNames.titleText, { 'active': isActive }) }
        content={ step.content }
      />
    </div>
  )
}

const StepTitleIcon = ({ isActive, stepperClassNames, step, stepIndex }) => (
  step.completed ? (
    <svg
      className={ cn(stepperClassNames.titleIcon, { 'active': isActive }) }
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
    </svg>
  ) : (
    <svg
      className={ cn(stepperClassNames.titleIcon, { 'active': isActive }) }
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
  )
)

const StepCustomizedTitleIcon = ({ step, isActive }) => (
  step.completed ? (
    <svg
      className="step-customized-title__icon-complete"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </svg>
  ) : (
    <div className="step-customized-title__icon-mark-container">
      <div className={ cn('step-customized-title__icon', { 'active': isActive }) }></div>
    </div>
  )
)
