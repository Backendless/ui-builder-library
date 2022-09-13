export const createStepListArray = (stepList, countSteps) => {
  const steps = stepList
    ? stepList.split(',')
    : new Array(countSteps).fill('')

  return steps.map(step => ({ content: step, completed: false }))
}
