export const useStepList = (stepList, countSteps) => {
  let steps

  if (!stepList) {
    steps = new Array(countSteps).fill('')
  } else {
    steps = stepList.split(',')
  }

  return steps.map(step => ({ content: step, completed: false }))
}
