import { useEffect, useRef, useState } from 'react';

import iro from './lib/iro.min';
import { SelectedColor } from './selected-color';

export function PickerContainer(props) {
  const { component, onChangeColor, currentColor, setCurrentColor, pickerVisibility } = props;
  const {
    selectedColor,
    verticalColorPicker,
    circleColorPicker,
    opacitySliderVisibility,
    pickerTriggerVisibility,
  } = component;

  const elRef = useRef(null);
  const colorPickerRef = useRef(null);
  const [hexFormat, setHexFormat] = useState('');
  const [rgbFormat, setRgbFormat] = useState({});
  const [hslFormat, setHslFormat] = useState({});
  const [alpha, setAlpha] = useState(1);
  const [hexInputBorderColor, setHexInputBorderColor] = useState('');

  useEffect(() => {
    colorPickerRef.current = new iro.ColorPicker(elRef.current, {
      width          : 150,
      color          : selectedColor,
      layoutDirection: !verticalColorPicker && 'horizontal',
      handleSvg      : '#handle',
      layout         : [
        {
          component: circleColorPicker ? iro.ui.Wheel : iro.ui.Box,
          options  : {
            wheelLightness: false,
          },
        },
        {
          component: !circleColorPicker && iro.ui.Slider,
          options  : {
            sliderType: 'hue',
          },
        },
        {
          component: circleColorPicker && iro.ui.Slider,
          options  : {
            sliderType: 'value',
          },
        },
        {
          component: opacitySliderVisibility && iro.ui.Slider,
          options  : {
            sliderType: 'alpha',
          },
        },
      ],
    });

    colorPickerRef.current.on(['color:init', 'color:change'], function(color) {
      setHexFormat(color.hexString);
      setRgbFormat(color.rgb);
      setHslFormat(color.hsl);
      setAlpha(color.alpha);
      setCurrentColor(color.hex8String);
      setHexInputBorderColor('');

      component.selectedColor = color.hex8String;

      if (onChangeColor) {
        const selectedColor = color.hex8String;
        onChangeColor({ selectedColor });
      }
    });
  }, []);

  const styles = {
    display : pickerVisibility ? 'block' : 'none',
    position: pickerTriggerVisibility ? 'absolute' : 'relative',
  };

  return (
    <div className="picker-container" style={ styles }>
      <div style={{ display: verticalColorPicker ? 'block' : 'flex' }}>
        <div className="wrapper">
          <div className="picker" ref={ elRef }></div>
          <svg className="picker-handler">
            <defs>
              <g id="handle">
                <circle cx="8" cy="8" r="6" fill="none" strokeWidth="2" stroke="#fff"></circle>
              </g>
            </defs>
          </svg>
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
