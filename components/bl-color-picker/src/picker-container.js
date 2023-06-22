import { useRef } from 'react';

import { useIroLibrary } from './helpers/use-iro-library';
import { SelectedColor } from './selected-color';

export function PickerContainer(options) {
  const { component, currentColor, pickerVisibility } = options;
  const { pickerTriggerVisibility, verticalColorPicker } = component;

  const elRef = useRef(null);
  const {
    colorPickerRef,
    hexFormat,
    setHexFormat,
    hexInputBorderColor,
    setHexInputBorderColor,
    rgbFormat,
    hslFormat,
    alpha,
  } = useIroLibrary(elRef, options);

  const styles = {
    display : pickerVisibility ? 'block' : 'none',
    position: pickerTriggerVisibility ? 'absolute' : 'relative',
  };

  const pickerDirection = {
    display: verticalColorPicker ? 'block' : 'flex',
  };

  return (
    <div className="picker-container" style={ styles }>
      <div style={ pickerDirection }>
        <div className="wrapper">
          <div className="picker" ref={ elRef }></div>
          <PickerHandler/>
        </div>

        <SelectedColor
          component={ component }
          colorPickerRef={ colorPickerRef }
          hexFormat={ hexFormat }
          setHexFormat={ setHexFormat }
          rgbFormat={ rgbFormat }
          hslFormat={ hslFormat }
          alpha={ alpha }
          currentColor={ currentColor }
          hexInputBorderColor={ hexInputBorderColor }
          setHexInputBorderColor={ setHexInputBorderColor }
        />
      </div>
    </div>
  );
}

function PickerHandler() {
  return (
    <svg className="picker-handler">
      <defs>
        <g id="handle">
          <circle cx="8" cy="8" r="6" fill="none" strokeWidth="2" stroke="#fff"></circle>
        </g>
      </defs>
    </svg>
  );
}
