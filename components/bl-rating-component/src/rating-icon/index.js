import { icons } from '../icons.js';
import { FullPointControll, HalfPointControll } from './components';

export const RatingIcon = ({
  icon,
  iconColor,
  index,
  disabled,
  ratingValue,
  onChange,
}) => {
  const halfInputValue = index + 0.5;
  const inputValue = index + 1;

  return (
    <div className="rating-icon">
      <HalfPointControll
        icon={ ratingValue >= halfInputValue ? icons[`${icon}Active`] : icons[icon] }
        iconColor={ iconColor }
        disabled={ disabled }
        checked={ halfInputValue === ratingValue }
        inputValue={ halfInputValue }
        onChange={ onChange }
      />
      <FullPointControll
        icon={ ratingValue >= inputValue ? icons[`${icon}Active`] : icons[icon] }
        iconColor={ iconColor }
        disabled={ disabled }
        checked={ inputValue === ratingValue }
        inputValue={ inputValue }
        onChange={ onChange }
      />
    </div>
  );
};
