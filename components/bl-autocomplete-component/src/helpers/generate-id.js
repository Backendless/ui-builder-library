export const generateId = () => {
  const chr4 = () => Math.random().toString(16).slice(-4);
  const chr8 = () => `${chr4()}${chr4()}`;

  return `${chr8()}${chr8()}`;
};
