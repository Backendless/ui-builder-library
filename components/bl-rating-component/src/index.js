import { useState, useCallback, useRef } from 'react';

import { useRatingClassList } from './hooks/useRatingClassList.js';
import { roundValueToPrecision } from './utils/number.js';
import { RatingIcon } from './rating-icon';

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
  const iconsArray = new Array(iconsAmount).fill(1);

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

    const rootNode = rootRef.current;
    const { left } = rootNode.getBoundingClientRect();
    const { width } = rootNode.firstChild.getBoundingClientRect();

    const precision = 0.5;
    const percent = (event.clientX - left) / (width * iconsAmount);

    setHoverValue(roundValueToPrecision(iconsAmount * percent + precision / 2, precision).toString());
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
        {iconsArray.map((_, index) => (
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
