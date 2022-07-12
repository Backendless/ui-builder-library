export const useStepList = (stepList, countSteps) => {
  let steps;

  if (!stepList) {
    return new Array(countSteps).fill(' ');
  }

  if (typeof stepList === 'string') {
    steps = stepList.split(',');
  }

  return steps.map(step => ({content: step, completed: false}));
};
