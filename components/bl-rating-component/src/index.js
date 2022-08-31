import { useCallback, useRef, useState } from 'react';

import { getIconHoverValue, useRatingClassList } from './helpers';
import { RatingIcon } from './rating-icon';

const iconsList = iconsAmount => new Array(iconsAmount).fill(1);

export default function RatingComponent({ component, eventHandlers }) {
  const { display, disabled, icon, defaultValue, iconsAmount, iconColor, precision, classList, style } = component;
  const { onRatingChange } = eventHandlers;

  const rootRef = useRef();
  const classes = useRatingClassList(disabled, classList);
  const [ratingValue, setRatingValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState();

  const icons = iconsList(iconsAmount);
  const value = hoverValue || ratingValue;

  const handleRatingValue = useCallback(({ target: { value  } }) => {
    setRatingValue(prevState => prevState === value ? 0 : value);

    if (onRatingChange) {
      const eventContext = {
        curentRating: value,
      };

      if (Number(value) === iconsAmount) {
        eventContext.maxRating = value;
      }

      if (value === precision) {
        eventContext.minRating = value;
      }

      onRatingChange(eventContext);
    }
  }, []);

  const handleMouseMove = event => {
    if (disabled) {
      return;
    }

    getIconHoverValue(rootRef.current, iconsAmount, event.clientX, setHoverValue, precision);
  };

  const handleMouseLeave = () => {
    if (disabled) {
      return;
    }

    setHoverValue(null);
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ classes } style={ style }>
      <div
        ref={ rootRef }
        onMouseMove={ handleMouseMove }
        onMouseLeave={ handleMouseLeave }
        className="bl-customComponent-rating__icons">
        { icons.map((_, index) => (
          <RatingIcon
            key={ index }
            icon={ icon }
            iconColor={ iconColor }
            index={ index }
            disabled={ disabled }
            ratingValue={ value }
            precision={ precision }
            onChange={ handleRatingValue }
          />
        )) }
      </div>
    </div>
  );
};
