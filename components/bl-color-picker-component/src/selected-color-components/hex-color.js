export function HexColor(props) {
  const {
    colorPickerRef,
    hexFormat,
    setHexFormat,
    hexInputBorderColor,
    setHexInputBorderColor,
    currentColor,
  } = props;

  const changeHex = e => {
    let hexInputValue = e.target.value;
    const validHexLengths = [4, 7, 9];

    if (hexInputValue[0] === '#' && hexInputValue[1] === '#') {
      hexInputValue = hexInputValue.slice(1);
    } else if (hexInputValue[0] !== '#') {
      hexInputValue = '#' + hexInputValue;
    }

    if (validHexLengths.includes(hexInputValue.length)) {
      colorPickerRef.current.color.hexString = hexInputValue;
    } else {
      setHexInputBorderColor('#ff0000');
    }

    setHexFormat(hexInputValue);
  };

  const copyColorValue = () => {
    navigator.clipboard.writeText(hexFormat);
  };

  const styles = {
    borderColor: hexInputBorderColor,
  };

  return (
    <div className="hex-type">
      <label>
        <span>HEX:</span>
        <input type="text" className="hex-input" style={ styles } value={ hexFormat } onChange={ changeHex }/>
      </label>
      <span className="current-color" style={{ backgroundColor: currentColor }}/>
      <i
        title="copy"
        className="copy-button material-icons-round"
        aria-hidden="true"
        onClick={ copyColorValue }>
        content_copy
      </i>
    </div>
  );
}
