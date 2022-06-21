import { useCallback, useRef, useState } from 'react'

import RatingIcon from './RatingIcon.js'

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1]

  return decimalPart ? decimalPart.length : 0
}

function roundValueToPrecision(value, precision) {
  if (value == null) return value

  const nearest = Math.round(value / precision) * precision

  return Number(nearest.toFixed(getDecimalPrecision(precision)))
}

export default function MyCustomComponent({ component, eventHandlers }) {
  const { disabled, icon, defaultValue, iconsAmount, classList } = component
  const { onRatingChange, onHighestRating } = eventHandlers

  const rootRef = useRef()
  const [ratingValue, setRatingValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState()
  const iconsArray = new Array(iconsAmount).fill(1)

  const value = hoverValue || ratingValue

  const handleRatingValue = useCallback(({ target: { value } }) => {
    setRatingValue(prevState => prevState === value ? 0 : value)
    if (onRatingChange) {
      onRatingChange({ curentRating: value })
    }
    if (onHighestRating && value == iconsAmount) {
      onHighestRating({ highestRating: value })
    }
  }, [])

  const handleMouseMove = event => {
    if (disabled) return

    const rootNode = rootRef.current
    const { left } = rootNode.getBoundingClientRect()
    const { width } = rootNode.firstChild.getBoundingClientRect()

    const precision = 0.5
    const percent = (event.clientX - left) / (width * iconsAmount)

    setHoverValue(roundValueToPrecision(iconsAmount * percent + precision / 2, precision).toString())
  }

  const handleMouseLeave = () => {
    if (disabled) return

    setHoverValue()
  }

  return (
    <div className={ 'bl-customComponent-rating rating ' + classList.join(' ') }>
      <div
        ref={ rootRef }
        onMouseMove={ handleMouseMove }
        onMouseLeave={ handleMouseLeave }
        className="rating__icons">
        {iconsArray.map((_, index) => (
          <RatingIcon
            key={ index }
            icon={ icon }
            index={ index }
            disabled={ disabled }
            ratingValue={ value }
            onChange={ handleRatingValue }
          />
        ))}
      </div>
    </div>
  )
};
