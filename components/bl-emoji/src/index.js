import { useState, useMemo } from 'react';

import EmojiPicker from './emoji-picker-react.min.js';

const { cn, normalizeDimensionValue } = BackendlessUI.CSSUtils;

export default function EmojiComponent({ component, eventHandlers, elRef }) {
  const {
    classList, style, display, disabled, buttonColor, buttonSize,
    dropdownHeight, dropdownWidth, dropdownPosition, theme, emojiStyle, searchDisabled
  } = component;
  const { onEmojiSelect } = eventHandlers;

  const [pickerVisibility, setPickerVisibility] = useState(false);

  const validButtonSize = useMemo(() => normalizeDimensionValue(buttonSize), [buttonSize]);
  const validDropdownWidth = useMemo(() => normalizeDimensionValue(dropdownWidth), [dropdownWidth]);
  const validDropdownHeight = useMemo(() => normalizeDimensionValue(dropdownHeight), [dropdownHeight]);

  const handleEmojiButtonClick = () => {
    setPickerVisibility(prevState => !prevState);
  };

  const handleEmojiClick = event => {
    const { emoji, names } = event;

    navigator.clipboard.writeText(emoji);
    onEmojiSelect({ emoji, emojiNames: names });
  };

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ style }
      className={
        cn("bl-customComponent-emoji", classList, { "bl-customComponent-emoji--disabled": disabled })
      }>
      <div className="emoji-picker">
        <div onClick={ handleEmojiButtonClick } className="emoji-picker__button">
          { pickerVisibility ? (
            <svg width={ validButtonSize } height={ validButtonSize } viewBox="0 0 512 512" fill={ buttonColor }>
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm349.5 52.4c18.7-4.4 35.9 12 25.5 28.1C350.4 374.6 306.3 400 255.9 400s-94.5-25.4-119.1-63.5c-10.4-16.1 6.8-32.5 25.5-28.1c28.9 6.8 60.5 10.5 93.6 10.5s64.7-3.7 93.6-10.5zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm165.8 21.7c-7.6 8.1-20.2 8.5-28.3 .9s-8.5-20.2-.9-28.3c14.5-15.5 35.2-22.3 54.6-22.3s40.1 6.8 54.6 22.3c7.6 8.1 7.1 20.7-.9 28.3s-20.7 7.1-28.3-.9c-5.5-5.8-14.8-9.7-25.4-9.7s-19.9 3.8-25.4 9.7z" />
            </svg>
          ) : (
            <svg width={ validButtonSize } height={ validButtonSize } viewBox="0 0 512 512" fill={ buttonColor }>
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
          ) }
        </div>
        { pickerVisibility &&
          <div className={ cn("emoji-picker__dropdown", `emoji-picker__dropdown-position--${ dropdownPosition }`) }>
            <EmojiPicker
              theme={ theme }
              emojiStyle={ emojiStyle }
              width={ validDropdownWidth }
              height={ validDropdownHeight }
              searchDisabled={ searchDisabled }
              onEmojiClick={ handleEmojiClick }
            />
          </div>
        }
      </div>
    </div>
  );
}
