export const replaceArrowBrackets = title => {
  if (title) {
    return title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return title;
};
