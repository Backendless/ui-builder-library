const Position = {
  TOP   : 'top',
  RIGHT : 'right',
  BOTTOM: 'bottom',
  LEFT  : 'left',
};

export const translatePopover = (contentContainerElement, root, position) => {
  let rootTranslateTop, rootTranslateLeft;

  const rootOffset = getOffset(root);
  const contentContainerOffset = getOffset(contentContainerElement);

  if (position === Position.RIGHT || position === Position.LEFT) {
    const contentContainerHorizontalCenter = contentContainerElement.clientHeight / 2;
    const rootHorizontalCenter = root.clientHeight / 2;

    rootTranslateTop = contentContainerOffset.top - rootOffset.top
      + contentContainerHorizontalCenter - rootHorizontalCenter;

    if (position === Position.RIGHT) {
      rootTranslateLeft = contentContainerOffset.left + contentContainerElement.getBoundingClientRect().width
        + root.firstChild.clientHeight + rootOffset.left;
    }

    if (position === Position.LEFT) {
      rootTranslateLeft = contentContainerOffset.left - root.getBoundingClientRect().width
        - root.firstChild.clientHeight + rootOffset.left;
    }
  }

  if (position === Position.TOP || position === Position.BOTTOM) {
    const contentContainerVerticalCenter = contentContainerElement.clientWidth / 2;
    const rootVerticalCenter = root.clientWidth / 2;

    rootTranslateLeft = contentContainerOffset.left + contentContainerVerticalCenter - rootVerticalCenter;

    if (position === Position.TOP) {
      rootTranslateTop = contentContainerOffset.top - rootOffset.top - root.getBoundingClientRect().height
        - root.firstChild.clientHeight;
    }

    if (position === Position.BOTTOM) {
      rootTranslateTop = contentContainerOffset.top + contentContainerElement.getBoundingClientRect().height
        - rootOffset.top + root.firstChild.clientHeight;
    }
  }

  return { rootTranslateTop, rootTranslateLeft };
};

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};
