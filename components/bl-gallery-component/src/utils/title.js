export const fixTitle = title => {
  if (title) {
    return title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return title;
};