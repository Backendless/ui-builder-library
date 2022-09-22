import { useEffect, useRef, useState } from 'react';

import iro from '../lib/iro.min';

const DEFAULT_COLOR = '#ff0000';

export const ValidHexLengths = { 4: true, 7: true, 9: true };

export function useIroLibrary(elRef, options) {
  const { component, setCurrentColor, onChangeColor } = options;
  const { selectedColor, verticalColorPicker, circleColorPicker, opacitySliderVisibility } = component;

  const [hexFormat, setHexFormat] = useState('');
  const [hexInputBorderColor, setHexInputBorderColor] = useState('');
  const [rgbFormat, setRgbFormat] = useState({});
  const [hslFormat, setHslFormat] = useState({});
  const [alpha, setAlpha] = useState(1);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    colorPickerRef.current = new iro.ColorPicker(elRef.current, {
      width          : 150,
      color          : selectedColor || DEFAULT_COLOR,
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

  useEffect(() => {
    if (!selectedColor) {
      return;
    }

    const selectedColorValue = validate(selectedColor);

    if (ValidHexLengths[selectedColorValue.length]) {
      colorPickerRef.current.color.hexString = selectedColorValue;
    }
  }, [selectedColor]);

  return {
    colorPickerRef,
    hexFormat,
    setHexFormat,
    hexInputBorderColor,
    setHexInputBorderColor,
    rgbFormat,
    hslFormat,
    alpha,
  };
}

export function validate(value) {
  return value.replace(/#/g, '').replace(/(.*)/, '#$1');
}
