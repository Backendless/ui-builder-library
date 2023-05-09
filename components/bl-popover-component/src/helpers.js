const ARROW_SIZE = 10;

const Position = {
  TOP   : 'top',
  RIGHT : 'right',
  LEFT  : 'left',
  BOTTOM: 'bottom',
};

export const translatePopover = (targetRef, contentElement, position) => {
  const targetHorizontalCenter = targetRef.clientHeight / 2;
  const contentHorizontalCenter = contentElement.clientHeight / 2;
  const targetVerticalCenter = targetRef.clientWidth / 2;
  const contentVerticalCenter = contentElement.clientWidth / 2;

  const {
    width: targetWidth, height: targetHeight,
    x    : targetX, y: targetY,
    right: targetRight, bottom: targetBottom,
  } = targetRef.getBoundingClientRect();
  const { width: contentWidth, height: contentHeight } = contentElement.getBoundingClientRect();

  const ShiftHandler = {
    [Position.RIGHT] : {
      top      : '50%',
      transform: 'translateY(-50%)',
      left     : `${ targetWidth + ARROW_SIZE }px`,
    },
    [Position.LEFT]  : {
      top      : '50%',
      transform: 'translateY(-50%)',
      right    : `${ targetWidth + ARROW_SIZE }px`,
    },
    [Position.TOP]   : {
      left     : '50%',
      transform: 'translateX(-50%)',
      bottom   : `${ targetHeight + ARROW_SIZE }px`,
    },
    [Position.BOTTOM]: {
      left     : '50%',
      transform: 'translateX(-50%)',
      top      : `${ targetHeight + ARROW_SIZE }px`,
    },
  };

  const PositionValidator = {
    [Position.LEFT]  : () => {
      return targetX >= contentWidth
        && (targetY + targetHorizontalCenter) >= contentHorizontalCenter
        && window.innerHeight - targetBottom + targetHorizontalCenter >= contentHorizontalCenter;
    },
    [Position.RIGHT] : () => {
      return document.documentElement.clientWidth - targetRight >= contentWidth
        && (targetY + targetHorizontalCenter) >= contentHorizontalCenter
        && window.innerHeight - targetBottom + targetHorizontalCenter >= contentHorizontalCenter;
    },
    [Position.TOP]   : () => {
      return targetY >= contentHeight
        && (targetX + targetVerticalCenter) >= contentVerticalCenter
        && document.documentElement.clientWidth - targetRight + targetVerticalCenter >= contentVerticalCenter;
    },
    [Position.BOTTOM]: () => {
      return window.innerHeight - targetBottom >= contentHeight
        && (targetX + targetVerticalCenter) >= contentVerticalCenter
        && document.documentElement.clientWidth - targetRight + targetVerticalCenter >= contentVerticalCenter;
    },
  };

  return validatePosition(position, PositionValidator, ShiftHandler);
};

const validatePosition = (position, PositionValidator, ShiftHandler) => {
  if (PositionValidator[position]()) {
    return { style: ShiftHandler[position], newPosition: position };
  }

  for (const side of Object.values(Position)) {
    if (position !== side) {
      if (PositionValidator[side]()) {
        return { style: ShiftHandler[side], newPosition: side };
      }
    }
  }

  return { style: ShiftHandler[position], newPosition: position };
};
