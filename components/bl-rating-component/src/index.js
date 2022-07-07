import { useCallback, useRef, useState } from 'react';

import { useRatingClassList } from './hooks/useRatingClassList';
import { iconParams } from './utils/icon-params';
import { iconsList } from './utils/icons-list.js';
import { roundValueToPrecision } from './utils/number';
import { RatingIcon } from './rating-icon';

const RATING_PRECISION = 0.5;

export default function RatingComponent({
  component, eventHandlers,
}) {
  const {
    display,
    disabled,
    icon,
    iconColor,
    defaultValue,
    iconsAmount,
    classList,
  } = component;
  const { onRatingChange } = eventHandlers;
  const classes = useRatingClassList(disabled, classList);

  const rootRef = useRef();
  const [ratingValue, setRatingValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState();
  const icons = iconsList(iconsAmount);

  const value = hoverValue || ratingValue;

  if (!display) {
    return null;
  }

  const handleRatingValue = useCallback(({ target: { value  } }) => {
    setRatingValue(prevState => prevState === value ? 0: value);

    if (onRatingChange) {
      onRatingChange({ curentRating: value });

      if (Number(value) === iconsAmount) {
        onRatingChange({ maxRating: value });
      }

      if (Number(value) === 0.5) {
        onRatingChange({ maxRating: value });
      }
    }

  }, []);

  const handleMouseMove = event => {
    if (disabled) {
      return;
    }

    const [left, width] = iconParams(rootRef.current);

    const percent = (event.clientX - left) / (width * iconsAmount);

    setHoverValue(roundValueToPrecision(iconsAmount * percent + RATING_PRECISION / 2, RATING_PRECISION).toString());
  };

  const handleMouseLeave = () => {
    if (disabled) {
      return;
    }

    setHoverValue();
  };

  return (
    <div className={ classes }>
      <div
        ref={ rootRef }
        onMouseMove={ handleMouseMove }
        onMouseLeave={ handleMouseLeave }
        className="bl-customComponent-rating__icons">
        {icons.map((_, index) => (
          <RatingIcon
            key={ index }
            icon={ icon }
            iconColor={ iconColor }
            index={ index }
            disabled={ disabled }
            ratingValue={ value }
            onChange={ handleRatingValue }
          />
        ))}
      </div>
    </div>
  );
};
