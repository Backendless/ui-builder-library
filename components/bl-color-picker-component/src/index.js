import { useEffect, useRef, useState } from 'react';

import { PickerContainer } from './picker-container';
import { PickerTrigger } from './picker-trigger';

const { cn } = BackendlessUI.CSSUtils;

export default function ColorPickerComponent({ component, eventHandlers }) {
  const { display, classList, pickerTriggerVisibility, selectedColor } = component;
  const { onChangeColor } = eventHandlers;

  const pickerContainerRef = useRef(null);
  const [currentColor, setCurrentColor] = useState(selectedColor);
  const [pickerVisibility, setPickerVisibility] = useState(!pickerTriggerVisibility);

  const handleClickOutsidePicker = e => {
    if (!pickerContainerRef.current.contains(e.target)) {
      setPickerVisibility(false);
    }
  };

  useEffect(() => {
    if (!pickerTriggerVisibility) {
      return;
    }

    document.addEventListener('click', handleClickOutsidePicker);

    return () => {
      document.removeEventListener('click', handleClickOutsidePicker);
    };
  }, []);

  component.openPicker = () => setPickerVisibility(true);
  component.closePicker = () => setPickerVisibility(false);

  const styles = {
    display: display ? 'block' : 'none',
  };

  return (
    <div
      ref={ pickerContainerRef }
      className={ cn(classList, 'bl-customComponent-color-picker') }
      style={ styles }>
      <PickerTrigger
        pickerTriggerVisibility={ pickerTriggerVisibility }
        pickerVisibility={ pickerVisibility }
        setPickerVisibility={ setPickerVisibility }
        currentColor={ currentColor }
      />
      <PickerContainer
        component={ component }
        setPickerVisibility={ setPickerVisibility }
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor }
        pickerVisibility={ pickerVisibility }
        onChangeColor={ onChangeColor }
      />
    </div>
  );
}
