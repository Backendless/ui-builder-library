export const iconParams = rootNode => {
  const { left } = rootNode.getBoundingClientRect();
  const { width } = rootNode.firstChild.getBoundingClientRect();

  return [left, width];
};
