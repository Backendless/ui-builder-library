export const StepperLine = (props) => {
  const {
    stepIndex,
    steps,
    stepperLineClass,
  } = props;

  return (
    <>
      {stepIndex !== steps.length - 1 && (
        <span className={stepperLineClass}></span>
      )}
    </>
  );
};
