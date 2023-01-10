const { cn } = BackendlessUI.CSSUtils

export default function TotopComponent({ component }) {
  const { style, classList, offset, position, backgroundColor, color, size, padding, indent, element } = component

  style.backgroundColor = backgroundColor
  style.padding = padding
  style.bottom = indent

  if (position === 'bottom-right') {
    style.right = indent
  } else {
    style.left = indent
  }

  const iconStyles = {
    width: size,
    height: size,
    fill: color,
  }

  const handleScroll = () => {
    if (element && element.el) {
      window.scrollTo({
        top: element.el.offsetTop + offset,
        behavior: 'smooth',
      })
    } else {
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={ cn('bl-customComponent-totop', classList) } style={ style } onClick={ handleScroll }>
      <TotopIcon iconStyles={ iconStyles } />
    </div>
  )
}

function TotopIcon({ iconStyles }) {
  return (
    <div className="totop__icon" style={ iconStyles }>
      <svg viewBox="0 0 330 330">
      <path
          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
        />
      </svg>
    </div>
  )
}
