const classes = {
  root: {
    stepper: 'bl-customComponent-stepper',
    item: 'stepper__item',
    stepTitle: 'stepper__step-title step-title',
    line: 'stepper__line',
    titleIcon: 'step-title__icon',
    titleIconActive: 'step-title__icon--active',
    titleIconText: 'step-title__icon-text',
    titleText: 'step-title__text',
    titleTextActive: 'step-title__text--active',
  },
  alternativeLabel: {
    stepper: 'bl-customComponent-stepper bl-customComponent-stepper--stepper-alternative-label',
    item: 'stepper-alternative-label__item',
    stepTitle: 'stepper-alternative-label__step-title step-alternative-label-title',
    line: 'stepper-alternative-label__line',
    titleIcon: 'step-title__icon',
    titleIconActive: 'step-title__icon--active',
    titleIconText: 'step-title__icon-text',
    titleText: 'step-alternative-label-title__text',
    titleTextActive: 'step-alternative-label-title__text--active',
  },
  customized: {
    stepper: 'bl-customComponent-stepper bl-customComponent-stepper--alternative-label',
    item: 'stepper-alternative-label__item',
    stepTitle: 'stepper-alternative-label__step-title step-alternative-label-title',
    line: 'stepper-customized__line',
    lineActive: 'stepper-customized__line--active',
    titleIcon: 'step-customized-title__icon',
    titleIconActive: 'step-customized-title__icon--active',
    titleIconComplete: 'step-customized-title__icon-complete',
    titleText: 'step-alternative-label-title__text',
    titleTextActive: 'step-alternative-label-title__text--active',
  },
};

export const useStepperClassName = (typeStepper) => {
  return classes[typeStepper];
};
