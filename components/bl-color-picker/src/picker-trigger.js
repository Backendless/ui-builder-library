export function PickerTrigger(props) {
  const { pickerTriggerVisibility, pickerVisibility, setPickerVisibility, currentColor } = props;

  const styles = {
    backgroundColor: currentColor,
  };

  const togglePickerVisibility = () => {
    setPickerVisibility(!pickerVisibility);
  };

  if (!pickerTriggerVisibility) {
    return null;
  }

  return (
    <button type="button" className="picker-trigger" onClick={ togglePickerVisibility }>
      <span style={ styles }/>
    </button>
  );
}
