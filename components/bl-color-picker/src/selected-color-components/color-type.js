import { ColorCharacter } from './color-character';

export function ColorType(props) {
  const { colorPickerRef, colorFormat, visibility, type } = props;

  if (!visibility) {
    return null;
  }

  return (
    <div className={ `${ type }-type` }>
      { type.split('').map((value, index) => (
        <ColorCharacter
          key={ index }
          inputMarker={ value.toUpperCase() }
          inputValue={ colorFormat[value] }
          onChange={ makeChangeHandler(colorPickerRef, type, value) }
        />
      ))}
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
