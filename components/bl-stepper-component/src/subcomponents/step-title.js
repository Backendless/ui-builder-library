import { StepTitleContent } from './step-title-content';

const { cn } = BackendlessUI.CSSUtils;

export function StepTitle(props) {
  const { steps, currentStep, stepIndex, step, stepperClassNames, customized } = props;

  const isActive = stepIndex === currentStep || steps[stepIndex].completed;

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
  );
}

function StepTitleIcon({ isActive, stepperClassNames, step, stepIndex }) {
  if (step.completed) {
    return <IconComplete stepperClassNames={ stepperClassNames }/>;
  }

  return (
    <Icon
      stepIndex={ stepIndex }
      isActive={ isActive }
      stepperClassNames={ stepperClassNames }
    />
  );
}

function Icon({ stepperClassNames, isActive, stepIndex }) {
  return (
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
  );
}

function IconComplete({ stepperClassNames }) {
  return (
    <svg
      className={ cn(stepperClassNames.titleIcon, 'active') }
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
    </svg>
  );
}

function StepCustomizedTitleIcon({ step, isActive }) {
  if (step.completed) {
    return <CustomizedIconComplete/>;
  }

  return (
    <div className="step-customized-title__icon-mark-container">
      <div className={ cn('step-customized-title__icon', { 'active': isActive }) }></div>
    </div>
  );
}

function CustomizedIconComplete() {
  return (
    <svg
      className="step-customized-title__icon-complete"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </svg>
  );
}
