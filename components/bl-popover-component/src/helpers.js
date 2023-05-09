import { useEffect, useRef } from 'react';

const Position = {
  TOP   : 'top',
  RIGHT : 'right',
  LEFT  : 'left',
  BOTTOM: 'bottom',
};

export const translatePopover = (targetRef, contentElement, position) => {
  const contentOffset = getOffset(contentElement);
  const targetOffset = getOffset(targetRef);

  const targetHorizontalCenter = targetRef.clientHeight / 2;
  const contentHorizontalCenter = contentElement.clientHeight / 2;
  const targetVerticalCenter = targetRef.clientWidth / 2;
  const contentVerticalCenter = contentElement.clientWidth / 2;

  const horizontalTopShift = targetOffset.top - contentOffset.top + targetHorizontalCenter - contentHorizontalCenter;
  const verticalLeftShift = targetOffset.left + targetVerticalCenter - contentVerticalCenter;

  const {
    width: targetWidth, height: targetHeight,
    x    : targetX, y: targetY,
    right: targetRight, bottom: targetBottom,
  } = targetRef.getBoundingClientRect();
  const { width: contentWidth, height: contentHeight } = contentElement.getBoundingClientRect();

  const ShiftHandler = {
    [Position.RIGHT] : {
      topShift : horizontalTopShift,
      leftShift: targetOffset.left + targetWidth + contentElement.firstChild.clientHeight + contentOffset.left,
    },
    [Position.LEFT]  : {
      topShift : horizontalTopShift,
      leftShift: targetOffset.left - contentWidth - contentElement.firstChild.clientHeight + contentOffset.left,
    },
    [Position.TOP]   : {
      topShift : targetOffset.top - contentOffset.top - contentHeight - contentElement.firstChild.clientHeight,
      leftShift: verticalLeftShift,
    },
    [Position.BOTTOM]: {
      topShift : targetOffset.top + targetHeight - contentOffset.top + contentElement.firstChild.clientHeight,
      leftShift: verticalLeftShift,
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

const getOffset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

const validatePosition = (position, PositionValidator, ShiftHandler) => {
  if (PositionValidator[position]()) {
    return { ...ShiftHandler[position], newPosition: position };
  }

  for (const side of Object.values(Position)) {
    if (position !== side) {
      if (PositionValidator[side]()) {
        return { ...ShiftHandler[side], newPosition: side };
      }
    }
  }

  return { ...ShiftHandler[position], newPosition: position };
};

export const useMouseEvents = (tooltip, targetRef, onMouseOver, onMouseOut, isOpen, delayMouseOver, delayMouseOut) => {
  const tooltipMouseEnterTimeout = useRef(null);
  const tooltipMouseLeaveTimeout = useRef(null);

  const targetMouseLeaveTimeout = useRef(null);
  const targetMouseEnterTimeout = useRef(null);

  const onMouseEnter = timeout => {
    clearTimeout(tooltipMouseEnterTimeout.current);
    clearTimeout(tooltipMouseLeaveTimeout.current);

    clearTimeout(targetMouseLeaveTimeout.current);
    clearTimeout(targetMouseEnterTimeout.current);

    timeout.current = setTimeout(() => onMouseOver({ isOpen }), delayMouseOver);
  };

  const onMouseLeave = timeout => {
    clearTimeout(tooltipMouseEnterTimeout.current);
    clearTimeout(tooltipMouseLeaveTimeout.current);

    clearTimeout(targetMouseLeaveTimeout.current);
    clearTimeout(targetMouseEnterTimeout.current);

    timeout.current = (setTimeout(() => onMouseOut({ isOpen }), delayMouseOut));
  };

  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      tooltip.addEventListener('mouseenter', () => onMouseEnter(tooltipMouseEnterTimeout));
      tooltip.addEventListener('mouseleave', () => onMouseLeave(tooltipMouseLeaveTimeout));

      target.addEventListener('mouseenter', () => onMouseEnter(targetMouseEnterTimeout));
      target.addEventListener('mouseleave', () => onMouseLeave(targetMouseLeaveTimeout));

      return () => {
        tooltip.removeEventListener('mouseenter', () => onMouseEnter(tooltipMouseEnterTimeout));
        tooltip.removeEventListener('mouseleave', () => onMouseLeave(tooltipMouseLeaveTimeout));

        target.removeEventListener('mouseenter', () => onMouseEnter(targetMouseEnterTimeout));
        target.removeEventListener('mouseleave', () => onMouseLeave(targetMouseLeaveTimeout));
      };
    }
  }, [tooltip, targetRef]);
};
