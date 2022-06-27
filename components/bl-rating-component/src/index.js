import { useState, useRef, useMemo, useCallback } from 'react';

import { RatingIcon } from './rating-icon.js';
import { roundValueToPrecision } from './utils/number';

export default function RatingComponent({ component, eventHandlers }) {
  const { disabled, icon, defaultValue, iconsAmount, classList } = component;
  const { onRatingChange } = eventHandlers;

  const rootRef = useRef();
  const [ratingValue, setRatingValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState();
  const iconsArray = new Array(iconsAmount).fill(1);

  const value = hoverValue || ratingValue;

  const handleRatingValue = useCallback(({ target: { value } }) => {
    setRatingValue(prevState => prevState === value ? 0 : value);

    if (onRatingChange) {
      onRatingChange({ curentRating: value });

      if (value == iconsAmount) {
        onRatingChange({ maxRating: value });
      }

      if (value == 0.5) {
        onRatingChange({ maxRating: value });
      }
    }

  }, []);

  const handleMouseMove = (event) => {
    if (disabled) return;

    const rootNode = rootRef.current;
    const { left } = rootNode.getBoundingClientRect();
    const { width } = rootNode.firstChild.getBoundingClientRect();

    const precision = 0.5;
    const percent = (event.clientX - left) / (width * iconsAmount);

    setHoverValue(roundValueToPrecision(iconsAmount * percent + precision / 2, precision).toString());
  };

  const handleMouseLeave = () => {
    if (disabled) return;

    setHoverValue();
  };

  const classes = useMemo(() => {
    const classesArray = ["bl-customComponent-rating", ...classList];

    if (disabled) {
      classesArray.push('disabled');
    }

    return classesArray.join(' ');
  }, [classList, disabled]);

  return (
    <div className={classes}>
      <div
        ref={rootRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bl-customComponent-rating__icons">
        {iconsArray.map((_, index) => (
          <RatingIcon
            key={index}
            icon={icon}
            index={index}
            disabled={disabled}
            ratingValue={value}
            onChange={handleRatingValue}
          />
        ))}
      </div>
    </div>
  );
};
