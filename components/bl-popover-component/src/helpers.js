export const translatePopover = (buttonElement, root, position) => {
  let rootTranslateTop, rootTranslateLeft;

  const rootOffset = offset(root);
  const buttonOffset = offset(buttonElement);

  if (position === 'right' || position === 'left') {
    const buttonHorizontalCenter = buttonElement.clientHeight / 2;
    const rootHorizontalCenter = root.clientHeight / 2;

    rootTranslateTop = buttonOffset.top - rootOffset.top + buttonHorizontalCenter - rootHorizontalCenter;

    if (position === 'right') {
      rootTranslateLeft = buttonOffset.left + buttonElement.getBoundingClientRect().width + root.firstChild.clientHeight + rootOffset.left;
    }

    if (position === 'left') {
      rootTranslateLeft = buttonOffset.left - root.getBoundingClientRect().width - root.firstChild.clientHeight + rootOffset.left;
    }
  }

  if (position === 'top' || position === 'bottom') {
    const buttonVerticalCenter = buttonElement.clientWidth / 2;
    const rootVerticalCenter = root.clientWidth / 2;

    rootTranslateLeft = buttonOffset.left + buttonVerticalCenter - rootVerticalCenter;

    if (position === 'top') {
      rootTranslateTop = buttonOffset.top - rootOffset.top - root.clientHeight - root.firstChild.clientHeight - 3;
    }

    if (position === 'bottom') {
      rootTranslateTop = buttonOffset.top + buttonElement.clientHeight - rootOffset.top + root.firstChild.clientHeight;
    }
  }

  return { rootTranslateTop, rootTranslateLeft };
};

const offset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};
