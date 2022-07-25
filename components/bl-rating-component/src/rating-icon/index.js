import { iconsMap } from '../helpers/icons';
import { FullPointControll } from './full-point-controll';
import { HalfPointControll } from './half-point-controll';

const getIcon = (ratingValue, inputValue, icon) => {
  return ratingValue >= inputValue ? iconsMap[`${icon}Active`] : iconsMap[icon];
};

export const RatingIcon = props => {
  const { icon, iconColor, index, disabled, ratingValue, precision, onChange } = props;

  const halfInputValue = index + 0.5;
  const inputValue = index + 1;

  return (
    <div className="rating-icon">
      { precision === '0.5' && (
        <HalfPointControll
          icon={ getIcon(ratingValue, halfInputValue, icon) }
          iconColor={ iconColor }
          disabled={ disabled }
          checked={ halfInputValue === ratingValue }
          inputValue={ halfInputValue }
          onChange={ onChange }
        />
      ) }
      <FullPointControll
        icon={ getIcon(ratingValue, inputValue, icon) }
        iconColor={ iconColor }
        disabled={ disabled }
        checked={ inputValue === ratingValue }
        inputValue={ inputValue }
        onChange={ onChange }
      />
    </div>
  );
};
