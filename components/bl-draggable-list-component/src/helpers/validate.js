export const validate = (item) => {
  if (item.label.trim() && item.value.trim()) {
    return true;
  }
  return false;
};
