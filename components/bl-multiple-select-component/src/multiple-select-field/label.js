export const Label = props => {
  const { multipleSelectId, placeholder, multipleSelectValue, isMultipleSelectActive } = props;
  
  const classes = () => {
    const classesList = ['label'];
    
    if (isMultipleSelectActive || multipleSelectValue.length > 0) {
      classesList.push('label__move-up');
    }
    
    return classesList.join(' ');
  };

  return (
    <label
      htmlFor={ multipleSelectId }
      className={ classes() }>
      { placeholder }
    </label>
  );
};
