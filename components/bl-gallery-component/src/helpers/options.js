export const handleOptions = (component, defaultOptions) => {
  const {
    imageLabel,
    separator,
    fadeDuration,
    imageFadeDuration,
    positionFromTop,
    resizeDuration,
  } = component

  return {
    imageLabel       : imageLabel || defaultOptions.IMAGE_LABEL,
    separator        : separator || defaultOptions.SEPARATOR,
    fadeDuration     : fadeDuration || defaultOptions.FADE_DURATION,
    imageFadeDuration: imageFadeDuration || defaultOptions.IMAGE_FADE_DURATION,
    positionFromTop  : positionFromTop || defaultOptions.POSITION_FROM_TOP,
    resizeDuration   : resizeDuration || defaultOptions.RESIZE_DURATION,
  }
}
