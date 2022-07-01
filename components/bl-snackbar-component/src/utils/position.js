export const getHorizontal = (horizontal) => {
  if (horizontal === 'left') {
    return ' bl-customComponent-snackbar_left'
  }

  if (horizontal === 'center') {
    return ' bl-customComponent-snackbar_centerX'
  }

  return ' bl-customComponent-snackbar_right'
}

export const getVertical = (vertical) => {
  if (vertical === 'bottom') {
    return ' bl-customComponent-snackbar_bottom'
  }

  if (vertical === 'center') {
    return ' bl-customComponent-snackbar_centerY'
  }

  return ' bl-customComponent-snackbar_top'
}
