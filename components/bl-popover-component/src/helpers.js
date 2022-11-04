const Position = {
  TOP   : 'top',
  RIGHT : 'right',
  BOTTOM: 'bottom',
  LEFT  : 'left',
};

export const translatePopover = (contentElement, root, position) => {
  const rootOffset = getOffset(root);
  const contentOffset = getOffset(contentElement);

  const contentHorizontalCenter = contentElement.clientHeight / 2;
  const rootHorizontalCenter = root.clientHeight / 2;
  const contentContainerVerticalCenter = contentElement.clientWidth / 2;
  const rootVerticalCenter = root.clientWidth / 2;

  const horizontalTopShift = contentOffset.top - rootOffset.top + contentHorizontalCenter - rootHorizontalCenter;
  const verticalLeftShift = contentOffset.left + contentContainerVerticalCenter - rootVerticalCenter;

  const { width: contentWidth, height: contentHeight } = contentElement.getBoundingClientRect();
  const { width: rootWidth, height: rootHeight } = root.getBoundingClientRect();

  const ShiftHandler = {
    [Position.RIGHT] : {
      topShift : horizontalTopShift,
      leftShift: contentOffset.left + contentWidth + root.firstChild.clientHeight + rootOffset.left
    },
    [Position.LEFT]  : {
      topShift : horizontalTopShift,
      leftShift: contentOffset.left - rootWidth - root.firstChild.clientHeight + rootOffset.left
    },
    [Position.TOP]   : {
      topShift : contentOffset.top - rootOffset.top - rootHeight - root.firstChild.clientHeight,
      leftShift: verticalLeftShift
    },
    [Position.BOTTOM]: {
      topShift : contentOffset.top + contentHeight - rootOffset.top + root.firstChild.clientHeight,
      leftShift: verticalLeftShift
    }
  };

  return ShiftHandler[position];
};

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};
