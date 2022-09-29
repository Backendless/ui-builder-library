import { useState, useEffect, useCallback, useRef } from 'react';

import { getIconHoverValue, useRatingClassList } from './helpers';
import { RatingIcon } from './rating-icon';

const iconsList = iconsAmount => new Array(iconsAmount).fill(1);

export default function RatingComponent({ component, eventHandlers }) {
  const { classList, display, disabled, style, icon, defaultValue, iconsAmount, iconColor, precision } = component;
  const { onRatingChange } = eventHandlers;

  const rootRef = useRef();
  const classes = useRatingClassList(disabled, classList);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverValue, setHoverValue] = useState();

  const icons = iconsList(iconsAmount);
  const value = hoverValue || ratingValue;

  useEffect(() => {
    setRatingValue(defaultValue);
  }, [defaultValue])

  const handleRatingValue = useCallback(({ target: { value  } }) => {
    setRatingValue(prevState => prevState === value ? 0 : value);

    if (onRatingChange) {
      onRatingChange({ curentRating: value });
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
