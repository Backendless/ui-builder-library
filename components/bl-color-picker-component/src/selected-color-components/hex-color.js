import { validate, ValidHexLengths } from '../helpers/use-iro-library';

export function HexColor(props) {
  const { colorPickerRef, hexFormat, setHexFormat, borderColor, setHexInputBorderColor, backgroundColor } = props;

  const changeHex = e => {
    const hexInputValue = validate(e.target.value);

    if (ValidHexLengths.includes(hexInputValue.length)) {
      colorPickerRef.current.color.hexString = hexInputValue;
    } else {
      setHexInputBorderColor('#ff0000');
    }

    setHexFormat(hexInputValue);
  };

  const copyColorValue = () => {
    navigator.clipboard.writeText(hexFormat);
  };

  return (
    <div className="hex-type">
      <label>
        <span>HEX:</span>
        <input type="text" className="hex-input" style={{ borderColor }} value={ hexFormat } onChange={ changeHex }/>
      </label>
      <span className="current-color" style={{ backgroundColor }}/>
      <CopyButton onClick={ copyColorValue }/>
    </div>
  );
}

function CopyButton({ onClick }) {
  return (
    <i
      title="copy"
      className="copy-button material-icons-round"
      aria-hidden="true"
      onClick={ onClick }>
      content_copy
    </i>
  );
}
