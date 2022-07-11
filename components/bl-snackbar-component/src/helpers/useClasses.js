import { useMemo } from 'react'

export const useClasses = (horizontalPosition, verticalPosition, type, visible) => {
  return useMemo(() => {
    let text = 'bl-customComponent-snackbar'

    if (horizontalPosition === 'left') {
      text += ' bl-customComponent-snackbar_left'
    } else if (horizontalPosition === 'center') {
      text += ' bl-customComponent-snackbar_centerX'
    } else {
      text += ' bl-customComponent-snackbar_right'
    }

    if (verticalPosition === 'bottom') {
      text += ' bl-customComponent-snackbar_bottom'
    } else if (verticalPosition === 'center') {
      text += ' bl-customComponent-snackbar_centerY'
    } else {
      text += ' bl-customComponent-snackbar_top'
    }

    if (type) {
      text += ` bl-customComponent-snackbar_${ type }`
    }

    if (visible) {
      text += ' bl-customComponent-snackbar_show'
    }

    return text
  }, [horizontalPosition, verticalPosition, type, visible])
}
