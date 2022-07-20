export const useActiveClassName = (currentStep, stepIndex, steps, stepperClassNames) => {
  const svgIconClass = [stepperClassNames.titleIcon]
  const titleTextClass = [stepperClassNames.titleText]

  if (stepIndex === currentStep || steps[stepIndex].completed) {
    svgIconClass.push(stepperClassNames.titleIconActive)
    titleTextClass.push(stepperClassNames.titleTextActive)
  }

  return { svgIconClass: svgIconClass.join(' '), titleTextClass: titleTextClass.join(' ') }
}
