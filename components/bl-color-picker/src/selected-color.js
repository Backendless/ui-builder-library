import { ColorOpacity, ColorType, HexColor } from './selected-color-components/index';

export function SelectedColor(props) {
  const { rgbFormatVisibility, hslFormatVisibility, opacityInputVisibility } = props.component;
  const {
    colorPickerRef,
    hexFormat,
    setHexFormat,
    rgbFormat,
    hslFormat,
    alpha,
    currentColor,
    hexInputBorderColor,
    setHexInputBorderColor,
  } = props;
  const colorFormatsVisibility = rgbFormatVisibility || hslFormatVisibility;

  return (
    <div className="selected-color">
      <HexColor
        colorPickerRef={ colorPickerRef }
        hexFormat={ hexFormat }
        setHexFormat={ setHexFormat }
        borderColor={ hexInputBorderColor }
        setHexInputBorderColor={ setHexInputBorderColor }
        backgroundColor={ currentColor }
      />
      { colorFormatsVisibility && (
        <div className="color-types">
          <ColorType
            colorPickerRef={ colorPickerRef }
            colorFormat={ rgbFormat }
            visibility={ rgbFormatVisibility }
            type="rgb"
          />
          <ColorType
            colorPickerRef={ colorPickerRef }
            colorFormat={ hslFormat }
            visibility={ hslFormatVisibility }
            type="hsl"
          />
        </div> 
      )}
      <ColorOpacity
        colorPickerRef={ colorPickerRef }
        alpha={ alpha }
        opacityInputVisibility={ opacityInputVisibility }
      />
    </div>
  );
}
