export const DropDownButton = ({ isOptionsOpen }) => {
  const dropDownButtonClasses = () => {
    const classes = ['drop-down-button'];

    if (isOptionsOpen) {
      classes.push('drop-down-button__up');
    }

    return classes.join(' ');
  };

  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={ dropDownButtonClasses() }>
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
};
