import { icons } from './icons.js';

const halfIconStyle = { width: `50%`, overflow: 'hidden', position: 'absolute' };

export const RatingIcon = ({
  icon,
  index,
  disabled,
  ratingValue,
  onChange
}) => {
  const halfInputValue = index + 0.5;
  const inputValue = index + 1;

  return (
    <div className="bl-customComponent-ratingIcon rating-icon">
      <label
        htmlFor={halfInputValue}
        style={halfIconStyle}
        className="rating-icon__label"
      >
        <span className="rating-icon__span">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`rating-icon__svg rating-icon__svg-${icon}`}>
            <path d={ratingValue >= halfInputValue ? icons[`${icon}Active`] : icons[icon]} />
          </svg>
        </span>
      </label>
      <input
        type="radio"
        name="rating"
        value={halfInputValue}
        id={halfInputValue}
        disabled={disabled}
        checked={halfInputValue === ratingValue}
        className="rating-icon__input"
        onChange={onChange}
      />
      <label
        htmlFor={inputValue}
        className="rating-icon__label"
      >
        <span className="rating-icon__span">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`rating-icon__svg rating-icon__svg-${icon}`}>
            <path d={ratingValue >= inputValue ? icons[`${icon}Active`] : icons[icon]} />
          </svg>
        </span>
      </label>
      <input
        type="radio"
        name="rating"
        value={inputValue}
        id={inputValue}
        disabled={disabled}
        checked={inputValue === ratingValue}
        className="rating-icon__input"
        onChange={onChange}
      />
    </div>
  );
};
