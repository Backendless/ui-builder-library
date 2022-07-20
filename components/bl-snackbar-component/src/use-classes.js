import { useMemo } from 'react'

export function useClasses(horizontalPosition, verticalPosition, type, visible) {
  return useMemo(() => {
    const classes = ['bl-customComponent-snackbar']

    if (horizontalPosition === 'left') {
      classes.push('bl-customComponent-snackbar_left')
    } else if (horizontalPosition === 'center') {
      classes.push('bl-customComponent-snackbar_centerX')
    } else {
      classes.push('bl-customComponent-snackbar_right')
    }

    if (verticalPosition === 'bottom') {
      classes.push('bl-customComponent-snackbar_bottom')
    } else if (verticalPosition === 'center') {
      classes.push('bl-customComponent-snackbar_centerY')
    } else {
      classes.push('bl-customComponent-snackbar_top')
    }

    if (type) {
      classes.push(`bl-customComponent-snackbar_${ type }`)
    }

    if (visible) {
      classes.push('bl-customComponent-snackbar_show')
    }

    return classes.join(' ')
  }, [horizontalPosition, verticalPosition, type, visible])
}
