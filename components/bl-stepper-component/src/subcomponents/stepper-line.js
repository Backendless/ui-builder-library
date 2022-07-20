export function StepperLine(props) {
  const { stepIndex, steps, stepperLineClass } = props

  if (stepIndex === steps.length - 1) {
    return null
  }

  return (
    <span className={ stepperLineClass }></span>
  )
}
