import { ColorCharacter } from './color-character';

export function ColorType(props) {
  const { colorPickerRef, colorFormat, visibility, type } = props;

  if (!visibility) {
    return null;
  }

  return (
    <div className={ `${ type }-type` }>
      <ColorCharacter
        inputMarker={ type[0].toUpperCase() }
        inputValue={ colorFormat[type[0]] }
        onChange={ makeChangeHandler(colorPickerRef, type, type[0]) }
      />
      <ColorCharacter
        inputMarker={ type[1].toUpperCase() }
        inputValue={ colorFormat[type[1]] }
        onChange={ makeChangeHandler(colorPickerRef, type, type[1]) }
      />
      <ColorCharacter
        inputMarker={ type[2].toUpperCase() }
        inputValue={ colorFormat[type[2]] }
        onChange={ makeChangeHandler(colorPickerRef, type, type[2]) }
      />
    </div>
  );
}

function makeChangeHandler(colorPickerRef, type, character) {
  return e => {
    let value = e.target.value;

    if (character === 'h') {
      value = Math.min(360, Number(e.target.value));
    }

    colorPickerRef.current.color[type] = {
      ...colorPickerRef.current.color[type],
      [character]: value,
    };
  };
}
